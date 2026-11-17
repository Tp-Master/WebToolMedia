document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        if (navLinks) navLinks.classList.remove('open');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  function scaleDesktopPreviews() {
    const boxes = document.querySelectorAll('.live-preview-box');
    boxes.forEach(box => {
      const iframe = box.querySelector('.desktop-iframe');
      if (iframe) {
        const boxWidth = box.clientWidth;
        const boxHeight = box.clientHeight;
        const scale = boxWidth / 1280;
        iframe.style.transform = `scale(${scale})`;
        iframe.style.height = `${boxHeight / scale}px`;
      }
    });
  }

  window.addEventListener('load', scaleDesktopPreviews);
  window.addEventListener('resize', scaleDesktopPreviews);

  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        scaleDesktopPreviews();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealEls.forEach(el => revealObserver.observe(el));
});

let currentModalMode = 'desktop';

function openFullscreen(templateName, templateURL) {
  const modal = document.getElementById('templateModal');
  const modalTitle = document.getElementById('modalTemplateName');
  const modalIframe = document.getElementById('modalIframe');
  const modalUseBtn = document.getElementById('modalUseBtn');

  if (!modal) return;

  modalTitle.textContent = templateName;
  modalIframe.src = templateURL;
  modalUseBtn.href = `https://wa.me/27646362673?text=Hi%20WebToolMedia,%20I%20want%20to%20request%20the%20${encodeURIComponent(templateName)}%20Template.`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => setModalViewport('desktop'));
}

function closeModal() {
  const modal = document.getElementById('templateModal');
  const modalIframe = document.getElementById('modalIframe');
  if (!modal) return;

  modal.classList.remove('open');
  modalIframe.src = '';
  document.body.style.overflow = 'auto';
}

function setModalViewport(mode) {
  currentModalMode = mode;
  const wrap = document.getElementById('modalIframeWrap');
  const iframe = document.getElementById('modalIframe');
  const btnDesktop = document.getElementById('btnDesktopMode');
  const btnMobile = document.getElementById('btnMobileMode');

  if (!wrap || !iframe || !wrap.clientWidth) return;

  if (mode === 'desktop') {
    if (btnDesktop) btnDesktop.classList.add('active');
    if (btnMobile) btnMobile.classList.remove('active');
    const desktopWidth = 1280;
    const wrapWidth = wrap.clientWidth;
    const wrapHeight = wrap.clientHeight;
    const scale = wrapWidth < desktopWidth ? (wrapWidth / desktopWidth) : 1;

    iframe.style.width = `${desktopWidth}px`;
    iframe.style.left = wrapWidth >= desktopWidth ? `${(wrapWidth - desktopWidth) / 2}px` : '0px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.height = `${wrapHeight / scale}px`;
  } else {
    if (btnMobile) btnMobile.classList.add('active');
    if (btnDesktop) btnDesktop.classList.remove('active');
    const mobileWidth = 390;
    const wrapWidth = wrap.clientWidth;
    const wrapHeight = wrap.clientHeight;

    iframe.style.transform = 'scale(1)';
    iframe.style.width = wrapWidth > mobileWidth ? `${mobileWidth}px` : '100%';
    iframe.style.left = wrapWidth > mobileWidth ? `${(wrapWidth - mobileWidth) / 2}px` : '0px';
    iframe.style.height = `${wrapHeight}px`;
  }
}

function selectPackage(pkgName) {
  const selectEl = document.getElementById('websiteType');
  if (!selectEl) return;
  for (let i = 0; i < selectEl.options.length; i++) {
    if (selectEl.options[i].value.includes(pkgName)) {
      selectEl.selectedIndex = i;
      break;
    }
  }
}

const quoteForm = document.getElementById('whatsappQuoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('clientName').value.trim();
    const business = document.getElementById('businessName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const type = document.getElementById('websiteType').value;
    const category = document.getElementById('businessCategory').value;
    const notes = document.getElementById('projectNotes').value.trim();

    const msg = `Hi WebToolMedia, I'd like to request a free website quote:\n\n` +
                `*Name:* ${encodeURIComponent(name)}\n` +
                `*Business:* ${encodeURIComponent(business)}\n` +
                `*Phone:* ${encodeURIComponent(phone)}\n` +
                `*Email:* ${encodeURIComponent(email)}\n` +
                `*Website Type:* ${encodeURIComponent(type)}\n` +
                `*Category:* ${encodeURIComponent(category)}\n` +
                `*Details:* ${encodeURIComponent(notes || 'N/A')}`;

    window.open(`https://wa.me/27646362673?text=${msg}`, '_blank');
  });
}