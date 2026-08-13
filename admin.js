(function () {
  'use strict';

  const ADMIN_PASSWORD = 'Linliqi050523@';
  const SESSION_KEY = 'lky_admin_session_v3';

  let photos = [];
  let messages = [];
  let likes = {};
  let selectedFile = null;
  let selectedImageData = null;
  let featuredState = {};

  function init() {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      showAdmin();
    } else {
      document.getElementById('adminLogin').style.display = 'flex';
      document.getElementById('adminPage').style.display = 'none';
    }
  }

  async function showAdmin() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    photos = await loadPhotos();
    messages = await loadMessages();
    featuredState = await loadFeatured();
    likes = await loadLikes();
    renderStats();
    renderPhotos();
    renderFeatured();
    renderMessages();
    initUpload();
  }

  window.adminLogin = function () {
    const pwd = document.getElementById('adminPassword').value;
    if (pwd === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, '1');
      document.getElementById('loginError').textContent = '';
      showAdmin();
    } else {
      document.getElementById('loginError').textContent = '密码错误，请重试';
    }
  };

  window.adminLogout = function () {
    sessionStorage.removeItem(SESSION_KEY);
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
  };

  function renderStats() {
    const totalLikes = Object.keys(likes).filter(function (k) {
      return k.startsWith('c_') && likes[k] > 0;
    }).reduce(function (a, k) { return a + likes[k]; }, 0);

    const catStats = { all: photos.length, people: 0, humanities: 0, city: 0, animal: 0, nature: 0 };
    photos.forEach(function (p) { if (catStats[p.category] !== undefined) catStats[p.category]++; });

    const unreadCount = messages.filter(function (m) { return !m.read; }).length;

    const stats = [
      { label: '作品总数', value: photos.length },
      { label: '人物', value: catStats.people },
      { label: '人文', value: catStats.humanities },
      { label: '城市', value: catStats.city },
      { label: '动物', value: catStats.animal },
      { label: '自然', value: catStats.nature },
      { label: '总点赞', value: totalLikes },
      { label: '未读邀约', value: unreadCount, isMsg: true }
    ];

    document.getElementById('adminStats').innerHTML = stats.map(function (s) {
      return '<div class="admin-stat' + (s.isMsg ? ' messages' : '') + '">' +
        '<div class="admin-stat-num">' + s.value + '</div>' +
        '<div class="admin-stat-label">' + s.label + '</div>' +
      '</div>';
    }).join('');
  }

  function renderPhotos() {
    const grid = document.getElementById('adminPhotos');
    document.getElementById('adminPhotoCount').textContent = '(共 ' + photos.length + ' 张)';
    grid.innerHTML = '';

    photos.forEach(function (photo) {
      const div = document.createElement('div');
      div.className = 'admin-photo';
      div.innerHTML =
        '<img src="' + photo.image + '" alt="">' +
        '<div class="admin-photo-info">' + photo.title + '</div>' +
        '<div class="admin-photo-overlay">' +
          '<button class="edit" data-edit="' + photo.id + '">编辑</button>' +
          '<button class="del" data-del="' + photo.id + '">删除</button>' +
        '</div>';
      grid.appendChild(div);
    });

    grid.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = parseInt(btn.dataset.del);
        if (confirm('确定删除这张作品吗？此操作不可撤销。')) {
          photos = photos.filter(function (p) { return p.id !== id; });
          savePhotos(photos);
          renderStats();
          renderPhotos();
        }
      });
    });

    grid.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = parseInt(btn.dataset.edit);
        const photo = photos.find(function (p) { return p.id === id; });
        if (!photo) return;
        const newTitle = prompt('修改标题:', photo.title);
        if (newTitle !== null && newTitle.trim()) {
          photo.title = newTitle.trim();
          const newDesc = prompt('修改描述 (留空保持不变):', photo.description);
          if (newDesc !== null) photo.description = newDesc.trim();
          savePhotos(photos);
          renderStats();
          renderPhotos();
        }
      });
    });
  }

  function renderMessages() {
    const container = document.getElementById('adminMessages');
    const badge = document.getElementById('msgBadge');
    const unreadCount = messages.filter(function (m) { return !m.read; }).length;

    if (unreadCount > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = '未读 ' + unreadCount;
    } else {
      badge.style.display = 'none';
    }

    if (messages.length === 0) {
      container.innerHTML = '<div class="admin-msg-empty">暂无留言 / 邀约 ✉️</div>';
      return;
    }

    const typeNames = { wedding: '婚礼摄影', portrait: '人像写真', commercial: '商业拍摄', travel: '旅行纪实', other: '其他' };

    container.innerHTML = messages.map(function (m) {
      const d = new Date(m.time);
      const ts = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
      return '<div class="admin-msg' + (m.read ? '' : ' unread') + '" data-id="' + m.id + '">' +
        '<div class="admin-msg-head">' +
          '<div class="left">' +
            '<span class="admin-msg-name">' + escapeHtml(m.name) + '</span>' +
            '<span class="admin-msg-email">' + escapeHtml(m.email) + '</span>' +
          '</div>' +
          '<div style="text-align:right;display:flex;flex-direction:column;gap:6px;align-items:flex-end;">' +
            '<span class="admin-msg-type">' + (typeNames[m.type] || '其他') + '</span>' +
            '<span class="admin-msg-time">' + ts + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="admin-msg-body">' + escapeHtml(m.message) + '</div>' +
        '<div class="admin-msg-actions">' +
          '<button class="mark-read ' + (m.read ? 'read' : 'unread') + '" data-action="read">' + (m.read ? '标为未读' : '标为已读') + '</button>' +
          '<button class="delete" data-action="delete">删除</button>' +
        '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('.admin-msg-actions button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const msgId = parseInt(btn.closest('.admin-msg').dataset.id);
        const action = btn.dataset.action;
        const msg = messages.find(function (m) { return m.id === msgId; });
        if (!msg) return;

        if (action === 'read') {
          msg.read = !msg.read;
          saveMessages(messages);
          renderMessages();
          renderStats();
        } else if (action === 'delete') {
          if (confirm('确定删除这条留言吗？')) {
            messages = messages.filter(function (m) { return m.id !== msgId; });
            saveMessages(messages);
            renderMessages();
            renderStats();
          }
        }
      });
    });
  }

  window.clearAllMessages = function () {
    if (messages.length === 0) return;
    if (!confirm('确定清空全部 ' + messages.length + ' 条留言吗？此操作不可撤销。')) return;
    messages = [];
    saveMessages(messages);
    renderMessages();
    renderStats();
  };

  function initUpload() {
    const zone = document.getElementById('adminUploadZone');
    const fileInput = document.getElementById('adminFileInput');
    const form = document.getElementById('adminUploadForm');
    const preview = document.getElementById('adminPreview');
    const previewImg = document.getElementById('adminPreviewImg');

    zone.addEventListener('click', function () { fileInput.click(); });
    zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', function () { zone.classList.remove('drag-over'); });
    zone.addEventListener('drop', function (e) {
      e.preventDefault(); zone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files[0]) handleFile(fileInput.files[0]);
    });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) { alert('请选择图片文件'); return; }
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = function (e) {
        selectedImageData = e.target.result;
        previewImg.src = selectedImageData;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!selectedImageData) { alert('请先选择一张图片'); return; }

      const data = new FormData(form);
      const newPhoto = {
        id: Date.now(),
        title: data.get('title').trim(),
        category: data.get('category'),
        description: data.get('description').trim(),
        image: selectedImageData,
        date: formatDate(new Date())
      };

      photos.unshift(newPhoto);
      savePhotos(photos);

      selectedFile = null; selectedImageData = null;
      preview.style.display = 'none';
      form.reset();
      fileInput.value = '';

      renderStats();
      renderPhotos();
      alert('作品发布成功！');
    });
  }

  window.resetAllData = function () {
    if (!confirm('⚠️ 确定要重置所有数据吗？这将恢复为初始照片，删除所有用户上传、点赞和留言！')) return;
    if (!confirm('再次确认：此操作不可恢复！')) return;
    savePhotos(defaultPhotos);
    saveLikes({});
    saveMessages([]);
    saveFeatured(JSON.parse(JSON.stringify(defaultFeatured)));
    alert('数据已重置！请刷新页面查看。');
    location.reload();
  };

  function formatDate(d) {
    return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderFeatured() {
    const container = document.getElementById('adminFeatured');
    if (!container) return;

    const catOrder = ['nature', 'animal', 'city', 'people', 'humanities'];
    container.innerHTML = '';

    catOrder.forEach(function (cat) {
      const catPhotos = photos.filter(function (p) { return p.category === cat; });
      if (catPhotos.length === 0) return;

      const selectedIds = featuredState[cat] || [];
      const selectedSet = new Set(selectedIds);

      const section = document.createElement('div');
      section.className = 'featured-cat';
      section.dataset.cat = cat;

      const title = document.createElement('div');
      title.className = 'featured-cat-title';
      title.innerHTML = (CategoryMap[cat] || cat) +
        '<span class="f-count">已选 ' + selectedIds.length + ' / 4</span>';
      section.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'featured-grid';

      catPhotos.forEach(function (photo) {
        const item = document.createElement('div');
        item.className = 'featured-item' + (selectedSet.has(photo.id) ? ' selected' : '');
        item.dataset.id = photo.id;
        item.innerHTML =
          '<img src="' + photo.image + '" alt="">' +
          '<div class="f-check">✓</div>' +
          '<div class="f-label">' + escapeHtml(photo.title) + '</div>';
        item.addEventListener('click', function () {
          toggleFeatured(cat, photo.id, item, title);
        });
        grid.appendChild(item);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function toggleFeatured(cat, id, itemEl, titleEl) {
    let list = featuredState[cat] ? featuredState[cat].slice() : [];
    const idx = list.indexOf(id);
    if (idx !== -1) {
      list.splice(idx, 1);
      itemEl.classList.remove('selected');
    } else {
      if (list.length >= 4) {
        alert('每个分类最多只能选 4 张哦');
        return;
      }
      list.push(id);
      itemEl.classList.add('selected');
    }
    featuredState[cat] = list;
    if (titleEl) {
      titleEl.querySelector('.f-count').textContent = '已选 ' + list.length + ' / 4';
    }
  }

  window.saveFeaturedSelection = function () {
    saveFeatured(featuredState);
    alert('首页精选已保存！刷新首页即可看到效果。');
  };

  window.resetFeaturedToDefault = function () {
    if (!confirm('确定恢复为默认精选吗？')) return;
    featuredState = JSON.parse(JSON.stringify(defaultFeatured));
    saveFeatured(featuredState);
    renderFeatured();
    alert('已恢复默认精选。');
  };

  init();
})();
