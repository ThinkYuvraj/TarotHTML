/**
 * MEHER TAROT — SCRIPT SYSTEM
 * Interactive card spreads, audio chimes, modal inspectors, theme switcher, and booking flow
 */

document.addEventListener('DOMContentLoaded', () => {
  initStardust();
  initTheme();
  initNavigation();
  initTarotDeck();
  initGalleryModals();
  initBookingForm();
});

/* ==========================================================================
   1. STARDUST BACKGROUND CANVAS
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
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
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
      ctx.fillStyle = `rgba(229, 193, 88, ${Math.max(0.1, Math.min(0.8, this.alpha))})`;
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
   2. THEME CONTROLLER (Midnight Velvet / Parchment Gold)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('meher_tarot_theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('meher_tarot_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('meher_tarot_theme', 'light');
    }
  });
}

/* ==========================================================================
   3. NAVIGATION & MOBILE HAMBURGER
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', expanded);
    });

    // Close when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. WEB AUDIO SOUND EFFECTS (Synthesized Ethereal Chime)
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
    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6 ethereal pentatonic
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
    // Audio context may be restricted before user gesture
  }
}

/* ==========================================================================
   5. TAROT DECK DATA & INTERACTIVE SPREADS
   ========================================================================== */
const TAROT_CARDS = [
  {
    id: 'the-star',
    name: 'The Star',
    arcana: 'Major Arcana XVII',
    image: 'assets/images/card-the-star.jpg',
    keywords: 'Hope, Renewal, Serenity, Inspiration, Faith',
    summary: 'A luminous blessing after the storm. You are being invited to breathe, trust your quiet vision, and release lingering doubt.',
    guidance: 'Whatever felt exhausted is gently replenishing. Pour your energy into what sustains your spirit, not what demands performance.',
    fullMeaning: 'The Star shines with calm, crystalline reassurance. When this card appears, it signifies peace following period of testing. It urges you to reconnect with your authentic purpose and open your heart to quiet blessings.'
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    arcana: 'Major Arcana XVIII',
    image: 'assets/images/card-the-moon.jpg',
    keywords: 'Intuition, Dreams, Illusions, Unconscious Truths',
    summary: 'Not everything is visible under direct sunlight. Subtle signs and gut feelings carry more truth right now than surface facts.',
    guidance: 'Do not rush to force decisions while the fog lingers. Walk gently, listen to your dreams, and allow hidden dynamics to show themselves.',
    fullMeaning: 'The Moon presides over the twilight world of instincts, dreams, and unconscious impulses. It advises patience: allow illusions to dissolve naturally rather than jumping to fear-driven conclusions.'
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    arcana: 'Major Arcana XIX',
    image: 'assets/images/card-the-sun.jpg',
    keywords: 'Clarity, Joy, Vitality, Success, Confidence',
    summary: 'Pure radiance and unmistakable breakthrough. Shadows recede as your true direction becomes unmistakable.',
    guidance: 'Step into the light without apologising for your warmth. Success is not an accident—it is the natural result of your alignment.',
    fullMeaning: 'The Sun represents supreme optimism, warmth, and vitality. It promises clarity where there was confusion and celebrations where there was once solitary toil.'
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    arcana: 'Major Arcana II',
    image: 'assets/images/card-high-priestess.jpg',
    keywords: 'Inner Wisdom, Stillness, Intuition, Mystery',
    summary: 'The answer already sits inside you. You do not need outside validation for what your soul already knows.',
    guidance: 'Withdraw slightly from the noise of others\' opinions. Silence is where your sharpest discernment speaks.',
    fullMeaning: 'Seated between the twin pillars of dark and light, The High Priestess is the keeper of inner wisdom and ancient mysteries. She reminds you that intuition is faster than rational calculation.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    arcana: 'Major Arcana X',
    image: 'assets/images/card-wheel-of-fortune.jpg',
    keywords: 'Cycles, Destiny, Turning Points, Alignment',
    summary: 'A cyclical shift is underway. Circumstances that felt stagnant are beginning to rotate in unexpected, supportive ways.',
    guidance: 'Do not grip tightly onto outdated phases. Stay centered at the wheel\'s hub while the outer edges spin.',
    fullMeaning: 'The Wheel of Fortune symbolizes life\'s inevitable cycles, karma, and sudden strokes of synchronicity. When the wheel turns, resistance only exhausts you—adaptability leads to expansion.'
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    arcana: 'Major Arcana VI',
    image: 'assets/images/card-the-lovers.jpg',
    keywords: 'Sacred Union, Harmony, Choice, Deep Connection',
    summary: 'A profound choice rooted in personal truth. Alignment of head and heart brings clarity to relationships and core values.',
    guidance: 'Choose what reflects who you are becoming, not who you were taught to be to please others.',
    fullMeaning: 'Far beyond conventional romantic romance, The Lovers calls you to honor mutual respect, moral integrity, and authentic vulnerability in partnerships and personal commitments.'
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    arcana: 'Major Arcana III',
    image: 'assets/images/card-the-empress.jpg',
    keywords: 'Abundance, Sensuality, Creative Fertility, Nurturing',
    summary: 'A lush period of creative birth and gentle nourishment. What you tend with care is ready to flourish.',
    guidance: 'Treat yourself with generous grace. Creative breakthroughs require warmth, patience, and grounded sensory joy.',
    fullMeaning: 'The Empress embodies nature\'s boundless fertile creativity. She encourages sensory grounding, honoring your body, and allowing projects and relationships to blossom organically.'
  }
];

