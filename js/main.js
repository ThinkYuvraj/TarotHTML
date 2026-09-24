/**
 * MUKTA BHATNAGAR — HOLISTIC WELL-BEING PLATFORM
 * Mind, Body & Soul Integration: Tarot Guidance & Cellular Wellness Coaching
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStardust();
  initNavigation();
  initScrollProgressAndNav();
  initScrollReveal();
  initFAQAccordion();
  initTarotDeck();
  initInteractiveAssessment();
  initFloatingQuickBar();
  initGalleryModals();
  initBookingForm();
  initCookieConsent();
});

/* ==========================================================================
   0. INSTANT CELESTIAL LOADING ANIMATION
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  if (!preloader) return;

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.style.display = 'none';
      }
    }, 600);
  }

  // Gracefully transition after orbital animation finishes filling
  if (document.readyState === 'complete') {
    setTimeout(dismiss, 700);
  } else {
    window.addEventListener('load', () => setTimeout(dismiss, 600));
    setTimeout(dismiss, 1200);
  }

  preloader.addEventListener('click', dismiss);
}

/* ==========================================================================
   1. STARDUST BACKGROUND CANVAS (Optimized Animation Loop)
   ========================================================================== */
function initStardust() {
  const canvas = document.getElementById('stardust-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.25 - 0.08;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      // Stardust hues matching document palette: Gold, Warm Orange, Lotus Pink, and Maroon Velvet
      const hues = ['230, 203, 135', '197, 160, 89', '249, 115, 22', '236, 72, 153', '159, 18, 57'];
      this.color = hues[Math.floor(Math.random() * hues.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.1, Math.min(0.85, this.alpha))})`;
      ctx.fill();
    }
  }

  const count = Math.min(65, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. SCROLL PROGRESS, ACTIVE NAV LINK & BACK-TO-TOP
   ========================================================================== */
function initScrollProgressAndNav() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('header[id], section[id]');

  let ticking = false;

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Scroll Progress Bar
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // 3. Scroll Spy / Active Nav Link
    let currentSectionId = '';
    const scrollPos = scrollTop + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.dataset.section === currentSectionId) {
          link.classList.add('nav-active');
        } else {
          link.classList.remove('nav-active');
        }
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial trigger
  onScroll();

  // Smooth scroll back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   3. INSTANT SCROLL VISIBILITY (Zero Lag, Zero Jitters)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(el => el.classList.add('is-visible'));
}

/* ==========================================================================
   4. INTERACTIVE FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all other items for a clean single-accordion feel
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            const otherHeader = otherItem.querySelector('.faq-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* ==========================================================================
   5. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('hidden');
      navLinks.classList.toggle('flex');
      navLinks.classList.toggle('flex-col');
      navLinks.classList.toggle('absolute');
      navLinks.classList.toggle('top-full');
      navLinks.classList.toggle('left-0');
      navLinks.classList.toggle('w-full');
      navLinks.classList.toggle('bg-[#0f0721]');
      navLinks.classList.toggle('p-6');
      navLinks.classList.toggle('border-b');
      navLinks.classList.toggle('border-[#c5a059]/30');
      navLinks.classList.toggle('shadow-2xl');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navLinks.classList.add('hidden');
          navLinks.classList.remove('flex', 'flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'bg-[#0f0721]', 'p-6', 'border-b', 'border-[#c5a059]/30', 'shadow-2xl');
        }
      });
    });
  }
}

/* ==========================================================================
   3. WEB AUDIO SOUND EFFECTS
   ========================================================================== */
let audioCtx = null;
function playTarotChime() {
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66];
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, now);
    osc.frequency.exponentialRampToValueAtTime(note * 1.5, now + 0.8);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.3);
  } catch (e) {
    // Audio fallback
  }
}

/* ==========================================================================
   4. TAROT & HOLISTIC DECK DATA
   ========================================================================== */
const TAROT_CARDS = [
  {
    id: 'the-star',
    name: 'The Star',
    arcana: 'Major Arcana XVII',
    image: 'assets/images/card-the-star.jpg',
    keywords: 'Hope, Cellular Healing, Renewal, Clarity, Serenity',
    summary: 'A divine blessing of peace and restoration. You are releasing fear, and a clear stream of hope is revitalizing your mind, body, and spirit.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Cellular healing begins with peace of mind. Practice conscious breathing, nourish your gut with clean wholesome food, and trust your recovery journey.',
    fullMeaning: 'The Star represents profound renewal and holistic alignment. In Mukta’s holistic readings, this card confirms that physical vitality and spiritual faith are coming into beautiful balance.'
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    arcana: 'Major Arcana XVIII',
    image: 'assets/images/card-the-moon.jpg',
    keywords: 'Intuition, Subconscious Truths, Illusions, Emotional Clarity',
    summary: 'Not everything is visible right away. What is hidden under the surface is gently revealing itself to help you remove doubts and illusions.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Do not rush into conclusions when thoughts feel foggy. Ground yourself in daily wellness, prioritize restful sleep, and seek clarity before major commitments.',
    fullMeaning: 'The Moon governs the subconscious and emotional depth. Mukta helps you decode hidden dynamics and eliminate mental confusion so you can walk forward with clear confidence.'
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    arcana: 'Major Arcana XIX',
    image: 'assets/images/card-the-sun.jpg',
    keywords: 'Vitality, Joy, Success, Cellular Energy, Radiance',
    summary: 'Pure radiance, high vitality, and unmistakable success. Long-standing blocks and fatigue dissolve as warm positivity enters your life.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Celebrate your accomplishments. Nourish your vitality with wholesome plant proteins and omega-3s, express gratitude, and share your warmth with family.',
    fullMeaning: 'The Sun represents supreme vitality, physical health, and triumph. It brings joyful outcomes to questions about family, career growth, and holistic well-being.'
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    arcana: 'Major Arcana II',
    image: 'assets/images/card-high-priestess.jpg',
    keywords: 'Inner Wisdom, Spiritual Connection, Calm, Intuition',
    summary: 'Your inner wisdom holds the exact remedy you need. A quiet moment of introspection will reveal the answers you seek.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Step back from chaotic noise. When you cultivate a quiet mind and calm nervous system, your intuitive guidance speaks clearly and effortlessly.',
    fullMeaning: 'The High Priestess represents sacred knowledge and stillness. Mukta uses this archetype to teach seekers how to balance spiritual awareness with practical daily life.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    arcana: 'Major Arcana X',
    image: 'assets/images/card-wheel-of-fortune.jpg',
    keywords: 'Positive Cycles, Turning Points, Karmic Alignment',
    summary: 'A positive turning point is here. Situations that felt delayed or stuck are beginning to shift in your favor.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: A long-pending task or goal is gaining momentum. Embrace positive change, stay grounded in discipline, and trust the divine timing of your life.',
    fullMeaning: 'The Wheel of Fortune signals the arrival of supportive new cycles, opportunities, and karmic resolutions.'
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    arcana: 'Major Arcana VI',
    image: 'assets/images/card-the-lovers.jpg',
    keywords: 'Harmonious Relationships, Honest Choices, Mutual Respect',
    summary: 'Harmony, mutual understanding, and heart-centered alignment. A time of meaningful connection and clear decision-making.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Speak with compassion, listen with patience, and nurture emotional balance in your relationships. Mutual respect brings lifelong peace.',
    fullMeaning: 'The Lovers signifies profound emotional harmony, whether between partners, family members, or aligning personal values with life decisions.'
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    arcana: 'Major Arcana III',
    image: 'assets/images/card-the-empress.jpg',
    keywords: 'Abundance, Cellular Health, Nurturing, Prosperity',
    summary: 'A flourishing phase of prosperity, health, and holistic abundance. What you nourish with love and proper care is ready to thrive.',
    guidance: 'Mukta’s Mind-Body-Soul Remedy: Honor your body as a sacred temple. Wholesome nutrition (oats, jowar, makhana), positive thoughts, and gentle self-care are the foundations of true abundance.',
    fullMeaning: 'The Empress represents maternal warmth, creative fertility, and holistic wellness—a signature archetype reflecting Mukta’s Mind, Body & Soul philosophy.'
  }
];

function initTarotDeck() {
  const container = document.getElementById('reading-deck-container');
  const singleTab = document.getElementById('tab-single');
  const threeTab = document.getElementById('tab-three');
  const reshuffleBtn = document.getElementById('reshuffle-btn');
  const resultBox = document.getElementById('reading-result-box');

  if (!container) return;

  let currentMode = 'single';
  let drawnCards = [];

  function setupSpread() {
    container.innerHTML = '';
    if (resultBox) {
      resultBox.classList.remove('show');
      resultBox.style.display = 'none';
      resultBox.innerHTML = '';
    }

    const count = currentMode === 'single' ? 1 : 3;
    const labels = currentMode === 'single'
      ? ['Daily Intuitive & Vitality Card']
      : ['1. Mind & Past Influences', '2. Body & Present Reality', '3. Soul & Guiding Horizon'];

    const shuffled = [...TAROT_CARDS].sort(() => 0.5 - Math.random());
    drawnCards = shuffled.slice(0, count);

    for (let i = 0; i < count; i++) {
      const cardData = drawnCards[i];
      const slot = document.createElement('div');
      slot.className = 'tarot-slot';

      const label = document.createElement('div');
      label.className = 'slot-label';
      label.textContent = labels[i];

      const card = document.createElement('div');
      card.className = 'interactive-card';
      card.dataset.index = i;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Reveal ${labels[i]}`);

      card.innerHTML = `
        <div class="card-face card-back">
          <img src="assets/images/card-back.jpg" alt="Celestial Tarot Card Back" loading="lazy">
        </div>
        <div class="card-face card-front">
          <img src="${cardData.image}" alt="${cardData.name}" loading="lazy">
        </div>
      `;

      function triggerFlip() {
        if (!card.classList.contains('revealed')) {
          playTarotChime();
          card.classList.add('revealed');
          checkAllRevealed();
        }
      }

      card.addEventListener('click', triggerFlip);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerFlip();
        }
      });

      slot.appendChild(label);
      slot.appendChild(card);
      container.appendChild(slot);
    }
  }

  function checkAllRevealed() {
    const allCards = container.querySelectorAll('.interactive-card');
    const revealed = container.querySelectorAll('.interactive-card.revealed');

    if (allCards.length === revealed.length) {
      showReadingInterpretation();
    }
  }

  function showReadingInterpretation() {
    if (!resultBox) return;
    let html = '';
    if (currentMode === 'single') {
      const c = drawnCards[0];
      html = `
        <div class="flex items-center gap-3 mb-4 text-[#e6cb87]">
          <span class="text-2xl">✦</span>
          <h3 class="font-serif text-2xl text-white">${c.name} — <span class="text-[#e6cb87] font-normal">${c.keywords}</span></h3>
        </div>
        <p class="text-[#c4b5d4] text-base leading-relaxed mb-4">${c.summary}</p>
        <div class="border-l-4 border-[#c5a059] bg-[#1a0c36] p-4 rounded-r-[6px]">
          <div class="text-xs uppercase tracking-wider text-[#e6cb87] font-bold mb-1">Mukta's Mind-Body-Soul Guidance & Remedy:</div>
          <p class="font-serif italic text-white text-sm leading-relaxed">${c.guidance}</p>
        </div>
      `;
    } else {
      const positions = ['Mind (Past Roots)', 'Body (Present Energy)', 'Soul (Guiding Horizon)'];
      html = `
        <div class="flex items-center gap-3 mb-4 text-[#e6cb87]">
          <span class="text-2xl">✦</span>
          <h3 class="font-serif text-2xl text-white">Three-Pillar Mind-Body-Soul Spread</h3>
        </div>
      `;
      drawnCards.forEach((c, idx) => {
        html += `
          <div class="mt-4 pt-4 border-t border-white/10">
            <div class="text-[#e6cb87] font-semibold text-base mb-1 font-serif">
              ${positions[idx]}: <span class="text-white">${c.name}</span> <span class="text-xs text-[#8b79a5] font-sans font-normal">(${c.keywords})</span>
            </div>
            <p class="text-[#c4b5d4] text-sm leading-relaxed mb-2">${c.summary}</p>
          </div>
        `;
      });
      html += `
        <div class="mt-5 p-4 bg-[#1a0c36] border-l-4 border-[#c5a059] rounded-r-[6px]">
          <div class="text-xs uppercase tracking-wider text-[#e6cb87] font-bold mb-1">Synthesized Holistic Insight:</div>
          <p class="font-serif italic text-white text-sm leading-relaxed">
            The transition from ${drawnCards[0].name} into ${drawnCards[2].name} shows that addressing emotional tension while nourishing your cellular health will remove roadblocks and create an empowered, balanced life.
          </p>
        </div>
      `;
    }

    resultBox.innerHTML = html;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (singleTab && threeTab) {
    singleTab.addEventListener('click', () => {
      if (currentMode !== 'single') {
        currentMode = 'single';
        singleTab.classList.add('bg-[#c5a059]/30', 'text-white', 'border-[#c5a059]');
        singleTab.classList.remove('text-[#a99fb7]', 'border-transparent');
        threeTab.classList.remove('bg-[#c5a059]/30', 'text-white', 'border-[#c5a059]');
        threeTab.classList.add('text-[#a99fb7]');
        setupSpread();
      }
    });

    threeTab.addEventListener('click', () => {
      if (currentMode !== 'three') {
        currentMode = 'three';
        threeTab.classList.add('bg-[#c5a059]/30', 'text-white', 'border-[#c5a059]');
        threeTab.classList.remove('text-[#a99fb7]');
        singleTab.classList.remove('bg-[#c5a059]/30', 'text-white', 'border-[#c5a059]');
        singleTab.classList.add('text-[#a99fb7]');
        setupSpread();
      }
    });
  }

  if (reshuffleBtn) {
    reshuffleBtn.addEventListener('click', () => {
      playTarotChime();
      setupSpread();
    });
  }

  // Initial setup
  setupSpread();
}

