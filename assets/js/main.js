/**
 * Cozy & Warm Hand-Drawn Diary Logic (CozyPaw)
 * Built with care for smooth transitions and delightful micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Interactive Card Slider (One Post at a Time)
  // ==========================================
  const cards = document.querySelectorAll('.diary-deck .diary-card');
  const prevBtn = document.getElementById('cozy-prev-btn');
  const nextBtn = document.getElementById('cozy-next-btn');
  const dotsContainer = document.getElementById('cozy-nav-dots');
  const progressBar = document.getElementById('cozy-progress-bar');
  const progressWalker = document.getElementById('cozy-progress-walker');
  
  let currentIndex = 0;
  const totalCards = cards.length;

  if (totalCards > 0) {
    // Generate navigation dot indicators
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('div');
      dot.classList.add('indicator-dot');
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => {
        navigateTo(i);
      });
      dotsContainer.appendChild(dot);
    }

    // Show initial card
    updateSlider();

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          navigateTo(currentIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
          navigateTo(currentIndex + 1);
        }
      });
    }

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) navigateTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < totalCards - 1) navigateTo(currentIndex + 1);
      }
    });

    // Touch Swiping for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const deckElement = document.querySelector('.diary-deck');

    if (deckElement) {
      deckElement.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      deckElement.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipe = 50; // pixels
      if (swipeDistance > minSwipe) {
        // Swipe Right -> Previous card
        if (currentIndex > 0) navigateTo(currentIndex - 1);
      } else if (swipeDistance < -minSwipe) {
        // Swipe Left -> Next card
        if (currentIndex < totalCards - 1) navigateTo(currentIndex + 1);
      }
    }
  }

  function navigateTo(index) {
    if (index === currentIndex) return;
    
    // Smooth transition trigger
    const currentCard = cards[currentIndex];
    const targetCard = cards[index];
    
    if (currentCard && targetCard) {
      currentCard.style.opacity = '0';
      currentCard.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        currentIndex = index;
        updateSlider();
      }, 200);
    } else {
      currentIndex = index;
      updateSlider();
    }
  }

  function updateSlider() {
    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.remove('is-hidden');
        card.classList.add('is-active');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.classList.remove('is-active');
        card.classList.add('is-hidden');
      }
    });

    // Update Dots
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });

    // Update Buttons
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalCards - 1;

    // Update Progress bar & Walking Paw Print
    if (totalCards > 1) {
      const percentage = (currentIndex / (totalCards - 1)) * 100;
      if (progressBar) progressBar.style.width = `${percentage}%`;
      if (progressWalker) progressWalker.style.left = `${percentage}%`;
    } else {
      if (progressBar) progressBar.style.width = `100%`;
      if (progressWalker) progressWalker.style.left = `100%`;
    }
  }

  // ==========================================
  // 2. Cozy Mascot Widget (Lucky Kitty Speech Bubbles)
  // ==========================================
  const mascotContainer = document.getElementById('cozy-mascot-container');
  const speechBubble = document.getElementById('mascot-speech');
  
  const cozyQuotes = [
    "今天也是元氣滿滿的一天唷！🐾",
    "累了的話，不妨喝杯暖烘烘的熱可可吧 ☕",
    "你今天已經做得非常棒了，抱抱一個 💕",
    "幸運小貓正默默地為你加油打氣呢 ✨",
    "抬頭看看天上的白雲，心事也會隨風飄走喔 ☁️",
    "小確幸就在身邊，今天有吃到好吃的東西嗎？🍰",
    "不管遇到什麼，小貓都會一直溫暖陪伴你唷 🌸",
    "今天也是特別的一天，因為有你在 🌟",
    "揉揉眼睛，給自己一個大大的微笑吧 😊",
    "聽說點一下我的尾巴，今天就會發生超級幸運的事唷！🐱",
    "呼嚕呼嚕... 軟綿綿的微風吹過來了，好舒服 🍃",
    "在生活的小細節裡，藏著無數個小驚喜等著你去發現呢 🎁"
  ];

  let lastQuoteIndex = -1;

  if (mascotContainer && speechBubble) {
    mascotContainer.addEventListener('click', () => {
      // Find a random quote different from the last one
      let randIdx;
      do {
        randIdx = Math.floor(Math.random() * cozyQuotes.length);
      } while (randIdx === lastQuoteIndex && cozyQuotes.length > 1);
      
      lastQuoteIndex = randIdx;
      const selectedQuote = cozyQuotes[randIdx];

      // Bounce animation on speech bubble
      speechBubble.style.animation = 'none';
      speechBubble.offsetHeight; // trigger reflow
      speechBubble.style.animation = 'speechFloat 3s infinite ease-in-out';
      
      speechBubble.textContent = selectedQuote;
      
      // Fun little wobble animation on the cat wrapper on click
      const catWrapper = mascotContainer.querySelector('.mascot-wrapper');
      if (catWrapper) {
        catWrapper.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
          catWrapper.style.transform = '';
        }, 300);
      }
    });

    // Auto-change speech bubble after a delay to keep it lively
    setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of auto-mumbling every 15 seconds
        const randIdx = Math.floor(Math.random() * cozyQuotes.length);
        speechBubble.textContent = cozyQuotes[randIdx];
      }
    }, 15000);
  }

  // ==========================================
  // 3. Dual-Mode View Switcher (Deck vs Grid)
  // ==========================================
  const toggleDeckBtn = document.getElementById('toggle-deck-btn');
  const toggleGridBtn = document.getElementById('toggle-grid-btn');
  const deckSection = document.getElementById('deck-view-section');
  const gridSection = document.getElementById('grid-view-section');

  if (toggleDeckBtn && toggleGridBtn && deckSection && gridSection) {
    toggleDeckBtn.addEventListener('click', () => {
      toggleDeckBtn.classList.add('is-active');
      toggleGridBtn.classList.remove('is-active');
      deckSection.classList.remove('is-hidden-view');
      gridSection.classList.add('is-hidden-view');
    });

    toggleGridBtn.addEventListener('click', () => {
      toggleGridBtn.classList.add('is-active');
      toggleDeckBtn.classList.remove('is-active');
      deckSection.classList.add('is-hidden-view');
      gridSection.classList.remove('is-hidden-view');
    });
  }

  // ==========================================
  // 4. Interactive 3D Tarot Cards Game Logic
  // ==========================================
  function initTarotGames() {
    const gameWrappers = document.querySelectorAll('.lucky-game-wrapper');

    gameWrappers.forEach((wrapper) => {
      const cards = wrapper.querySelectorAll('.flip-card');
      const actionRow = wrapper.querySelector('.lucky-game-actions');
      const resetBtn = wrapper.querySelector('.reset-game-btn');

      cards.forEach((card) => {
        card.addEventListener('click', () => {
          // If already flipped, do nothing
          if (card.classList.contains('is-flipped')) return;

          // Flip this card
          card.classList.add('is-flipped');

          // Trigger Sparkle Spark Particles!
          createSparkles(card);

          // Add a slightly dimmed look to other cards so the flipped card stands out
          cards.forEach((otherCard) => {
            if (otherCard !== card) {
              otherCard.style.opacity = '0.5';
              otherCard.style.transform = 'scale(0.92)';
              otherCard.style.pointerEvents = 'none';
            }
          });

          // Show Reset Button
          if (actionRow) {
            actionRow.classList.remove('is-hidden-view');
          }
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          cards.forEach((card) => {
            card.classList.remove('is-flipped');
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = 'auto';
          });

          if (actionRow) {
            actionRow.classList.add('is-hidden-view');
          }
        });
      }
    });
  }

  // Particle Sparkle Emitter
  function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = window.scrollX + rect.left + rect.width / 2;
    const centerY = window.scrollY + rect.top + rect.height / 2;

    const emojis = ['✨', '💖', '🌟', '🌸', '🐾', '🎈'];

    for (let i = 0; i < 24; i++) {
      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      // Random target angles and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = -180 + Math.random() * 360;

      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(particle);

      // Clean up after animation finishes
      setTimeout(() => {
        particle.remove();
      }, 1200);
    }
  }

  // Initialize Tarot games
  initTarotGames();
});


