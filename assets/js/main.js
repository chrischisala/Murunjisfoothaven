/**
 * Murunji's Foot Haven Spa and Nail Bar — Interactive Logic
 * Lusaka, Zambia | Mosi-oa-Tunya Shopping, Chamba Valley
 * Official Price List & Real Photo Showcase Support
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleTracker();
  initNavScroll();
  initMobileMenu();
  initPriceMenuTabs();
  initTreatmentTabs();
  initGalleryFilter();
  initSpaPlanner();
  initBookingModal();
  initPriceLightboxModal();
  initPhotoLightboxModal();
  initFaqAccordion();
  initCopyActions();

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Live Opening Hours Tracker (Lusaka / CAT UTC+2)
   ========================================================================== */
const SPA_HOURS = {
  0: { name: 'Sunday', open: 11.0, close: 18.5, display: '11:00 AM – 6:30 PM' },
  1: { name: 'Monday', open: 10.0, close: 17.0, display: '10:00 AM – 5:00 PM' },
  2: { name: 'Tuesday', open: 10.0, close: 17.0, display: '10:00 AM – 5:00 PM' },
  3: { name: 'Wednesday', open: 9.0, close: 18.5, display: '9:00 AM – 6:30 PM' },
  4: { name: 'Thursday', open: 9.0, close: 18.5, display: '9:00 AM – 6:30 PM' },
  5: { name: 'Friday', open: 9.0, close: 18.5, display: '9:00 AM – 6:30 PM' },
  6: { name: 'Saturday', open: 9.0, close: 18.5, display: '9:00 AM – 6:30 PM' }
};

