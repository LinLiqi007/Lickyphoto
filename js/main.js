(function () {
  'use strict';

  let photos = [];
  let likes = {};
  let currentFilter = 'all';
  let currentLightboxIndex = 0;
  let filteredPhotos = [];
  let activeModalId = null;

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    photos = await loadPhotos();
    likes = await loadLikes();
    allComments = await loadComments();
    const catOrder = ['nature', 'animal', 'city', 'people', 'humanities'];
    filteredPhotos = [...photos].sort(function (a, b) {
      return catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
    });

    initAntiDownload();
    initHomeParticles();
    renderFilmReel();
    initFilmTrackScroll();
    renderWorks();
    initWorksCats();
    initSidePanel();
    initHorizontalScroll();
    initLightbox();
    initCommentsForm();
    initContactForm();
    initModals();
    updateStats();
    updateCatCounts();
  }

  function initAntiDownload() {
    document.addEventListener('contextmenu', function (e) {
      if (e.target && e.target.closest && e.target.closest('.form-group input, .form-group textarea')) return;
      e.preventDefault();
    });

    document.addEventListener('dragstart', function (e) {
      if (e.target && (e.target.tagName === 'IMG' || (e.target.closest && e.target.closest('.photo-card, .lightbox-image')))) {
        e.preventDefault();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ['s', 'u', 'p'];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          showToast('该操作已被禁止');
        }
      }
      if (e.key === 'PrintScreen') { e.preventDefault(); showToast('截图已被禁止'); }
      if (e.key === 'F12') { e.preventDefault(); showToast('开发者工具已被禁止'); }
      if (e.key === 'Escape') {
        if (activeModalId) { closeModal(activeModalId); e.stopPropagation(); return; }
        const panel = document.getElementById('sidePanel');
        if (panel.classList.contains('open')) { closeSidePanel(); e.stopPropagation(); }
      }
    });

    document.addEventListener('copy', function (e) {
      if (e.target && e.target.closest && e.target.closest('.gallery-section, .lightbox, .works-stream, .photo-card')) {
        e.preventDefault();
      }
    });

    const style = document.createElement('style');
    style.textContent = '@media print { body * { visibility: hidden; } }';
    document.head.appendChild(style);
  }

  function initHomeParticles() {
    initParticles('.home-particles', 40);
    initParticles('.works-particles', 30);
  }

  function initParticles(selector, count) {
    const container = document.querySelector(selector);
    if (!container) return;
    const n = window.innerWidth < 700 ? Math.floor(count * 0.55) : count;
    for (let i = 0; i < n; i++) {
      const dot = document.createElement('span');
      dot.className = 'p';
      const size = Math.random() * 3 + 1;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = (Math.random() * 100) + '%';
      dot.style.top = (Math.random() * 100) + '%';
      dot.style.setProperty('--dur', (Math.random() * 4 + 2.5) + 's');
      dot.style.setProperty('--delay', (Math.random() * 4) + 's');
      if (Math.random() > 0.7) {
        dot.style.background = 'rgba(212, 175, 55, 0.9)';
        dot.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.9), 0 0 16px rgba(212, 175, 55, 0.4)';
      }
      container.appendChild(dot);
    }
  }

  async function renderFilmReel() {
    const track = document.getElementById('filmTrack');
    const catsBar = document.getElementById('homeCats');
    if (!track || !catsBar) return;

    track.innerHTML = '';
    catsBar.innerHTML = '';

    const featured = await loadFeatured();
    const catOrder = ['nature', 'animal', 'city', 'people', 'humanities'];

    catOrder.forEach(function (cat, catIdx) {
      let catPhotos = photos.filter(function (p) { return p.category === cat; });
      const featuredIds = featured[cat] || [];
      if (featuredIds.length > 0) {
        const featuredSet = new Set(featuredIds);
        const featuredPhotos = catPhotos.filter(function (p) { return featuredSet.has(p.id); });
        if (featuredPhotos.length > 0) catPhotos = featuredPhotos;
      }
      catPhotos = catPhotos.slice(0, 4);
      if (catPhotos.length === 0) return;

      const pill = document.createElement('button');
      pill.className = 'home-cat-pill';
      pill.innerHTML = CategoryMap[cat];
      pill.dataset.targetCat = cat;
      pill.addEventListener('click', function () { scrollToCatSection(cat); });
      catsBar.appendChild(pill);

      const section = document.createElement('div');
      section.className = 'cat-section';
      section.dataset.catSection = cat;

      const header = document.createElement('div');
      header.className = 'cat-section-header';
      header.innerHTML =
        '<span class="cat-num">0' + (catIdx + 1) + ' / 05</span>' +
        '<h3 class="cat-name">' + CategoryMap[cat] + '</h3>' +
        '<span class="cat-en">' + (CategoryEnNames[cat] || cat.toUpperCase()) + '</span>' +
        '<span class="cat-count">' + catPhotos.length + ' PHOTOS</span>';
      section.appendChild(header);

      const strip = document.createElement('div');
      strip.className = 'cat-strip';

      catPhotos.forEach(function (photo) {
        const cell = document.createElement('div');
        cell.className = 'cat-cell';

        const img = document.createElement('img');
        img.src = photo.image;
        img.loading = 'lazy';
        img.alt = photo.title;
        img.draggable = false;

        cell.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'cat-cell-overlay';
        cell.appendChild(overlay);

        cell.addEventListener('click', function () {
          setFilter(cat, false);
          const idx = filteredPhotos.indexOf(photo);
          if (idx >= 0) openLightbox(idx);
        });

        strip.appendChild(cell);
      });

      section.appendChild(strip);
      track.appendChild(section);
    });

    const spacer = document.createElement('div');
    spacer.className = 'cat-end-spacer';
    track.appendChild(spacer);
  }

  function scrollToCatSection(cat) {
    const track = document.getElementById('filmTrack');
    const section = track.querySelector('.cat-section[data-cat-section="' + cat + '"]');
    if (!section) return;
    track.scrollTo({ left: section.offsetLeft - 12, behavior: 'smooth' });
    updateHomeCatActive(cat);
  }

  function updateHomeCatActive(targetCat) {
    document.querySelectorAll('.home-cat-pill').forEach(function (p) {
      p.classList.toggle('active', p.dataset.targetCat === targetCat);
    });
  }

  function initFilmTrackScroll() {
    const track = document.getElementById('filmTrack');
    if (!track) return;
    let scrollTimeout;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const sections = track.querySelectorAll('.cat-section');
        let closestCat = null, closestDist = Infinity;
        sections.forEach(function (sec) {
          const dist = Math.abs(sec.offsetLeft - track.scrollLeft - 80);
          if (dist < closestDist) { closestDist = dist; closestCat = sec.dataset.catSection; }
        });
        if (closestCat) updateHomeCatActive(closestCat);
      }, 100);
    });
  }

  function renderWorks() {
    const stream = document.getElementById('worksStream');
    const empty = document.getElementById('worksEmpty');
    if (!stream) return;

    // v30: inline styles to force full-width
    stream.setAttribute('style',
      'display:block;' +
      'width:100%;' +
      'padding:20px 32px;' +
      'box-sizing:border-box;' +
      'overflow-y:auto;' +
      'flex:1;'
    );
    stream.innerHTML = '';

    if (filteredPhotos.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    const grid = document.createElement('div');
    grid.setAttribute('style',
      'display:flex;' +
      'flex-wrap:wrap;' +
      'gap:10px;' +
      'align-content:flex-start;' +
      'width:100%;' +
      'box-sizing:border-box;'
    );

    filteredPhotos.forEach(function (photo, idxInFiltered) {
      const item = document.createElement('div');
      item.setAttribute('style',
        'position:relative;' +
        'flex:0 0 calc((100% - 40px) / 5);' +
        'aspect-ratio:4/3;' +
        'border-radius:6px;' +
        'overflow:hidden;' +
        'background:#1a1a1a;' +
        'cursor:pointer;' +
        'border:2px solid transparent;' +
        'transition:all 0.2s;' +
        'box-sizing:border-box;'
      );
      item.innerHTML =
        '<img src="' + photo.image + '" loading="lazy" alt="' + photo.title + '" draggable="false" style="width:100%;height:100%;object-fit:cover;display:block;">' +
        '<div style="position:absolute;bottom:0;left:0;right:0;padding:3px 8px;background:linear-gradient(transparent,rgba(0,0,0,0.8));font-size:0.68rem;color:rgba(255,255,255,0.9);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none;">' + photo.title + '</div>';
      item.addEventListener('click', function () {
        openLightbox(idxInFiltered);
      });
      grid.appendChild(item);
    });

    stream.appendChild(grid);
  }

  function initWorksCats() {
    const container = document.getElementById('worksCats');
    if (!container) return;

    const catOrder = ['all', 'nature', 'animal', 'city', 'people', 'humanities'];
    catOrder.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.className = 'works-cat-pill' + (cat === 'all' ? ' active' : '');
      btn.dataset.category = cat;
      btn.innerHTML = CategoryMap[cat];
      btn.addEventListener('click', function () { setFilter(cat, true); });
      container.appendChild(btn);
    });
  }

  function setFilter(category, scrollToGallery) {
    currentFilter = category;
    const catOrder = ['nature', 'animal', 'city', 'people', 'humanities'];
    if (category === 'all') {
      filteredPhotos = [...photos].sort(function (a, b) {
        return catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
      });
    } else {
      filteredPhotos = photos.filter(function (p) { return p.category === category; });
    }

    const titleEl = document.getElementById('galleryTitle');
    const subtitleEl = document.getElementById('gallerySubtitle');
    const subtitles = {
      all: '每一帧都是独一无二的故事',
      people: '镜头下的灵魂与情感',
      humanities: '市井烟火，人间百态',
      city: '钢筋水泥中的光影故事',
      animal: '野性之美，一瞬永恒',
      nature: '生命之源，万物共生'
    };

    if (titleEl) titleEl.textContent = CategoryMap[category] || '全部作品';
    if (subtitleEl) subtitleEl.textContent = subtitles[category] || '';

    document.querySelectorAll('.works-cat-pill').forEach(function (p) {
      p.classList.toggle('active', p.dataset.category === category);
    });
    document.querySelectorAll('.sp-cat').forEach(function (c) {
      c.classList.toggle('active', c.dataset.category === category);
    });

    renderWorks();

    if (scrollToGallery) {
      setTimeout(function () { scrollToSection('gallery'); }, 250);
    }
  }

  function initSidePanel() {
    const panel = document.getElementById('sidePanel');
    document.getElementById('burgerBtn').addEventListener('click', function () {
      panel.classList.toggle('open');
      document.getElementById('burgerBtn').classList.toggle('active');
    });
    document.getElementById('spClose').addEventListener('click', closeSidePanel);
    panel.querySelector('.side-panel-backdrop').addEventListener('click', closeSidePanel);

    panel.querySelectorAll('.sp-nav-item[data-target]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        closeSidePanel();
        setTimeout(function () { scrollToSection(item.dataset.target); }, 250);
      });
    });

    panel.querySelectorAll('.sp-nav-item[data-panel]').forEach(function (item) {
      item.addEventListener('click', function () {
        closeSidePanel();
        setTimeout(function () { openModal(item.dataset.panel + 'Modal'); }, 250);
      });
    });

    panel.querySelectorAll('.sp-cat').forEach(function (cat) {
      cat.addEventListener('click', function () {
        closeSidePanel();
        setFilter(cat.dataset.category, true);
      });
    });
  }

  function closeSidePanel() {
    document.getElementById('sidePanel').classList.remove('open');
    document.getElementById('burgerBtn').classList.remove('active');
  }

  function initHorizontalScroll() {
    const scrollContainer = document.getElementById('hScroll');
    const sections = document.querySelectorAll('.h-section');
    const dots = document.querySelectorAll('.h-dot');
    const totalSections = sections.length;

    function updateActive() {
      const index = Math.round(scrollContainer.scrollLeft / window.innerWidth);
      dots.forEach(function (dot) { dot.classList.remove('active'); });
      if (dots[index]) dots[index].classList.add('active');
      const homeNav = document.querySelector('.sp-nav-item[data-target="home"]');
      const galleryNav = document.querySelector('.sp-nav-item[data-target="gallery"]');
      if (homeNav) homeNav.classList.toggle('active', index === 0);
      if (galleryNav) galleryNav.classList.toggle('active', index === 1);
    }

    let scrollTimeout;
    scrollContainer.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActive, 80);
    });

    updateActive();

    document.querySelectorAll('.tb-logo').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = link.dataset.target;
        if (target) scrollToSection(target);
      });
    });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { scrollToSection(dot.dataset.target); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.target && e.target.closest && e.target.closest('.form-group input, .form-group textarea')) return;
      if (activeModalId || document.getElementById('sidePanel').classList.contains('open')) return;

      let dir = 0;
      if (e.key === 'ArrowRight') dir = 1;
      else if (e.key === 'ArrowLeft') dir = -1;
      else return;

      e.preventDefault();

      const sectionWidth = window.innerWidth;
      const currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
      const nextIndex = Math.max(0, Math.min(totalSections - 1, currentIndex + dir));
      scrollContainer.scrollTo({ left: nextIndex * sectionWidth, behavior: 'smooth' });
    });

    let touchStartX = 0;
    scrollContainer.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    scrollContainer.addEventListener('touchend', function (e) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        const sectionWidth = window.innerWidth;
        const currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
        const nextIndex = Math.max(0, Math.min(totalSections - 1, currentIndex + (dx < 0 ? 1 : -1)));
        scrollContainer.scrollTo({ left: nextIndex * sectionWidth, behavior: 'smooth' });
      }
    }, { passive: true });
  }

  function scrollToSection(targetId) {
    const scrollContainer = document.getElementById('hScroll');
    const target = document.getElementById(targetId);
    if (!target) return;
    scrollContainer.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }

  function initModals() {
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.querySelectorAll('[data-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { closeModal(modal.id); });
      });
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) backdrop.addEventListener('click', function () { closeModal(modal.id); });
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    closeSidePanel();
    activeModalId = id;
    modal.classList.add('active');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('active');
    if (activeModalId === id) activeModalId = null;
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', function (e) { e.stopPropagation(); navigateLightbox(-1); });
    document.getElementById('lightboxNext').addEventListener('click', function (e) { e.stopPropagation(); navigateLightbox(1); });
    document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target.classList.contains('lightbox-backdrop')) closeLightbox();
    });
    document.getElementById('lightboxLike').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleLightboxLike();
    });
    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('lightbox').classList.contains('active')) return;
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function toggleLightboxLike() {
    const photo = filteredPhotos[currentLightboxIndex];
    if (!photo) return;
    const id = photo.id;
    const hasLiked = likes['u_' + id] === 1;
    if (hasLiked) {
      likes['u_' + id] = 0;
      likes['c_' + id] = Math.max(0, (likes['c_' + id] || 1) - 1);
    } else {
      likes['u_' + id] = 1;
      likes['c_' + id] = (likes['c_' + id] || 0) + 1;
    }
    saveLikes(likes);
    renderLightboxLike();
  }

  function renderLightboxLike() {
    const photo = filteredPhotos[currentLightboxIndex];
    if (!photo) return;
    const id = photo.id;
    const count = likes['c_' + id] || 0;
    const hasLiked = likes['u_' + id] === 1;
    const btn = document.getElementById('lightboxLike');
    btn.classList.toggle('liked', hasLiked);
    btn.querySelector('.like-icon').textContent = hasLiked ? '♥' : '♡';
    btn.querySelector('.like-count').textContent = count;
  }

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('active');
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
  }

  function navigateLightbox(dir) {
    currentLightboxIndex = (currentLightboxIndex + dir + filteredPhotos.length) % filteredPhotos.length;
    updateLightbox();
  }

  function updateLightbox() {
    const photo = filteredPhotos[currentLightboxIndex];
    if (!photo) return;
    const img = document.getElementById('lightboxImage');
    img.src = photo.image;
    img.alt = photo.title;
    document.getElementById('lightboxTitle').textContent = photo.title;
    document.getElementById('lightboxDesc').textContent = photo.description || '';
    document.getElementById('lightboxCategory').textContent = CategoryMap[photo.category] || photo.category;
    renderLightboxLike();
    renderComments(photo.id);
  }

  let allComments = {};

  function formatCommentTime(ts) {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function renderComments(photoId) {
    const list = document.getElementById('commentsList');
    const count = document.getElementById('commentsCount');
    const arr = allComments[photoId] || [];
    count.textContent = arr.length;
    list.innerHTML = arr.map(function (c) {
      const name = (c.name || '匿名').trim() || '匿名';
      const initial = name.charAt(0).toUpperCase();
      return '<div class="comment-item">' +
        '<div class="comment-avatar">' + initial + '</div>' +
        '<div class="comment-body">' +
          '<div class="comment-meta">' +
            '<span class="comment-name">' + name + '</span>' +
            '<span class="comment-time">' + formatCommentTime(c.time) + '</span>' +
          '</div>' +
          '<div class="comment-text">' + escapeHtml(c.text) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    list.scrollTop = 0;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function initCommentsForm() {
    const form = document.getElementById('commentsForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const photo = filteredPhotos[currentLightboxIndex];
      if (!photo) return;
      const name = document.getElementById('commentName').value.trim();
      const text = document.getElementById('commentText').value.trim();
      if (!text) return;
      const arr = allComments[photo.id] || [];
      arr.push({
        id: Date.now(),
        name: name || '匿名',
        text: text,
        time: Date.now()
      });
      allComments[photo.id] = arr;
      await saveComments(allComments);
      document.getElementById('commentText').value = '';
      renderComments(photo.id);
      showToast('评论已发布 💬');
    });
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const messages = await loadMessages();
      messages.unshift({
        id: Date.now(),
        name: data.get('name').trim(),
        email: data.get('email').trim(),
        type: data.get('type'),
        message: data.get('message').trim(),
        time: Date.now()
      });
      saveMessages(messages);
      showToast('感谢你的邀约！我会尽快与你联系 ✉️');
      form.reset();
      closeModal('contactModal');
    });
  }

  function updateStats() {
    const el = document.getElementById('homeStatTotal');
    if (!el) return;
    animateNumber(el, photos.length);
  }

  function animateNumber(element, target) {
    const start = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();
    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function updateCatCounts() {
    const counts = { all: photos.length };
    ['people', 'humanities', 'city', 'animal', 'nature'].forEach(function (cat) {
      counts[cat] = photos.filter(function (p) { return p.category === cat; }).length;
    });
    Object.keys(counts).forEach(function (key) {
      const el = document.querySelector('.sp-cat-count[data-count="' + key + '"]');
      if (el) el.textContent = counts[key];
    });
    const totalEl = document.getElementById('spTotal');
    if (totalEl) totalEl.textContent = photos.length;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }
})();
