/**
 * Nidaa Clinic Lahore - 6-Step Appointment Booking Modal Wizard
 * Flow: 1. Doctor -> 2. Type -> 3. Date -> 4. Time -> 5. Details -> 6. Confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingWizardModal();
});

function initBookingWizardModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-trigger');
  const finishBtn = document.getElementById('btn-finish-wizard');

  // Trigger elements
  const navBookBtn = document.getElementById('btn-nav-book');
  const heroBookBtn = document.getElementById('btn-hero-book');
  const actaConsultBtn = document.getElementById('btn-acta-consult');
  const stickyBookBtn = document.getElementById('btn-sticky-book');

  // Step Nodes & Panes
  const stepNodes = [
    document.getElementById('s-node-1'),
    document.getElementById('s-node-2'),
    document.getElementById('s-node-3'),
    document.getElementById('s-node-4'),
    document.getElementById('s-node-5'),
    document.getElementById('s-node-6')
  ];

  const panes = [
    document.getElementById('wizard-pane-1'),
    document.getElementById('wizard-pane-2'),
    document.getElementById('wizard-pane-3'),
    document.getElementById('wizard-pane-4'),
    document.getElementById('wizard-pane-5'),
    document.getElementById('wizard-pane-6')
  ];

  // Navigation buttons
  const btnToStep2 = document.getElementById('btn-wiz-to-step-2');
  const btnToStep3 = document.getElementById('btn-wiz-to-step-3');
  const btnToStep4 = document.getElementById('btn-wiz-to-step-4');
  const btnToStep5 = document.getElementById('btn-wiz-to-step-5');

  const btnBack1 = document.getElementById('btn-wiz-back-1');
  const btnBack2 = document.getElementById('btn-wiz-back-2');
  const btnBack3 = document.getElementById('btn-wiz-back-3');
  const btnBack4 = document.getElementById('btn-wiz-back-4');

  // Form elements
  const docSelect = document.getElementById('wiz-select-doctor');
  const typeCards = document.querySelectorAll('.type-radio-card');
  const dateInput = document.getElementById('wiz-date-input');
  const slotPills = document.querySelectorAll('.slot-pill');
  const patientForm = document.getElementById('wiz-patient-form');

  // Recap & Voucher fields
  const sumDoc = document.getElementById('wiz-sum-doc');
  const sumType = document.getElementById('wiz-sum-type');
  const sumTime = document.getElementById('wiz-sum-time');
  const sumFee = document.getElementById('wiz-sum-fee');

  const vCode = document.getElementById('wiz-voucher-code');
  const vDoc = document.getElementById('wiz-v-doc');
  const vDateTime = document.getElementById('wiz-v-datetime');
  const vType = document.getElementById('wiz-v-type');

  // State object
  let bookingState = {
    doctorName: 'Dr. Bilal Warraich',
    location: 'NiDAA Clinic (Westwood 99 Thokar, Lahore)',
    fee: 'Rs. 3,500',
    type: 'In-Clinic',
    date: '',
    timeSlot: '04:30 PM',
    patientName: '',
    patientPhone: '',
    patientArea: 'Thokar / Westwood',
    patientConcern: 'Psychiatric Evaluation & Addiction Care'
  };

  // Set default date to tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  if (dateInput) {
    dateInput.value = tomorrowStr;
    dateInput.min = today.toISOString().split('T')[0];
    bookingState.date = tomorrowStr;
  }

  function setStep(stepNum) {
    // 1-indexed
    panes.forEach((p, idx) => {
      if (p) p.classList.toggle('active', idx + 1 === stepNum);
    });

    stepNodes.forEach((node, idx) => {
      if (node) node.classList.toggle('active', idx + 1 <= stepNum);
    });

    if (stepNum === 5) {
      updateSummaryRecap();
    }
  }

  function updateSummaryRecap() {
    if (sumDoc) sumDoc.textContent = bookingState.doctorName;
    if (sumType) {
      sumType.textContent = bookingState.type === 'In-Clinic'
        ? `In-Clinic (${bookingState.location})`
        : 'Online HD Video Session';
    }
    if (sumTime) sumTime.textContent = `${bookingState.date}, ${bookingState.timeSlot}`;
    if (sumFee) sumFee.textContent = bookingState.fee;
  }

  function openModal() {
    if (modal) {
      setStep(1);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.openDirectBooking = function(docName, loc, fee) {
    if (docName) {
      bookingState.doctorName = docName;
      bookingState.location = loc || 'Nidaa Clinic Gulberg III';
      bookingState.fee = fee || 'Rs. 3,500';

      if (docSelect) {
        for (let i = 0; i < docSelect.options.length; i++) {
          if (docSelect.options[i].text.includes(docName)) {
            docSelect.selectedIndex = i;
            break;
          }
        }
      }
      openModal();
      setStep(3); // Jump right to date selection for fast UX
    } else {
      openModal();
    }
  };

  window.openDoctorProfile = function(name, qual, loc, fee) {
    window.openDirectBooking(name, loc, fee);
  };

  // Button triggers
  if (navBookBtn) navBookBtn.addEventListener('click', () => openModal());
  if (heroBookBtn) heroBookBtn.addEventListener('click', () => openModal());
  if (actaConsultBtn) actaConsultBtn.addEventListener('click', () => openModal());
  if (stickyBookBtn) stickyBookBtn.addEventListener('click', () => openModal());

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (finishBtn) finishBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Step 1: Doctor select
  if (docSelect) {
    docSelect.addEventListener('change', () => {
      const parts = docSelect.value.split('|');
      if (parts.length >= 3) {
        bookingState.doctorName = parts[0];
        bookingState.location = parts[1];
        bookingState.fee = parts[2];
      }
    });
  }

  // Step 2: Type selection
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        bookingState.type = radio.value;
      }
    });
  });

  // Step 3: Date selection
  if (dateInput) {
    dateInput.addEventListener('change', () => {
      bookingState.date = dateInput.value;
    });
  }

  // Step 4: Time slot selection
  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      bookingState.timeSlot = pill.getAttribute('data-time');
    });
  });

  // Stepper forward transitions
  if (btnToStep2) btnToStep2.addEventListener('click', () => setStep(2));
  if (btnToStep3) btnToStep3.addEventListener('click', () => setStep(3));
  if (btnToStep4) btnToStep4.addEventListener('click', () => setStep(4));
  if (btnToStep5) btnToStep5.addEventListener('click', () => setStep(5));

  // Stepper backward transitions
  if (btnBack1) btnBack1.addEventListener('click', () => setStep(1));
  if (btnBack2) btnBack2.addEventListener('click', () => setStep(2));
  if (btnBack3) btnBack3.addEventListener('click', () => setStep(3));
  if (btnBack4) btnBack4.addEventListener('click', () => setStep(4));

  // Step 5: Final Submission -> Step 6: Confirmation
  if (patientForm) {
    patientForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('wiz-p-name');
      const phoneEl = document.getElementById('wiz-p-phone');
      const areaEl = document.getElementById('wiz-p-area');
      const concernEl = document.getElementById('wiz-p-concern');

      bookingState.patientName = nameEl ? nameEl.value.trim() : '';
      bookingState.patientPhone = phoneEl ? phoneEl.value.trim() : '';
      bookingState.patientArea = areaEl ? areaEl.value : '';
      bookingState.patientConcern = concernEl ? concernEl.value : '';

      if (!bookingState.patientName || !bookingState.patientPhone) {
        alert('Please provide your name and phone number.');
        return;
      }

      // Generate Voucher
      const voucherNum = '#NDC-' + Math.floor(1000 + Math.random() * 9000);
      if (vCode) vCode.textContent = voucherNum;
      if (vDoc) vDoc.textContent = bookingState.doctorName;
      if (vDateTime) vDateTime.textContent = `${bookingState.date}, ${bookingState.timeSlot}`;
      if (vType) {
        vType.textContent = bookingState.type === 'In-Clinic'
          ? `In-Clinic Consultation (${bookingState.location})`
          : 'Online Encrypted Video Consultation';
      }

      setStep(6);
      if (window.showToast) {
        window.showToast(`Your appointment request has been received. Voucher ${voucherNum}`);
      }
    });
  }
}