function formatDecimalHour(val) {
  const h = Math.floor(val);
  const m = Math.round((val - h) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  const displayM = m < 10 ? '0' + m : m;
  return `${displayH}:${displayM} ${ampm}`;
}

function initScheduleTracker() {
  const statusBadge = document.getElementById('spaStatusBadge');
  const now = new Date();

  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const lusakaTime = new Date(utc + (3600000 * 2));

  const currentDay = lusakaTime.getDay();
  const currentHourDec = lusakaTime.getHours() + (lusakaTime.getMinutes() / 60);
  const todaySchedule = SPA_HOURS[currentDay];

  let isOpen = false;
  let statusText = '';

  if (currentHourDec >= todaySchedule.open && currentHourDec < todaySchedule.close) {
    isOpen = true;
    statusText = `Open Now · Closes at ${formatDecimalHour(todaySchedule.close)}`;
  } else if (currentHourDec < todaySchedule.open) {
    statusText = `Closed · Opens Today at ${formatDecimalHour(todaySchedule.open)}`;
  } else {
    const nextDay = (currentDay + 1) % 7;
    const nextSchedule = SPA_HOURS[nextDay];
    statusText = `Closed · Opens Tomorrow at ${formatDecimalHour(nextSchedule.open)}`;
  }

  if (statusBadge) {
    statusBadge.innerHTML = `
      <span class="status-indicator ${isOpen ? '' : 'closed'}"></span>
      <span>${statusText}</span>
    `;
  }

  const todayRow = document.querySelector(`[data-day="${currentDay}"]`);
  if (todayRow) {
    todayRow.classList.add('today-row');
  }
}

/* ==========================================================================
   2. Header Scroll & Mobile Nav
   ========================================================================== */
function initNavScroll() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Official Price List Tabs
   ========================================================================== */
function initPriceMenuTabs() {
  const tabBtns = document.querySelectorAll('.price-tab-btn');
  const priceGroups = document.querySelectorAll('.price-group-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetGroup = btn.getAttribute('data-price-tab');
      priceGroups.forEach(group => {
        if (group.id === targetGroup) {
          group.classList.add('active');
        } else {
          group.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   4. Treatment Menu Filtering Tabs
   ========================================================================== */
function initTreatmentTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Real Photo Gallery Category Filtering
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-gallery-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Bespoke Spa Session Planner (Updated with Official Kwacha Prices)
   ========================================================================== */
const PLANNER_DATA = {
  primary: {
    'pedi-luxury': { name: 'Deluxe Foot Haven Spa & Pedicure', time: 50, price: 'K350' },
    'pedi-jelly': { name: 'Aromatherapy Jelly Foot Soak & Buff', time: 45, price: 'K300' },
    'nails-acrylic': { name: 'Full Glam Acrylic Set & Sculpting', time: 70, price: 'K400' },
    'nails-biab': { name: 'BIAB Builder Gel Natural Overlay', time: 45, price: 'K320' },
    'hair-wash-blow': { name: 'Saloon: Wash and Blow', time: 40, price: 'K100' },
    'hair-steampod': { name: 'Saloon: Steam Pod Silk Press', time: 50, price: 'K150' },
    'hair-knotless': { name: 'Saloon: Knotless Braids', time: 90, price: 'K250 – K450' },
    'hair-passion': { name: 'Saloon: Passion / Goddess Twists', time: 80, price: 'K300 – K500' },
    'barber-cut': { name: 'Barbershop: Haircut', time: 30, price: 'K50' },
    'barber-shave': { name: 'Barbershop: Haircut & Shave', time: 40, price: 'K70' },
    'caucasian-cut': { name: 'Barbershop: Caucasian Haircut', time: 35, price: 'K150' },
    'massage-full': { name: 'Therapeutic Full Body Massage', time: 60, price: 'K500' }
  },
  upgrades: {
    'rose-soak': { name: 'Rose Petal & Milk Foot Soak', time: 15, price: 'K100' },
    'paraffin': { name: 'Warm Paraffin Wax Treatment', time: 15, price: 'K120' },
    'hot-stones': { name: 'Hot Basalt Stone Upgrade', time: 20, price: 'K150' },
    'nail-art': { name: 'Custom 3D / Chrome Nail Art', time: 20, price: 'K100' },
    'hair-mayo': { name: 'Hair Treatment: Mayonnaise / Hot Oil', time: 25, price: 'K150' },
    'beard-trim': { name: 'Barbershop: Beard Shave / Sculpt', time: 15, price: 'K30' }
  },
  suite: {
    'solo': { name: 'Solo Pampering', extraTime: 0 },
    'duo': { name: 'Besties / Duo Pamper (2 Persons)', extraTime: 10 },
    'kids': { name: 'Kids Special Grooming / Braids', extraTime: 0 }
  }
};

function initSpaPlanner() {
  let selectedPrimary = 'pedi-luxury';
  let selectedUpgrades = new Set(['rose-soak']);
  let selectedSuite = 'solo';

  document.querySelectorAll('[data-planner-primary]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-planner-primary]').forEach(item => item.classList.remove('selected'));
      el.classList.add('selected');
      selectedPrimary = el.getAttribute('data-planner-primary');
      renderPlannerSummary();
    });
  });

  document.querySelectorAll('[data-planner-upgrade]').forEach(el => {
    el.addEventListener('click', () => {
      const upgradeKey = el.getAttribute('data-planner-upgrade');
      if (selectedUpgrades.has(upgradeKey)) {
        selectedUpgrades.delete(upgradeKey);
        el.classList.remove('selected');
      } else {
        selectedUpgrades.add(upgradeKey);
        el.classList.add('selected');
      }
      renderPlannerSummary();
    });
  });

  document.querySelectorAll('[data-planner-suite]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-planner-suite]').forEach(item => item.classList.remove('selected'));
      el.classList.add('selected');
      selectedSuite = el.getAttribute('data-planner-suite');
      renderPlannerSummary();
    });
  });

  function renderPlannerSummary() {
    const primaryInfo = PLANNER_DATA.primary[selectedPrimary];
    const suiteInfo = PLANNER_DATA.suite[selectedSuite];

    let totalTime = primaryInfo.time;
    let upgradeNames = [];

    selectedUpgrades.forEach(uKey => {
      const u = PLANNER_DATA.upgrades[uKey];
      if (u) {
        totalTime += u.time;
        upgradeNames.push(u.name);
      }
    });

    totalTime += suiteInfo.extraTime;

    const primarySummaryEl = document.getElementById('summaryPrimaryService');
    const upgradesSummaryEl = document.getElementById('summaryUpgradesList');
    const suiteSummaryEl = document.getElementById('summarySuiteType');
    const totalTimeEl = document.getElementById('summaryTotalTime');
    const estPriceEl = document.getElementById('summaryEstPrice');
    const waButton = document.getElementById('plannerWhatsAppBtn');

    if (primarySummaryEl) primarySummaryEl.textContent = primaryInfo.name;
    if (suiteSummaryEl) suiteSummaryEl.textContent = suiteInfo.name;
    if (totalTimeEl) totalTimeEl.textContent = `~${totalTime} Minutes`;
    if (estPriceEl) estPriceEl.textContent = primaryInfo.price;

    if (upgradesSummaryEl) {
      if (upgradeNames.length === 0) {
        upgradesSummaryEl.innerHTML = '<span class="text-muted">None selected</span>';
      } else {
        upgradesSummaryEl.innerHTML = upgradeNames.map(name => `<div>• ${name}</div>`).join('');
      }
    }

    const upgradesText = upgradeNames.length > 0 ? upgradeNames.map(u => `  + ${u}`).join('\n') : '  (Standard Service)';
    const waText =
      `Hello Murunji's Foot Haven & Nail Bar! 🌸✨

I configured a session on your website:

💆 Main Treatment: ${primaryInfo.name}
✨ Selected Add-ons:
${upgradesText}
👥 Experience: ${suiteInfo.name}
⏳ Estimated Time: ~${totalTime} Mins
📍 Location: Mosi-oa-Tunya Shopping, Chamba Valley

Please let me know if this slot is available for booking!`;

    if (waButton) {
      waButton.href = `https://wa.me/260764602248?text=${encodeURIComponent(waText)}`;
    }
  }

  renderPlannerSummary();
}

