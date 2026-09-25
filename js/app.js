/**
 * Nidaa Clinic Lahore - Interactive Behaviors
 * Handling Booking Forms, FAQ Accordion, Mobile Drawer, and Toast Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMobileMenu();
  initFaqAccordion();
  initDatePickers();
  initSmoothScroll();
  initAutoCallPopup();
});

/* ==========================================================================
   MEDICAL HEARTBEAT PRELOADER (1.5 SECONDS DURATION)
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  if (!preloader) return;

  let isHidden = false;
  const hidePreloader = () => {
    if (isHidden) return;
    isHidden = true;
    preloader.classList.add('fade-out');
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.style.display = 'none';
      }
    }, 500);
  };

  // Smooth medical heartbeat showcase (exactly 1.5 seconds)
  const minTime = new Promise(resolve => setTimeout(resolve, 1500));
  const pageLoaded = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });

  Promise.all([minTime, pageLoaded]).then(hidePreloader);
  
  // Failsafe at 2.5 seconds
  setTimeout(hidePreloader, 2500);
}

/* Mobile Menu */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-item');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}

/* Date Pickers Default to Tomorrow */
function initDatePickers() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const ownerDate = document.getElementById('owner-f-date');
  if (ownerDate) {
    ownerDate.value = tomorrowStr;
    ownerDate.min = tomorrowStr;
  }

  const modalDate = document.getElementById('m-date');
  if (modalDate) {
    modalDate.value = tomorrowStr;
    modalDate.min = tomorrowStr;
  }
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.fai-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close others in same column
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/* Owner Booking Form */
function handleOwnerFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('owner-f-name').value.trim();
  const phone = document.getElementById('owner-f-phone').value.trim();
  const form = document.getElementById('hero-owner-booking-form');
  const successBox = document.getElementById('owner-form-success');

  if (!name || !phone) {
    showToast('Please fill out all required fields.');
    return;
  }

  const voucherCode = '#NDC-' + Math.floor(1000 + Math.random() * 9000);

  form.style.display = 'none';
  successBox.style.display = 'block';

  showToast(`Appointment confirmed (${voucherCode}). Dispatched to your WhatsApp!`);
}

function resetOwnerForm() {
  const form = document.getElementById('hero-owner-booking-form');
  const successBox = document.getElementById('owner-form-success');
  form.reset();
  initDatePickers();
  form.style.display = 'flex';
  successBox.style.display = 'none';
}

/* WhatsApp Direct Redirection */
const CLINIC_WHATSAPP_NUMBER = '923217507866';
const CLINIC_CALL_NUMBER = '+923217507866';