function initTarotDeck() {
  const container = document.getElementById('reading-deck-container');
  const singleTab = document.getElementById('tab-single');
  const threeTab = document.getElementById('tab-three');
  const reshuffleBtn = document.getElementById('reshuffle-btn');
  const resultBox = document.getElementById('reading-result-box');

  if (!container) return;

  let currentMode = 'single'; // 'single' | 'three'
  let drawnCards = [];

  function setupSpread() {
    container.innerHTML = '';
    resultBox.classList.remove('show');
    resultBox.innerHTML = '';

    const count = currentMode === 'single' ? 1 : 3;
    const labels = currentMode === 'single'
      ? ['Card of the Day']
      : ['1. Past Influences', '2. Present Reality', '3. Guiding Horizon'];

    // Randomly pick unique cards
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
    let html = '';
    if (currentMode === 'single') {
      const c = drawnCards[0];
      html = `
        <h3>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${c.name} — ${c.keywords}
        </h3>
        <p>${c.summary}</p>
        <p class="reading-guidance"><strong>Meher's Guidance:</strong> ${c.guidance}</p>
      `;
    } else {
      const positions = ['Past Influences', 'Present Reality', 'Guiding Horizon'];
      html = `
        <h3>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Three-Card Story Spread
        </h3>
      `;
      drawnCards.forEach((c, idx) => {
        html += `
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border);">
            <strong style="color:var(--gold-bright);">${positions[idx]}: ${c.name}</strong> (${c.keywords})
            <p style="margin-top:4px;">${c.summary}</p>
          </div>
        `;
      });
      html += `
        <p class="reading-guidance" style="margin-top:16px;">
          <strong>Synthesized Insight:</strong> The arc from ${drawnCards[0].name} to ${drawnCards[2].name} shows that what you learned previously now opens the gateway to your next expansion. Honor your pace.
        </p>
      `;
    }

    resultBox.innerHTML = html;
    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (singleTab && threeTab) {
    singleTab.addEventListener('click', () => {
      if (currentMode !== 'single') {
        currentMode = 'single';
        singleTab.classList.add('active');
        threeTab.classList.remove('active');
        setupSpread();
      }
    });

    threeTab.addEventListener('click', () => {
      if (currentMode !== 'three') {
        currentMode = 'three';
        threeTab.classList.add('active');
        singleTab.classList.remove('active');
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
   6. GALLERY CARD INSPECTOR MODAL
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
   7. BOOKING SYSTEM & PRICING SYNC
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  const selectReading = document.getElementById('reading-type');
  const priceDisplay = document.getElementById('price-val');
  const timeDisplay = document.getElementById('time-val');
  const whatsappBtn = document.getElementById('whatsapp-book-btn');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmClose = document.getElementById('confirm-close-btn');

  const PRICING_MAP = {
    'love': { name: 'Love & Relationships', time: '30 min', price: '₹999' },
    'career': { name: 'Career & Purpose', time: '45 min', price: '₹1,499' },
    'lifepath': { name: 'Life Path Consultation', time: '60 min', price: '₹1,999' },
    'yearly': { name: 'Yearly 12-Month Forecast', time: '75 min', price: '₹2,999' },
    'crossroads': { name: 'Crossroads & Decision Protocol', time: '45 min', price: '₹1,499' },
    'dreams': { name: 'Dreams & Unconscious Archetypes', time: '30 min', price: '₹999' }
  };

  function updatePricing() {
    if (!selectReading) return;
    const val = selectReading.value;
    const item = PRICING_MAP[val] || PRICING_MAP['love'];
    if (priceDisplay) priceDisplay.textContent = item.price;
    if (timeDisplay) timeDisplay.textContent = item.time;
  }

  if (selectReading) {
    selectReading.addEventListener('change', updatePricing);
    updatePricing();
  }

  // Pre-fill from Services buttons
  document.querySelectorAll('.btn-select-service').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceKey = btn.dataset.service;
      if (selectReading && PRICING_MAP[serviceKey]) {
        selectReading.value = serviceKey;
        updatePricing();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Direct WhatsApp instant booking
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || 'Guest';
      const serviceKey = selectReading?.value || 'love';
      const service = PRICING_MAP[serviceKey]?.name || 'Tarot Reading';
      const date = document.getElementById('date')?.value || 'Flexible';
      const mode = document.getElementById('consult-format')?.value || 'Video Call';
      const msg = document.getElementById('message')?.value || '';

      const text = encodeURIComponent(
        `Hello Meher! I'd like to book a tarot reading session:\n` +
        `• Name: ${name}\n` +
        `• Reading: ${service}\n` +
        `• Format: ${mode}\n` +
        `• Preferred Date: ${date}\n` +
        (msg ? `• Question: ${msg}\n` : '') +
        `Please let me know your available slots.`
      );

      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const serviceKey = selectReading?.value || 'love';
      const serviceInfo = PRICING_MAP[serviceKey] || PRICING_MAP['love'];

      // Populate confirmation modal
      const confirmSummary = document.getElementById('confirm-summary');
      if (confirmSummary) {
        confirmSummary.innerHTML = `
          <p>Thank you, <strong>${name}</strong>! Your inquiry for <strong>${serviceInfo.name} (${serviceInfo.price})</strong> has been received.</p>
          <p style="margin-top:10px; color:var(--text-muted);">A confirmation and time selection invite will be dispatched to <strong>${email}</strong> within 24 hours.</p>
        `;
      }

      if (confirmModal) {
        confirmModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
      updatePricing();
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
