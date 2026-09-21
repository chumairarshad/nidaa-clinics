/**
 * Nidaa Rehabilitation & Addiction Recovery Centre - Lahore
 * Core Interactive Scripts: Mobile Drawer, Floating Live Chat, Video Modal, Reviews Filter, Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLiveChatWidget();
  initVideoModal();
  initReviewsFilter();
  initPodcastFilter();
  initForms();
});

/* -------------------------------------------------------------
   Navigation & Mobile Drawer
   ------------------------------------------------------------- */
function initNavigation() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Highlight active desktop and mobile nav links
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
   Floating Live Chat Widget Simulation
   ------------------------------------------------------------- */
function initLiveChatWidget() {
  const triggerBtn = document.getElementById('chat-trigger-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBadge = document.getElementById('chat-badge');

  if (!triggerBtn || !chatWindow) return;

  // Toggle Chat
  triggerBtn.addEventListener('click', () => {
    const isOpen = chatWindow.classList.contains('active');
    if (!isOpen) {
      chatWindow.classList.add('active');
      if (chatBadge) chatBadge.style.display = 'none';
      setTimeout(() => {
        if (chatInput) chatInput.focus();
      }, 200);
    } else {
      chatWindow.classList.remove('active');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  // Quick Chips Handler
  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserChatMessage(query);
    });
  });

  // Form Submit Handler
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserChatMessage(text);
    });
  }

  function handleUserChatMessage(userText) {
    appendMessage(userText, 'sent');

    // Show simulated typing and empathetic reply
    setTimeout(() => {
      let botReply = getEmpatheticBotReply(userText);
      appendMessage(botReply, 'received');
    }, 600);
  }

  function appendMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${type}`;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msgDiv.innerHTML = `${text}<span class="chat-time">${timeStr}</span>`;
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getEmpatheticBotReply(input) {
    const lower = input.toLowerCase();
    if (lower.includes('detox')) {
      return `Our medically supervised drug detox is managed 24/7 by Dr. Bilal Warraich (Medical Director) and specialized addiction doctors in Lahore. It safely relieves acute physical withdrawal symptoms in comfortable, private suites.`;
    } else if (lower.includes('charge') || lower.includes('cost') || lower.includes('fee') || lower.includes('price')) {
      return `We offer customized 30, 60, and 90-day inpatient and outpatient recovery programs. You can speak directly with our admissions coordinator at 0321 7507866 for transparent package details.`;
    } else if (lower.includes('confidential') || lower.includes('private') || lower.includes('secret')) {
      return `100% of our patient records, admissions, and consultations are protected under strict medical doctor-patient confidentiality. Your privacy is our highest priority.`;
    } else if (lower.includes('pickup') || lower.includes('emergency') || lower.includes('ambulance')) {
      return `Emergency dispatch and discrete family intervention support are available 24/7 across Lahore. Please call our direct helpline right away at 0321 7507866.`;
    } else {
      return `Thank you for reaching out. Recovery is possible, and you or your loved one do not have to fight addiction alone. Would you like to connect immediately via WhatsApp (0321 7507866) or request a callback?`;
    }
  }
}

/* -------------------------------------------------------------
   Video Modal Lightbox (Podcast & Video Page)
   ------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('vm-close-btn');
  const titleElem = document.getElementById('vm-title');
  const descElem = document.getElementById('vm-desc');
  const playerFrame = document.getElementById('vm-player-frame');

  if (!modal) return;

  window.openVideoModal = function(title, desc, videoUrl) {
    if (titleElem) titleElem.textContent = title;
    if (descElem) descElem.textContent = desc;

    if (playerFrame) {
      if (videoUrl && videoUrl.includes('youtube.com')) {
        playerFrame.innerHTML = `<iframe src="${videoUrl}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        playerFrame.innerHTML = `
          <div style="text-align:center; padding: 2rem;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3E7969" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:1rem;">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8" fill="#3E7969"></polygon>
            </svg>
            <h3 style="color:#FFFFFF; margin-bottom: 0.5rem;">${title}</h3>
            <p style="color:#D1E5DC; font-size:0.9rem; max-width: 500px; margin: 0 auto 1.5rem auto;">${desc}</p>
            <p style="color:#85B5A7; font-size:0.82rem;">Streaming directly from Nidaa Recovery Educational Network Lahore</p>
          </div>
        `;
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('active');
    if (playerFrame) playerFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* -------------------------------------------------------------
   Reviews Filter (Reviews Page)
   ------------------------------------------------------------- */
function initReviewsFilter() {
  const tabs = document.querySelectorAll('.review-filter-tab');
  const cards = document.querySelectorAll('.review-card-item');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   Podcast & Video Filter (Podcast & Video Page)
   ------------------------------------------------------------- */
function initPodcastFilter() {
  const tabs = document.querySelectorAll('.podcast-filter-tab');
  const cards = document.querySelectorAll('.video-card-item');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   Form Handling & Toast Notification
   ------------------------------------------------------------- */
function initForms() {
  // Contact & Intake Form
  const intakeForm = document.getElementById('intake-assessment-form');
  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('intake-name')?.value.trim() || 'Valued Patient';
      const phone = document.getElementById('intake-phone')?.value.trim();

      if (!phone) {
        showToast('Please provide a valid phone number for confidential callback.');
        return;
      }

      const caseId = 'LAH-RC-' + Math.floor(1000 + Math.random() * 9000);
      intakeForm.reset();
      showToast(`Intake Request Received (#${caseId}). Our clinical triage team will call you within 15 minutes!`);
    });
  }

  // Home Quick Consultation Form
  const homeQuickForm = document.getElementById('home-quick-form');
  if (homeQuickForm) {
    homeQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const caseId = 'LAH-RC-' + Math.floor(1000 + Math.random() * 9000);
      homeQuickForm.reset();
      showToast(`Admissions inquiry #${caseId} confirmed! Our care coordinator is reviewing your request.`);
    });
  }
}

/* Global Toast Notification */
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 4500);
}

// Global exposure
window.showToast = showToast;