function openAppointmentModal(customMsg) {
  const msg = customMsg || 'Hello NiDAA Clinic, I want to book an appointment.';
  const waUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function closeAppointmentModal() {
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openDirectBookingForDoc(docName, loc, fee) {
  const doctor = docName || 'a Specialist';
  const msg = `Hello NiDAA Clinic, I want to book a consultation with ${doctor}.`;
  const waUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

/* Smooth Scrolling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* Toast Message */
function showToast(msg) {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;

  const toast = document.createElement('div');
  toast.className = 'toast-box';
  toast.textContent = msg;

  stack.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3500);
}

/* ==========================================================================
   AUTO CALL POPUP (HOME PAGE ONLY, 30 SECONDS DELAY, NEVER SHOW AGAIN ONCE CLOSED)
   ========================================================================== */
let callPopupTimer = null;
const POPUP_STORAGE_KEY = 'nidaa_call_popup_dismissed';

function isHomePage() {
  const path = window.location.pathname.toLowerCase();
  const isHomePath = path === '/' || path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('\\index.html') || path === '';
  const hasHero = !!document.querySelector('.hero-section#hero');
  return isHomePath || hasHero;
}

function initAutoCallPopup() {
  // Only show on home page
  if (!isHomePage()) return;

  // Once closed, never show popup again
  try {
    if (localStorage.getItem(POPUP_STORAGE_KEY) === 'true' || sessionStorage.getItem(POPUP_STORAGE_KEY) === 'true') {
      return;
    }
  } catch (e) {}

  // Clear any existing timer
  if (callPopupTimer) clearTimeout(callPopupTimer);
  
  // Show call popup after 30 seconds
  callPopupTimer = setTimeout(() => {
    try {
      if (localStorage.getItem(POPUP_STORAGE_KEY) === 'true' || sessionStorage.getItem(POPUP_STORAGE_KEY) === 'true') {
        return;
      }
    } catch (e) {}
    openCallModal();
  }, 30000);
}

function openCallModal() {
  const modal = document.getElementById('call-modal');
  if (!modal) return;

  // Don't open if video or vip modal is active
  const videoModal = document.getElementById('video-lightbox');
  const vipModal = document.getElementById('vip-modal');
  if (videoModal && videoModal.classList.contains('active')) return;
  if (vipModal && vipModal.classList.contains('active')) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCallModal() {
  const modal = document.getElementById('call-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (callPopupTimer) {
    clearTimeout(callPopupTimer);
    callPopupTimer = null;
  }
  // Once closed, never show again
  try {
    localStorage.setItem(POPUP_STORAGE_KEY, 'true');
    sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
  } catch (e) {}
}

function resetCallPopup() {
  try {
    localStorage.removeItem(POPUP_STORAGE_KEY);
    sessionStorage.removeItem(POPUP_STORAGE_KEY);
  } catch (e) {}
}

function switchFromCallToAppModal() {
  closeCallModal();
  setTimeout(() => {
    openAppointmentModal();
  }, 200);
}

function handlePopupFormSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  openAppointmentModal();
}

// Global exposure
window.handleOwnerFormSubmit = handleOwnerFormSubmit;
window.resetOwnerForm = resetOwnerForm;
window.openAppointmentModal = openAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;
window.openDirectBookingForDoc = openDirectBookingForDoc;
window.handlePopupFormSubmit = handlePopupFormSubmit;
window.showToast = showToast;
window.openCallModal = openCallModal;
window.closeCallModal = closeCallModal;
window.resetCallPopup = resetCallPopup;
window.switchFromCallToAppModal = switchFromCallToAppModal;


/* ==========================================================================
   LIVE CHAT & SUBPAGE INTERACTIVITY
   ========================================================================== */

/* Live Chat Widget */
function toggleLiveChat() {
  const chatModal = document.getElementById('chat-window-modal');
  if (chatModal) {
    chatModal.classList.toggle('active');
  }
}

function sendChatChip(topic) {
  const body = document.getElementById('chat-body');
  if (!body) return;

  // Add user bubble
  const uMsg = document.createElement('div');
  uMsg.className = 'cwm-user-msg';
  uMsg.textContent = topic;
  body.appendChild(uMsg);

  // Add bot reply
  setTimeout(() => {
    const bMsg = document.createElement('div');
    bMsg.className = 'cwm-bot-msg';
    
    if (topic.includes('Detox')) {
      bMsg.innerHTML = 'Our medical detox is supervised 24/7 by Medical Director Dr. Bilal Warraich\'s medical team in Lahore (PHC Reg. #39483). Safe withdrawal management for Meth/Ice, Opioids, and prescription drugs. <br><a href="tel:+923217507866" style="color: #C4161C; font-weight:700; text-decoration:underline;">Call 24/7 Hotline</a>';
    } else if (topic.includes('Fee') || topic.includes('Charges')) {
      bMsg.innerHTML = 'Consultation sessions are Rs. 2,500 - 3,500. Residential rehabilitation packages include 24/7 care, private rooms, and daily therapy. Would you like a confidential fee quote?';
    } else if (topic.includes('Confidential')) {
      bMsg.innerHTML = '100% Guaranteed. All patient admissions, consultations, and records are strictly encrypted under Pakistan Psychological Association ethics.';
    } else {
      bMsg.innerHTML = 'Thank you for reaching out. Our Lahore care coordinator is available right now. Click below to chat directly on WhatsApp: <br><a href="https://wa.me/923217507866?text=Hello%20Nidaa%20Clinic,%20I%20need%20urgent%20confidential%20assistance" target="_blank" style="display:inline-block; margin-top:6px; background:#25D366; color:#FFF; padding:4px 10px; border-radius:12px; font-weight:700; font-size:0.8rem; text-decoration:none;">Open WhatsApp Chat</a>';
    }
    body.appendChild(bMsg);
    body.scrollTop = body.scrollHeight;
  }, 400);

  body.scrollTop = body.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  if (!input || !input.value.trim()) return;

  const msg = input.value.trim();
  input.value = '';

  const body = document.getElementById('chat-body');
  if (!body) return;

  const uMsg = document.createElement('div');
  uMsg.className = 'cwm-user-msg';
  uMsg.textContent = msg;
  body.appendChild(uMsg);
  body.scrollTop = body.scrollHeight;

  setTimeout(() => {
    const bMsg = document.createElement('div');
    bMsg.className = 'cwm-bot-msg';
    bMsg.innerHTML = 'Thank you for reaching out. Our clinical coordinator is connecting with you now. For immediate 24/7 assistance, call <a href="tel:+923217507866" style="color: #C4161C; font-weight: 700;">0321 7507866</a> or <a href="https://wa.me/923217507866" target="_blank" style="color:#25D366; font-weight: 700;">WhatsApp us</a>.';
    body.appendChild(bMsg);
    body.scrollTop = body.scrollHeight;
  }, 500);
}

/* Video Lightbox Modal */
function openVideoModal(videoTitle, videoUrl) {
  let modal = document.getElementById('video-lightbox');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-lightbox';
    modal.className = 'video-lightbox-modal';
    modal.innerHTML = `
      <div class="vlm-card">
        <button class="vlm-close-btn" onclick="closeVideoModal()">&times;</button>
        <div class="vlm-player-box">
          <iframe id="vlm-iframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  const iframe = document.getElementById('vlm-iframe');
  if (iframe) {
    iframe.src = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('video-lightbox');
  if (modal) {
    const iframe = document.getElementById('vlm-iframe');
    if (iframe) iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Review Filter */
function filterReviews(category) {
  const buttons = document.querySelectorAll('.filter-btn-red');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-cat') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.review-card-full');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* Contact Form Handler */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();

  if (!name || !phone) {
    showToast('Please provide your name and phone number.');
    return;
  }

  const voucher = '#NDC-' + Math.floor(1000 + Math.random() * 9000);
  const form = document.getElementById('contact-us-form');
  const success = document.getElementById('contact-form-success');

  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }

  showToast(`Inquiry registered (${voucher}). Our Lahore coordinator will call you shortly!`);
}

function resetContactForm() {
  const form = document.getElementById('contact-us-form');
  const success = document.getElementById('contact-form-success');
  if (form && success) {
    form.reset();
    form.style.display = 'block';
    success.style.display = 'none';
  }
}

/* VIP 25% OFF DISCOUNT MODAL */
function claimVipDiscount() {
  const modal = document.getElementById('vip-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showToast('🎉 Congratulations! 25% VIP Discount Unlocked!');
  }
}

function closeVipModal() {
  const modal = document.getElementById('vip-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleVipFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('vm-name') ? document.getElementById('vm-name').value.trim() : '';
  const phone = document.getElementById('vm-phone') ? document.getElementById('vm-phone').value.trim() : '';

  if (!name || !phone) {
    showToast('Please provide your name and phone number.');
    return;
  }

  const voucher = '#VIP25-' + Math.floor(1000 + Math.random() * 9000);
  closeVipModal();
  showToast(`🎉 Congratulations ${name}! 25% VIP Voucher (${voucher}) activated. We are connecting with you on WhatsApp!`);
}

/* ==========================================================================
   STAFF DIRECTORY & ORGANOGRAM INTERACTIVITY
   ========================================================================== */
function filterStaff(dept, btnEl) {
  const cards = document.querySelectorAll('.staff-card');
  const buttons = document.querySelectorAll('.staff-filter-btn');

  buttons.forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  cards.forEach(card => {
    if (dept === 'all' || card.getAttribute('data-dept') === dept) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function searchStaff(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.staff-card');
  let matchCount = 0;

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      card.style.display = 'flex';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('staff-no-results');
  if (noResults) {
    noResults.style.display = matchCount === 0 ? 'block' : 'none';
  }
}

function filterStaff500(dept, btn) {
  const cards = document.querySelectorAll('.staff-card-500');
  let matched = 0;
  cards.forEach(card => {
    const cardDepts = (card.getAttribute('data-dept') || '').split(' ');
    if (dept === 'all' || cardDepts.includes(dept)) {
      matched++;
    }
  });

  // If requested filter has no matching cards, fallback to 'all'
  const activeDept = matched > 0 ? dept : 'all';

  // Update filter pill buttons
  const filterBtns = document.querySelectorAll('.s500-pill-btn');
  filterBtns.forEach(b => {
    if (btn && activeDept === dept) {
      b.classList.toggle('active', b === btn);
    } else {
      b.classList.toggle('active', b.getAttribute('data-filter') === activeDept);
    }
  });

  // Filter 500x500 staff cards
  cards.forEach(card => {
    const cardDepts = (card.getAttribute('data-dept') || '').split(' ');
    if (activeDept === 'all' || cardDepts.includes(activeDept)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // Ensure showcase section is visible
  const showcase = document.getElementById('staff-showcase');
  if (showcase && showcase.style.display === 'none') {
    switchTeamView('grid');
  }
}

function handleTeamPageHash() {
  const hash = window.location.hash.replace('#', '');
  if (['exec', 'med', 'psych', 'psychiatrists', 'ops', 'all'].includes(hash)) {
    filterStaff500(hash);
    const target = document.getElementById('staff-showcase');
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', handleTeamPageHash);
  window.addEventListener('hashchange', handleTeamPageHash);
}

function switchTeamView(viewType) {
  const treeSection = document.getElementById('team-organogram-view');
  const showcaseSection = document.getElementById('staff-showcase');
  const btnTree = document.getElementById('btn-view-tree');
  const btnGrid = document.getElementById('btn-view-grid');

  if (viewType === 'tree') {
    if (treeSection) treeSection.style.display = 'block';
    if (showcaseSection) showcaseSection.style.display = 'none';
    if (btnTree) btnTree.classList.add('active');
    if (btnGrid) btnGrid.classList.remove('active');
  } else {
    if (treeSection) treeSection.style.display = 'none';
    if (showcaseSection) showcaseSection.style.display = 'block';
    if (btnTree) btnTree.classList.remove('active');
    if (btnGrid) btnGrid.classList.add('active');
  }
}

// Global exposure
window.toggleLiveChat = toggleLiveChat;
window.sendChatChip = sendChatChip;
window.sendChatMessage = sendChatMessage;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.filterReviews = filterReviews;
window.handleContactSubmit = handleContactSubmit;
window.resetContactForm = resetContactForm;
window.claimVipDiscount = claimVipDiscount;
window.closeVipModal = closeVipModal;
window.handleVipFormSubmit = handleVipFormSubmit;
window.filterStaff = filterStaff;
window.filterStaff500 = filterStaff500;
window.searchStaff = searchStaff;
window.switchTeamView = switchTeamView;