/* ==========================================================================
   5. GALLERY CARD INSPECTOR MODAL
   ========================================================================== */
function initGalleryModals() {
  const modalOverlay = document.getElementById('card-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (!modalOverlay) return;

  function openCardModal(cardData) {
    document.getElementById('modal-card-title').textContent = cardData.name;
    document.getElementById('modal-card-arcana').textContent = cardData.arcana;
    document.getElementById('modal-card-keywords').textContent = cardData.keywords;
    document.getElementById('modal-card-desc').textContent = cardData.fullMeaning;
    document.getElementById('modal-card-guidance').textContent = cardData.guidance;
    const imgEl = document.getElementById('modal-card-img');
    imgEl.src = cardData.image;
    imgEl.alt = cardData.name;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cardId = card.dataset.cardId;
      const found = TAROT_CARDS.find(c => c.id === cardId);
      if (found) {
        openCardModal(found);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. UNIFIED BOOKING ENGINE (Tarot & Cellular Wellness)
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const selectPackage = document.getElementById('package-type');
  const selectFocus = document.getElementById('guidance-focus');
  const priceDisplay = document.getElementById('price-val');
  const includesDisplay = document.getElementById('includes-val');
  const whatsappBtn = document.getElementById('whatsapp-book-btn');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmClose = document.getElementById('confirm-close-btn');

  const consentCheckbox = document.getElementById('data-consent');
  const submitBtn = document.getElementById('submit-booking-btn');
  const consentHint = document.getElementById('consent-hint');

  // Unified Comprehensive Packages across Tarot & Health Coaching
  const PACKAGES_MAP = {
    'one-question': {
      name: 'Tarot Guidance: One Question with Remedy',
      price: '₹1,100',
      description: 'Tarot reading for 1 specific question, actionable spiritual guidance, and customized remedy.'
    },
    'two-questions': {
      name: 'Tarot Guidance: Two Questions with Remedy',
      price: '₹2,100',
      description: 'In-depth tarot reading for 2 questions, clarity on key dynamics, and targeted remedies.'
    },
    'monthly-guidance': {
      name: 'Tarot Guidance: Detailed Month Roadmap with Remedy',
      price: '₹5,100',
      description: 'Comprehensive 30-day forecast across relationships, career, health & life with remedies.'
    },
    'health-coaching': {
      name: 'Cellular Health Coaching & Diet Blueprint',
      price: 'Personal Consultation',
      description: 'ISMN holistic nutrition plan, gut health, everyday protein recipes & cellular energy blueprint.'
    },
    'holistic-combo': {
      name: '360° Mind-Body-Soul Holistic Combo Session',
      price: 'Special Combo',
      description: 'Complete integrated consultation: In-depth Tarot Reading + Personalized Cellular Wellness Plan.'
    },
    'wellness-workshop': {
      name: 'Wellness & Nutrition Workshop / Seminar',
      price: 'Group / Community',
      description: 'Interactive nutrition seminar covering oats, jowar, makhana, omega-3s, and gut health.'
    }
  };

  function updatePricing() {
    if (!selectPackage) return;
    const val = selectPackage.value;
    const item = PACKAGES_MAP[val] || PACKAGES_MAP['one-question'];
    if (priceDisplay) priceDisplay.textContent = item.price;
    if (includesDisplay) includesDisplay.textContent = item.description;
  }

  if (selectPackage) {
    selectPackage.addEventListener('change', updatePricing);
    updatePricing();
  }

  // Pre-fill from package buttons across both Tarot and Wellness cards
  document.querySelectorAll('.btn-select-package').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const packageKey = btn.dataset.package;
      if (selectPackage && PACKAGES_MAP[packageKey]) {
        selectPackage.value = packageKey;
        updatePricing();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Handle Consent Checkbox Change to Enable/Disable Submit Button
  if (consentCheckbox && submitBtn) {
    function handleConsentToggle() {
      if (consentCheckbox.checked) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('disabled');
        if (consentHint) {
          consentHint.textContent = '✓ Consent provided. You can now submit your booking inquiry.';
          consentHint.classList.remove('text-[#8b79a5]');
          consentHint.classList.add('text-emerald-400');
        }
      } else {
        submitBtn.disabled = true;
        submitBtn.setAttribute('disabled', 'true');
        if (consentHint) {
          consentHint.textContent = 'Please check the box above to enable submission.';
          consentHint.classList.add('text-[#8b79a5]');
          consentHint.classList.remove('text-emerald-400');
        }
      }
    }

    consentCheckbox.addEventListener('change', handleConsentToggle);
    handleConsentToggle();
  }

  // Direct WhatsApp booking with full holistic parameters
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (consentCheckbox && !consentCheckbox.checked) {
        consentCheckbox.focus();
        if (consentHint) {
          consentHint.textContent = '⚠ Please check the consent box to proceed with WhatsApp inquiry.';
          consentHint.classList.add('text-amber-400');
        }
        return;
      }

      const name = document.getElementById('name')?.value || 'Seeker';
      const packageKey = selectPackage?.value || 'one-question';
      const packageInfo = PACKAGES_MAP[packageKey] || PACKAGES_MAP['one-question'];
      const focus = selectFocus?.value || 'Holistic Mind, Body & Soul Balance';
      const mode = document.getElementById('consult-format')?.value || 'Online (Phone / WhatsApp Call)';
      const preferredTiming = document.getElementById('preferred-timing')?.value || 'Flexible Window';
      const date = document.getElementById('date')?.value || 'Earliest Available';
      const msg = document.getElementById('message')?.value || '';

      const text = encodeURIComponent(
        `Hello Mukta Ji! I would like to book a session on your Holistic Well-Being Platform:\n\n` +
        `• Name: ${name}\n` +
        `• Service / Package: ${packageInfo.name} (${packageInfo.price})\n` +
        `• Holistic Focus Area: ${focus}\n` +
        `• Consultation Format: ${mode}\n` +
        `• Preferred Timing: ${preferredTiming}\n` +
        `• Preferred Date: ${date}\n` +
        (msg ? `• Query / Details: ${msg}\n` : '') +
        `\nI have consented to share my details for this consultation. Please let me know your available slots and payment details. Thank you!`
      );

      window.open(`https://wa.me/919711241456?text=${text}`, '_blank');
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (consentCheckbox && !consentCheckbox.checked) {
        alert('Please provide your consent to share your contact details for scheduling.');
        return;
      }

      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const packageKey = selectPackage?.value || 'one-question';
      const packageInfo = PACKAGES_MAP[packageKey] || PACKAGES_MAP['one-question'];

      const confirmSummary = document.getElementById('confirm-summary');
      if (confirmSummary) {
        confirmSummary.innerHTML = `
          <p class="text-white">Thank you, <strong>${name}</strong>! Your inquiry for <strong>${packageInfo.name} (${packageInfo.price})</strong> has been received.</p>
          <p style="margin-top:12px; color:#c4b5d4;">Mukta Bhatnagar will review your requirements and coordinate your slot via WhatsApp / Email (<strong>${email}</strong>) shortly.</p>
          <div class="mt-4 p-3 bg-[#1e0e3d] rounded-[4px] text-xs text-[#e6cb87]">
            Platform Timings: Health Coaching (11:30 AM – 5:30 PM) | Tarot Sessions (8:30 PM – 10:30 PM)
          </div>
        `;
      }

      if (confirmModal) {
        confirmModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
      updatePricing();
      if (consentCheckbox && submitBtn) {
        submitBtn.disabled = true;
        if (consentHint) {
          consentHint.textContent = 'Please check the box above to enable submission.';
          consentHint.classList.add('text-[#8b79a5]');
          consentHint.classList.remove('text-emerald-400');
        }
      }
    });
  }

  if (confirmClose && confirmModal) {
    confirmClose.addEventListener('click', () => {
      confirmModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        confirmModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   7. COOKIE CONSENT BANNER & PREFERENCES
   ========================================================================== */
function initCookieConsent() {
  const banner = document.getElementById('cookie-consent-banner');
  const acceptAllBtn = document.getElementById('cookie-accept-all');
  const essentialBtn = document.getElementById('cookie-essential-only');
  const openSettingsBtn = document.getElementById('cookie-settings-btn');
  const reopenTrigger = document.getElementById('reopen-cookie-settings');
  const cookieModal = document.getElementById('cookie-modal');
  const cookieModalClose = document.getElementById('cookie-modal-close');
  const savePreferencesBtn = document.getElementById('cookie-save-preferences');

  const STORAGE_KEY = 'mukta_cookie_consent_choice';

  function showBanner() {
    if (banner) banner.classList.add('show');
  }

  function hideBanner() {
    if (banner) banner.classList.remove('show');
  }

  const savedConsent = localStorage.getItem(STORAGE_KEY);
  if (!savedConsent) {
    setTimeout(showBanner, 900);
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
      }));
      hideBanner();
    });
  }

  if (essentialBtn) {
    essentialBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
      }));
      hideBanner();
    });
  }

  function openCookieModal() {
    if (cookieModal) {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const analyticsBox = document.getElementById('cookie-analytics-toggle');
        const marketingBox = document.getElementById('cookie-marketing-toggle');
        if (analyticsBox) analyticsBox.checked = saved.analytics !== false;
        if (marketingBox) marketingBox.checked = saved.marketing !== false;
      } catch (e) {}

      cookieModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCookieModal() {
    if (cookieModal) {
      cookieModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openCookieModal);
  if (reopenTrigger) reopenTrigger.addEventListener('click', (e) => { e.preventDefault(); openCookieModal(); });
  if (cookieModalClose) cookieModalClose.addEventListener('click', closeCookieModal);

  if (cookieModal) {
    cookieModal.addEventListener('click', (e) => {
      if (e.target === cookieModal) closeCookieModal();
    });
  }

  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener('click', () => {
      const analytics = document.getElementById('cookie-analytics-toggle')?.checked ?? false;
      const marketing = document.getElementById('cookie-marketing-toggle')?.checked ?? false;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        essential: true,
        analytics: analytics,
        marketing: marketing,
        timestamp: new Date().toISOString()
      }));
      closeCookieModal();
      hideBanner();
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE LIFE SITUATION & PACKAGE RECOMMENDER
   ========================================================================== */
function initInteractiveAssessment() {
  const chips = document.querySelectorAll('.assessment-chip');
  const resultCard = document.getElementById('assessment-recommendation-card');
  const recTitle = document.getElementById('rec-title');
  const recDesc = document.getElementById('rec-desc');
  const recPrice = document.getElementById('rec-price');
  const recBtn = document.getElementById('rec-action-btn');
  const recWaBtn = document.getElementById('rec-wa-btn');

  const recommendations = {
    'love': {
      title: 'Two Questions Tarot Session & Love Remedies',
      desc: 'Deep exploration of relationship dynamics, mutual energy alignment, and Occult Academy certified remedies for emotional peace.',
      price: '₹2,100',
      packageVal: 'two-questions',
      focusVal: 'Relationship & Love',
      waText: 'Hello Mukta Ji, I did the online assessment for Relationship & Love guidance. I would like to book the Two Questions Package (₹2,100).'
    },
    'career': {
      title: 'Two Questions Tarot Session (Career & Financial Momentum)',
      desc: 'Unlocking blockages in business, job transition timing, partnership decisions, and actionable prosperity remedies.',
      price: '₹2,100',
      packageVal: 'two-questions',
      focusVal: 'Career Growth & Success',
      waText: 'Hello Mukta Ji, I did the online assessment for Career & Financial guidance. I would like to book the Two Questions Package (₹2,100).'
    },
    'health': {
      title: 'Cellular Health & Integrative Diet Blueprint',
      desc: '1-on-1 personalized wellness consultation addressing gut health, energy restoration, everyday nutrition (oats, jowar, makhana), and anti-inflammatory eating.',
      price: '₹2,100',
      packageVal: 'health-coaching',
      focusVal: 'Cellular Health & Nutrition',
      waText: 'Hello Mukta Ji, I am seeking Cellular Health Coaching based on your ISMN Diploma expertise. I would like to book a consultation.'
    },
    'reset': {
      title: '360° Mind-Body-Soul Full Integration Session',
      desc: 'Complete holistic overhaul: In-depth Tarot Reading with Remedies (Mind & Soul) combined with Cellular Nutrition Blueprint (Body).',
      price: '₹5,100',
      packageVal: 'holistic-combo',
      focusVal: 'Complete Mind-Body-Soul Harmony',
      waText: 'Hello Mukta Ji, I am seeking complete Mind-Body-Soul Harmony. I would like to book the 360° Combo Session (₹5,100).'
    },
    'monthly': {
      title: 'Detailed 30-Day Life Roadmap & Ongoing Guidance',
      desc: 'Comprehensive monthly forecast across Relationships, Health, and Career with structured weekly remedy adjustments.',
      price: '₹5,100',
      packageVal: 'monthly-guidance',
      focusVal: 'Monthly Life Roadmap',
      waText: 'Hello Mukta Ji, I would like to book the Detailed 30-Day Life Roadmap Package (₹5,100).'
    }
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const topic = chip.dataset.topic;
      const data = recommendations[topic] || recommendations['love'];

      if (recTitle) recTitle.textContent = data.title;
      if (recDesc) recDesc.textContent = data.desc;
      if (recPrice) recPrice.textContent = data.price;

      if (recBtn) {
        recBtn.onclick = () => {
          const packageSelect = document.getElementById('package-type');
          const focusSelect = document.getElementById('guidance-focus');
          if (packageSelect) {
            packageSelect.value = data.packageVal;
            packageSelect.dispatchEvent(new Event('change'));
          }
          if (focusSelect) {
            focusSelect.value = data.focusVal;
          }
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          }
        };
      }

      if (recWaBtn) {
        recWaBtn.href = `https://wa.me/919711241456?text=${encodeURIComponent(data.waText)}`;
      }

      if (resultCard) {
        resultCard.style.display = 'block';
      }
    });
  });
}



/* ==========================================================================
   12. FLOATING QUICK ACTION BAR (Instant Customer Engagement)
   ========================================================================== */
function initFloatingQuickBar() {
  const quickBar = document.getElementById('floating-quick-bar');
  if (!quickBar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 380) {
          quickBar.classList.add('visible');
        } else {
          quickBar.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
