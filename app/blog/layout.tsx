import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Medical Journal & Clinical Blog | NiDAA Clinic Lahore',
  description:
    'Evidence-based psychiatric care, addiction detoxification, CBT therapy, and mental health clinical insights from Dr. Bilal Warraich (Medical Director) and NiDAA Clinic Lahore specialists.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Stylesheets matching the main NiDAA Clinic website */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/css/style.css" />
      <link rel="stylesheet" href="/css/responsive.css" />

      {/* TOP SUB-HEADER / VIP 25% OFF ANNOUNCEMENT BAR */}
      <div className="top-sub-header" id="top-sub-header">
        <div className="container tsh-inner">
          <div className="tsh-left">
            <span className="tsh-badge">👑 VIP SERVICE</span>
            <span className="tsh-text">
              Exclusive Offer: Get <strong className="tsh-highlight">25% OFF</strong> on VIP Psychiatric &amp; Psychological Consultations with Dr. Bilal Warraich (Medical Director)!
            </span>
          </div>
          <div className="tsh-right">
            <span className="tsh-code">Use Code: <strong>VIP25</strong></span>
            <a
              href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20want%20to%20claim%20my%2025%25%20VIP%20Discount%20(Code:%20VIP25)%20for%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="tsh-btn"
            >
              Claim 25% OFF →
            </a>
          </div>
        </div>
      </div>

      {/* SITE HEADER (EXACT DEFAULT MAIN MENU) */}
      <header className="site-header" id="header">
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="/" className="brand-logo" aria-label="NiDAA Clinic Lahore Home">
            <img src="/assets/images/logo.png" alt="NiDAA Clinic Lahore" className="header-logo-img" />
          </a>

          {/* Desktop Navigation Menu (Default Site Menu) */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links-list">
              <li><a href="/" className="nav-item">Home</a></li>
              <li><a href="/what-we-do.html" className="nav-item">What We Do</a></li>
              <li><a href="/our-team.html" className="nav-item">Our Team</a></li>
              <li><a href="/blog" className="nav-item active">Blog</a></li>
              <li><a href="/awards-certificates.html" className="nav-item">Awards &amp; Certificates</a></li>
              <li><a href="/podcast-video.html" className="nav-item">Podcast &amp; Video</a></li>
              <li><a href="/reviews.html" className="nav-item">Reviews</a></li>
              <li><a href="/contact-us.html" className="nav-item">Contact Us</a></li>
            </ul>
          </nav>

          {/* Action Button & Emergency Line */}
          <div className="header-action-col">
            <a href="tel:+923217507866" className="header-phone-link">
              <span style={{ color: 'var(--color-primary-red, #BA181E)', fontSize: '1.1rem' }}>📞</span>
              <span className="d-none-sm">0321 7507866</span>
            </a>
            <a
              href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red-pill btn-sm"
            >
              Book Appointment
            </a>
            <button
              className="mobile-menu-btn"
              id="mobile-menu-btn"
              aria-label="Toggle Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className="mobile-drawer" id="mobile-drawer">
          <ul className="mobile-nav-menu">
            <li><a href="/" className="mobile-item">Home</a></li>
            <li><a href="/what-we-do.html" className="mobile-item">What We Do</a></li>
            <li><a href="/our-team.html" className="mobile-item">Our Team</a></li>
            <li><a href="/blog" className="mobile-item" style={{ color: 'var(--color-primary-red, #BA181E)', fontWeight: 700 }}>Blog</a></li>
            <li><a href="/awards-certificates.html" className="mobile-item">Awards &amp; Certificates</a></li>
            <li><a href="/podcast-video.html" className="mobile-item">Podcast &amp; Video</a></li>
            <li><a href="/reviews.html" className="mobile-item">Reviews</a></li>
            <li><a href="/contact-us.html" className="mobile-item">Contact Us</a></li>
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <a href="tel:+923217507866" className="btn btn-red-outline btn-block">Call 24/7 Helpline</a>
            <a
              href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20want%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red-pill btn-block text-center"
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Book Online Consultation
            </a>
          </div>
        </div>
      </header>

      {/* MAIN ARTICLE / BLOG CONTENT */}
      <main style={{ minHeight: '60vh', backgroundColor: '#FAFAFC' }}>
        {children}
      </main>

      {/* PRE-FOOTER TRUST STRIP */}
      <section className="pre-footer-trust-strip">
        <div className="container pfts-grid">
          <div className="pfts-item">
            <div className="pfts-icon">🩺</div>
            <div className="pfts-text">
              <strong>Certified Specialists</strong>
              <p>Experienced &amp; verified clinical specialists.</p>
            </div>
          </div>
          <div className="pfts-item">
            <div className="pfts-icon">🔒</div>
            <div className="pfts-text">
              <strong>Privacy First</strong>
              <p>100% confidential consultations.</p>
            </div>
          </div>
          <div className="pfts-item">
            <div className="pfts-icon">📈</div>
            <div className="pfts-text">
              <strong>Proven Results</strong>
              <p>Personalized guidance to lasting wellness.</p>
            </div>
          </div>
          <div className="pfts-item">
            <div className="pfts-icon">⚡</div>
            <div className="pfts-text">
              <strong>Easy Appointments</strong>
              <p>Book online in just 60 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RED FOOTER (MATCHES MAIN SITE EXACTLY) */}
      <footer className="red-site-footer">
        <div className="container">
          <div className="rf-grid">
            {/* Col 1: Logo & Bio */}
            <div className="rf-col rf-col-brand">
              <a href="/" className="rf-logo-box" aria-label="NiDAA Clinic Lahore Home">
                <img src="/assets/images/logo.png" alt="NiDAA Clinic Lahore" className="footer-logo-img" />
              </a>
              <p className="rf-bio-text">
                Lahore's premier psychiatric and addiction rehabilitation centre (PHC Reg. #39483) at 99 Westwood Thokar, led by Medical Director Dr. Bilal Warraich (UNODC American Qualified). Confidential, evidence-based clinical care.
              </p>
              <div className="rf-socials">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Twitter">TW</a>
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="YouTube">YT</a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="rf-col">
              <h4 className="rf-col-title">Quick Links</h4>
              <ul className="rf-links">
                <li><a href="/">Home</a></li>
                <li><a href="/what-we-do.html">What We Do</a></li>
                <li><a href="/our-team.html">Our Team</a></li>
                <li><a href="/awards-certificates.html">Awards &amp; Certificates</a></li>
                <li><a href="/podcast-video.html">Podcast &amp; Video</a></li>
                <li><a href="/reviews.html">Reviews</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact-us.html">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3: Programs */}
            <div className="rf-col">
              <h4 className="rf-col-title">Programs</h4>
              <ul className="rf-links">
                <li><a href="/what-we-do.html">Substance Detox</a></li>
                <li><a href="/what-we-do.html">Inpatient Rehabilitation</a></li>
                <li><a href="/what-we-do.html">CBT Psychotherapy</a></li>
                <li><a href="/what-we-do.html">Dual Diagnosis Care</a></li>
                <li><a href="/what-we-do.html">Relapse Prevention</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div className="rf-col">
              <h4 className="rf-col-title">Contact Us</h4>
              <div className="rf-contact-lines">
                <p>📞 0321 7507866</p>
                <p>✉️ info@nidaaclinic.pk</p>
                <p>📍 99 Westwood Colony, Thokar Niaz Baig, Lahore (PHC Reg. #39483)</p>
              </div>
            </div>

            {/* Col 5: Book Consultation Card */}
            <div className="rf-col rf-col-book">
              <h4 className="rf-col-title">Direct Consultation</h4>
              <div className="rf-mini-doc-card">
                <img src="/assets/images/dr_bilal_warraich.jpg" alt="Dr. Bilal Warraich" className="rf-mini-doc-img" />
                <div className="rf-mini-doc-info">
                  <span>Consult Dr. Bilal Warraich (Medical Director)</span>
                  <a
                    href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20would%20like%20to%20consult%20Dr.%20Bilal%20Warraich."
                    className="btn btn-red-pill btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="rf-bottom-bar text-center">
            <p>© {new Date().getFullYear()} NiDAA Clinic (National Institute on Drug Abuse and Addiction) Lahore • PHC Reg. #39483. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING STICKY SCROLL ACTION BAR */}
      <div className="floating-scroll-bar" id="floating-scroll-bar">
        <a
          href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20want%20to%20book%20an%20appointment."
          className="fsb-btn fsb-btn-book"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book Appointment"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Book Appointment</span>
        </a>
        <a
          href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic,%20I%20want%20to%20inquire%20about%20booking%20a%20consultation%20with%20Dr.%20Bilal%20Warraich."
          className="fsb-btn fsb-btn-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              var btn = document.getElementById('mobile-menu-btn');
              var drawer = document.getElementById('mobile-drawer');
              if (btn && drawer) {
                btn.addEventListener('click', function() {
                  drawer.classList.toggle('active');
                });
              }
            });
          `,
        }}
      />
    </>
  );
}
