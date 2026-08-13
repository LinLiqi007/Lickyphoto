(function () {
  'use strict';

  var AUTH_KEY = 'lky_admin_auth';
  var adminPassword = 'Linliqi050523@';

  var photos = [];
  var allComments = {};
  var editingPhotoId = null;
  var pendingConfirm = null;
  var searchQuery = '';
  var filterCategory = 'all';

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    try {
      var pwdData = await loadPassword();
      if (pwdData && pwdData.value) {
        adminPassword = pwdData.value;
      }
    } catch (e) {
      console.warn('[admin] password API failed, using default');
    }

    if (checkAuth()) {
      await showAdmin();
    } else {
      showLogin();
    }
    initLogin();
    initDashboard();
    initPhotos();
    initModals();
    initConfirm();
  }

  function checkAuth() {
    try {
      var auth = sessionStorage.getItem(AUTH_KEY);
      return auth === '1';
    } catch (e) { return false; }
  }

  function setAuth(val) {
    try {
      if (val) {
        sessionStorage.setItem(AUTH_KEY, '1');
      } else {
        sessionStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {}
  }

  function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminPage').style.display = 'none';
  }

  async function showAdmin() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    photos = await loadPhotos();
    allComments = await loadComments();
    initAntiDownload();
    renderStats();
    renderPhotosGrid();
    renderMessages();
    renderComments();
    initFeatured();
    await loadFeaturedIntoPage();
  }

  function initAntiDownload() {
    document.addEventListener('contextmenu', function (e) {
      if (e.target && e.target.closest && e.target.closest('.form-group input, .form-group textarea')) return;
      e.preventDefault();
    });
  }

  function initLogin() {
    var btn = document.querySelector('#adminLogin button');
    if (btn) btn.addEventListener('click', doLogin);
    var input = document.getElementById('adminPassword');
    if (input) input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doLogin();
    });
  }

  function doLogin() {
    var val = document.getElementById('adminPassword').value.trim();
    var err = document.getElementById('loginError') || document.getElementById('adminLoginError');
    if (val === adminPassword) {
      setAuth(true);
      err.textContent = '';
      showAdmin();
    } else {
      err.textContent = '密码错误，请重试';
      document.getElementById('adminPassword').value = '';
      setTimeout(function () { err.textContent = ''; }, 2000);
    }
  }

  function initDashboard() {
    var logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', function () {
      setAuth(false);
      showLogin();
    });
  }

  async function renderStats() {
    document.getElementById('adminPhotoCount').textContent = '(共 ' + photos.length + ' 张)';

    var cats = {};
    photos.forEach(function (p) {
      cats[p.category] = (cats[p.category] || 0) + 1;
    });
    var catBox = document.getElementById('adminStats');
    var catKeys = ['people', 'humanities', 'city', 'animal', 'nature'];
    var catColors = ['#d4af37', '#c9a84c', '#bfa042', '#b5983a', '#ab9032'];
    catBox.innerHTML = catKeys.map(function (cat, i) {
      var count = cats[cat] || 0;
      return '<div class="admin-stat"><div class="admin-stat-num" style="color:' + catColors[i] + '">' + count + '</div><div class="admin-stat-label">' + (CategoryMap[cat] || cat) + '</div></div>';
    }).join('');

    var likes = await loadLikes();
    var totalLikes = Object.values(likes).reduce(function (a, b) { return (a || 0) + (b || 0); }, 0) || 0;
    var totalComments = Object.values(allComments).reduce(function (acc, arr) { return acc + (arr || []).length; }, 0);

    var ext = document.createElement('div');
    ext.className = 'admin-stat';
    ext.innerHTML = '<div class="admin-stat-num" style="color:#ff4757">' + totalLikes + '</div><div class="admin-stat-label">总点赞</div>';
    catBox.appendChild(ext);

    var ext2 = document.createElement('div');
    ext2.className = 'admin-stat';
    ext2.innerHTML = '<div class="admin-stat-num" style="color:#7ec8e3">' + totalComments + '</div><div class="admin-stat-label">总评论</div>';
    catBox.appendChild(ext2);
  }

  function initPhotos() {
    var zone = document.getElementById('adminUploadZone');
    var fileInput = document.getElementById('adminFileInput');

    zone.addEventListener('click', function () { fileInput.click(); });

    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', function () { zone.classList.remove('drag-over'); });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handlePhotoFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) {
        handlePhotoFile(fileInput.files[0]);
      }
    });

    var form = document.getElementById('adminUploadForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitPhotoForm(form);
    });
  }

  function handlePhotoFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('请选择图片文件');
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var dataUrl = e.target.result;
      var input = document.getElementById('adminImagePath');
      var hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'image';
      hidden.value = dataUrl;
      input.parentNode.replaceChild(hidden, input);
      var preview = document.getElementById('adminPreviewImg');
      preview.src = dataUrl;
      document.getElementById('adminPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  async function submitPhotoForm(form) {
    var data = new FormData(form);
    var imgData = data.get('image');
    if (!imgData || String(imgData).indexOf('data:') !== 0) {
      showToast('请先选择一张图片');
      return;
    }
    var photo = {
      id: Date.now(),
      title: data.get('title').trim(),
      category: data.get('category'),
      description: data.get('description').trim(),
      image: String(imgData),
      date: formatDate(new Date())
    };
    photos.unshift(photo);
    await savePhotos(photos);
    showToast('作品已添加 ✨');
    form.reset();
    document.getElementById('adminPreview').style.display = 'none';
    renderStats();
    renderPhotosGrid();
  }

  function renderPhotosGrid() {
    var container = document.getElementById('adminPhotos');
    if (!container) return;
    container.innerHTML = '';
    if (photos.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;">暂无作品</p>';
      return;
    }
    photos.forEach(function (p) {
      var thumb = document.createElement('div');
      thumb.className = 'admin-photo-item';
      thumb.style.cssText = 'position:relative;aspect-ratio:4/3;border-radius:6px;overflow:hidden;background:var(--bg-card);cursor:pointer;border:1px solid var(--border);';
      thumb.innerHTML =
        '<img src="' + p.image + '" style="width:100%;height:100%;object-fit:cover;pointer-events:none;">' +
        '<div style="position:absolute;bottom:0;left:0;right:0;padding:4px 8px;background:linear-gradient(transparent,rgba(0,0,0,0.8));font-size:0.7rem;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(p.title) + '</div>' +
        '<button data-del="' + p.id + '" style="position:absolute;top:4px;right:4px;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,0.7);border:none;color:#ff4757;font-size:0.75rem;cursor:pointer;line-height:1;">✕</button>';
      container.appendChild(thumb);
    });
    container.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = parseInt(btn.dataset.del);
        photos = photos.filter(function (p) { return p.id !== id; });
        savePhotos(photos);
        renderStats();
        renderPhotosGrid();
        showToast('已删除');
      });
    });
  }

  async function initFeatured() {}

  async function loadFeaturedIntoPage() {
    var featured = await loadFeatured();
    var container = document.getElementById('adminFeatured');
    container.innerHTML = '';
    var catKeys = ['people', 'humanities', 'city', 'animal', 'nature'];
    catKeys.forEach(function (cat) {
      var catDiv = document.createElement('div');
      catDiv.className = 'featured-cat';
      var selected = featured[cat] || [];
      catDiv.innerHTML =
        '<div class="featured-cat-title">' + (CategoryMap[cat] || cat) + ' <span class="f-count">已选 ' + selected.length + '/4</span></div>' +
        '<div class="featured-grid" data-cat="' + cat + '"></div>';
      var grid = catDiv.querySelector('.featured-grid');
      var catPhotos = photos.filter(function (p) { return p.category === cat; });
      catPhotos.forEach(function (p) {
        var item = document.createElement('div');
        item.className = 'featured-item' + (selected.indexOf(p.id) !== -1 ? ' selected' : '');
        item.dataset.id = p.id;
        item.innerHTML =
          '<img src="' + p.image + '">' +
          '<div class="f-check">✓</div>' +
          '<div class="f-label">' + escapeHtml(p.title) + '</div>';
        item.addEventListener('click', function () {
          var id = parseInt(item.dataset.id);
          var arr = featured[cat] || [];
          var idx = arr.indexOf(id);
          if (idx !== -1) {
            arr.splice(idx, 1);
          } else if (arr.length < 4) {
            arr.push(id);
          } else {
            showToast('每个分类最多选 4 张');
            return;
          }
          featured[cat] = arr;
          item.classList.toggle('selected');
          catDiv.querySelector('.f-count').textContent = '已选 ' + arr.length + '/4';
        });
        grid.appendChild(item);
      });
      container.appendChild(catDiv);
    });

    var saveBtn = document.querySelector('#adminFeatured + div button.admin-logout');
    if (!saveBtn) {
      var wrapper = document.querySelector('#adminFeatured').parentNode;
      var btns = wrapper.querySelectorAll('div button');
      if (btns[0]) {
        btns[0].addEventListener('click', function () {
          saveFeatured(featured);
          showToast('精选已保存 ✨');
        });
      }
    } else {
      saveBtn.addEventListener('click', function () {
        saveFeatured(featured);
        showToast('精选已保存 ✨');
      });
    }

    var resetBtn = document.querySelector('#adminFeatured + div + div button, button[onclick="resetFeaturedToDefault()"]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        featured = JSON.parse(JSON.stringify(defaultFeatured));
        loadFeaturedIntoPage();
        showToast('已恢复默认精选');
      });
    }
  }

  async function renderMessages() {
    var messages = await loadMessages();
    var container = document.getElementById('adminMessages');
    if (messages.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.82rem;">暂无留言</p>';
      return;
    }
    container.innerHTML = messages.map(function (m) {
      return '<div class="admin-message">' +
        '<div class="admin-message-head">' +
          '<span class="admin-message-name">' + escapeHtml(m.name || '匿名') + '</span>' +
          '<span class="admin-message-type">' + (m.type === 'collab' ? '合作' : (m.type === 'print' ? '打印' : '其他')) + '</span>' +
          '<span class="admin-message-time">' + formatCommentTime(m.time) + '</span>' +
        '</div>' +
        '<div class="admin-message-body">' + escapeHtml(m.message) + '</div>' +
        '<div class="admin-message-email" style="font-size:0.72rem;color:var(--text-muted);">📧 ' + escapeHtml(m.email || '') + '</div>' +
      '</div>';
    }).join('');
  }

  function renderComments() {
    var container = document.getElementById('adminComments');
    var total = Object.values(allComments).reduce(function (acc, arr) { return acc + (arr || []).length; }, 0);
    var badge = document.getElementById('commentBadge');
    if (total > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = total;
    } else {
      badge.style.display = 'none';
    }

    var flat = [];
    Object.keys(allComments).forEach(function (photoId) {
      var catArr = allComments[photoId] || [];
      catArr.forEach(function (c) {
        var photo = photos.find(function (p) { return String(p.id) === String(photoId); });
        flat.push(Object.assign({}, c, { photoId: photoId, photoTitle: photo ? photo.title : '已删除作品', photoImage: photo ? photo.image : '' }));
      });
    });
    flat.sort(function (a, b) { return b.time - a.time; });

    if (flat.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.82rem;">暂无游客评论</p>';
      return;
    }

    container.innerHTML = flat.map(function (c) {
      return '<div class="admin-comment" style="display:flex;gap:12px;padding:12px;background:var(--bg-card);border-radius:8px;margin-bottom:10px;">' +
        (c.photoImage ? '<img src="' + c.photoImage + '" style="width:60px;height:60px;object-fit:cover;border-radius:4px;flex-shrink:0;">' : '<div style="width:60px;height:60px;background:var(--border);border-radius:4px;flex-shrink:0;"></div>') +
        '<div style="flex:1;min-width:0;">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
            '<span style="font-size:0.82rem;font-weight:600;color:var(--text-secondary);">' + escapeHtml(c.name || '匿名') + '</span>' +
            '<span style="font-size:0.7rem;color:var(--text-muted);">' + formatCommentTime(c.time) + '</span>' +
            '<span style="margin-left:auto;font-size:0.7rem;color:var(--accent);">' + escapeHtml(c.photoTitle) + '</span>' +
          '</div>' +
          '<div style="font-size:0.82rem;color:var(--text-primary);line-height:1.5;">' + escapeHtml(c.text) + '</div>' +
          '<button data-delc="' + c.id + '" data-pid="' + c.photoId + '" style="margin-top:6px;font-size:0.72rem;color:#ff4757;background:none;border:1px solid rgba(255,71,87,0.3);border-radius:4px;padding:2px 8px;cursor:pointer;">删除</button>' +
        '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('[data-delc]').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        var cid = parseInt(btn.dataset.delc);
        var pid = btn.dataset.pid;
        var arr = allComments[pid] || [];
        allComments[pid] = arr.filter(function (c) { return c.id !== cid; });
        await saveComments(allComments);
        renderComments();
        showToast('评论已删除');
      });
    });
  }

  function initModals() {}

  function initConfirm() {}

  function formatDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function formatCommentTime(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  window.adminLogin = doLogin;
  window.adminLogout = function () {
    setAuth(false);
    showLogin();
  };
  window.clearAllMessages = async function () {
    if (!confirm('确定要清空所有留言？')) return;
    await saveMessages([]);
    renderMessages();
    showToast('已清空');
  };
  window.resetAllData = async function () {
    if (!confirm('⚠️ 这将重置所有数据！确定继续？')) return;
    photos = JSON.parse(JSON.stringify(defaultPhotos));
    await savePhotos(photos);
    await saveLikes({});
    await saveMessages([]);
    await saveComments({});
    renderStats();
    renderPhotosGrid();
    renderMessages();
    renderComments();
    showToast('已重置');
  };
  window.saveFeaturedSelection = function () {
    var selected = {};
    document.querySelectorAll('.featured-cat').forEach(function (catDiv) {
      var cat = catDiv.querySelector('.featured-grid').dataset.cat;
      var ids = [];
      catDiv.querySelectorAll('.featured-item.selected').forEach(function (el) {
        ids.push(parseInt(el.dataset.id));
      });
      selected[cat] = ids;
    });
    saveFeatured(selected);
    showToast('精选已保存 ✨');
  };
  window.resetFeaturedToDefault = function () {
    loadFeaturedIntoPage();
    showToast('已恢复默认精选');
  };
})();