/* ==========================================================================
   7. Booking Modal
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const quickBookForm = document.getElementById('quickBookingForm');
  const modalForm = document.getElementById('modalBookingForm');

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const servicePreselect = btn.getAttribute('data-service-name');
      if (servicePreselect && document.getElementById('modalServiceSelect')) {
        document.getElementById('modalServiceSelect').value = servicePreselect;
      }
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openModal() {
    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (quickBookForm) {
    quickBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('quickServiceSelect').value;
      const date = document.getElementById('quickDateInput').value;
      const time = document.getElementById('quickTimeSelect').value;

      const text =
        `Hello Murunji's Foot Haven & Nail Bar! 🌸✨

I would like to book an appointment:
• Service: ${service || 'General Spa/Saloon Service'}
• Date: ${date || 'Soonest Available'}
• Time: ${time || 'Anytime'}
• Location: Chamba Valley (Mosi-oa-Tunya Shopping)

Could you please confirm if this slot is open?`;

      window.open(`https://wa.me/260764602248?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalNameInput').value;
      const phone = document.getElementById('modalPhoneInput').value;
      const service = document.getElementById('modalServiceSelect').value;
      const date = document.getElementById('modalDateInput').value;
      const time = document.getElementById('modalTimeInput').value;
      const notes = document.getElementById('modalNotesInput').value;

      const text =
        `Hello Murunji's Foot Haven Spa & Nail Bar! 🌸✨

Appointment Request:
• Client Name: ${name}
• Client Phone: ${phone}
• Desired Treatment: ${service}
• Preferred Date: ${date}
• Preferred Time: ${time}
${notes ? `• Special Notes: ${notes}\n` : ''}
Sent via Murunji's Foot Haven website. Looking forward to your confirmation!`;

      window.open(`https://wa.me/260764602248?text=${encodeURIComponent(text)}`, '_blank');
      closeModal();
    });
  }
}

/* ==========================================================================
   8. Official Price List Screenshot Modal
   ========================================================================== */
function initPriceLightboxModal() {
  const priceModal = document.getElementById('officialPriceModal');
  const openBtns = document.querySelectorAll('[data-open-price-card]');
  const closeBtn = document.getElementById('closePriceModalBtn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (priceModal) priceModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (priceModal) priceModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (priceModal) {
    priceModal.addEventListener('click', (e) => {
      if (e.target === priceModal) {
        priceModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   9. Real Photo Gallery Lightbox Modal
   ========================================================================== */
function initPhotoLightboxModal() {
  const lightbox = document.getElementById('photoLightboxModal');
  const lightboxImg = document.getElementById('lightboxActiveImg');
  const lightboxCaption = document.getElementById('lightboxActiveCaption');
  const closeBtn = document.getElementById('closePhotoLightboxBtn');

  document.querySelectorAll('[data-lightbox-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox-src');
      const caption = item.getAttribute('data-lightbox-caption') || 'Murunji\'s Foot Haven Client Showcase';
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   10. FAQ Accordions
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   11. Copy to Clipboard Utility
   ========================================================================== */
function initCopyActions() {
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy-text');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });
}
