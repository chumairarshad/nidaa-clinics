const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetPattern = /<div class="blog-grid-4">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/;

const replacementBlock = `<div class="blog-grid-4">

          <!-- Blog Card 1: Best Drug Rehabilitation Centre -->
          <article class="blog-card">
            <div class="blog-thumb-wrap">
              <img src="assets/images/service_rehab.jpg" alt="Best Drug Rehabilitation Centre in Lahore" class="blog-thumb-img"
                loading="lazy">
              <span class="blog-category-badge">🏥 Inpatient Rehab</span>
            </div>
            <div class="blog-body">
              <div class="blog-meta-row">
                <span>By Dr. Bilal Warraich</span>
                <span>⏱️ 12 min read</span>
              </div>
              <h3 class="blog-card-title"><a href="/blog/best-drug-rehabilitation-centre-in-lahore" style="color:inherit;text-decoration:none;">Best Drug Rehabilitation Centre in Lahore: Evidence-Based Care</a></h3>
              <p class="blog-card-excerpt">
                Inpatient addiction recovery, medical detox, CBT therapy, and relapse prevention at Westwood Colony Thokar Niaz Baig Lahore.
              </p>
              <div class="blog-card-footer">
                <span class="blog-author-info">Medical Director</span>
                <a href="/blog/best-drug-rehabilitation-centre-in-lahore" class="blog-read-link">
                  <span>Read Guide</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Blog Card 2: Alcohol Addiction Treatment -->
          <article class="blog-card">
            <div class="blog-thumb-wrap">
              <img src="assets/images/service_counseling.jpg" alt="Alcohol Rehab Centre Lahore" class="blog-thumb-img"
                loading="lazy">
              <span class="blog-category-badge" style="background: rgba(220, 38, 38, 0.88);">🍷 Alcohol Detox</span>
            </div>
            <div class="blog-body">
              <div class="blog-meta-row">
                <span>By Dr. Bilal Warraich</span>
                <span>⏱️ 11 min read</span>
              </div>
              <h3 class="blog-card-title"><a href="/blog/alcohol-addiction-treatment-rehabilitation-in-lahore" style="color:inherit;text-decoration:none;">Alcohol Addiction Treatment &amp; Rehabilitation in Lahore</a></h3>
              <p class="blog-card-excerpt">
                Safe clinical protocols for Delirium Tremens, CIWA-Ar withdrawal management, liver restoration, and long-term sobriety.
              </p>
              <div class="blog-card-footer">
                <span class="blog-author-info">Medical Director</span>
                <a href="/blog/alcohol-addiction-treatment-rehabilitation-in-lahore" class="blog-read-link">
                  <span>Read Guide</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Blog Card 3: Ice Drug Addiction Treatment -->
          <article class="blog-card">
            <div class="blog-thumb-wrap">
              <img src="assets/images/service_psychiatric.jpg" alt="Ice Drug Addiction Treatment in Lahore" class="blog-thumb-img"
                loading="lazy">
              <span class="blog-category-badge" style="background: rgba(124, 58, 237, 0.88);">⚡ Crystal Meth Detox</span>
            </div>
            <div class="blog-body">
              <div class="blog-meta-row">
                <span>By Dr. Bilal Warraich</span>
                <span>⏱️ 13 min read</span>
              </div>
              <h3 class="blog-card-title"><a href="/blog/ice-drug-addiction-treatment-in-lahore" style="color:inherit;text-decoration:none;">Ice Drug Addiction Treatment: Crystal Meth Detox &amp; Recovery</a></h3>
              <p class="blog-card-excerpt">
                Treating meth-induced psychosis, dopamine depletion, paranoia, and psychological dependence with UNODC standards.
              </p>
              <div class="blog-card-footer">
                <span class="blog-author-info">Medical Director</span>
                <a href="/blog/ice-drug-addiction-treatment-in-lahore" class="blog-read-link">
                  <span>Read Guide</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </article>

          <!-- Blog Card 4: Heroin Addiction Treatment -->
          <article class="blog-card">
            <div class="blog-thumb-wrap">
              <img src="assets/images/rehabilitation_session.jpg" alt="Heroin Addiction Treatment in Lahore"
                class="blog-thumb-img" loading="lazy">
              <span class="blog-category-badge" style="background: rgba(13, 148, 136, 0.88);">🌿 Heroin Detox</span>
            </div>
            <div class="blog-body">
              <div class="blog-meta-row">
                <span>By Dr. Bilal Warraich</span>
                <span>⏱️ 11 min read</span>
              </div>
              <h3 class="blog-card-title"><a href="/blog/heroin-addiction-treatment-and-drug-detox-in-lahore" style="color:inherit;text-decoration:none;">Heroin Addiction Treatment &amp; Drug Detox in Lahore</a></h3>
              <p class="blog-card-excerpt">
                Pain-managed opioid withdrawal, non-judgmental inpatient recovery, medical stabilization, and relapse prevention.
              </p>
              <div class="blog-card-footer">
                <span class="blog-author-info">Medical Director</span>
                <a href="/blog/heroin-addiction-treatment-and-drug-detox-in-lahore" class="blog-read-link">
                  <span>Read Guide</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </article>

        </div>

        <!-- Directory of All 10 Published Articles -->
        <div style="margin-top: 2.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; gap: 1rem;">
            <div>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #0284C7; background: #E0F2FE; padding: 0.25rem 0.75rem; border-radius: 999px; margin-bottom: 0.5rem;">Clinical Knowledge Base</span>
              <h3 style="font-size: 1.35rem; font-weight: 700; color: #0F172A; margin: 0;">Explore Our 10 Dedicated Addiction &amp; Mental Health Guides</h3>
            </div>
            <a href="/blog" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #0284C7; color: #ffffff; padding: 0.7rem 1.4rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.95rem; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.35);">
              <span>Visit NiDAA Medical Journal</span>
              <span>→</span>
            </a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.85rem;">
            <a href="/blog/best-drug-rehabilitation-centre-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🏥</span>
              <span>Best Drug Rehab Centre</span>
            </a>
            <a href="/blog/alcohol-addiction-treatment-rehabilitation-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🍷</span>
              <span>Alcohol Rehab Centre Lahore</span>
            </a>
            <a href="/blog/ice-drug-addiction-treatment-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">⚡</span>
              <span>Ice Drug Addiction Treatment</span>
            </a>
            <a href="/blog/heroin-addiction-treatment-and-drug-detox-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🌿</span>
              <span>Heroin Addiction Treatment</span>
            </a>
            <a href="/blog/psychiatrist-in-lahore-mental-health-treatment" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🧠</span>
              <span>Psychiatrist in Lahore</span>
            </a>
            <a href="/blog/drug-addiction-symptoms-warning-signs-in-adults" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🔍</span>
              <span>Drug Addiction Symptoms</span>
            </a>
            <a href="/blog/drug-rehabilitation-centre-cost-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">💰</span>
              <span>Rehab Centre Cost in Lahore</span>
            </a>
            <a href="/blog/drug-detoxification-treatment-withdrawal-management-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🩺</span>
              <span>Drug Detox Treatment Lahore</span>
            </a>
            <a href="/blog/how-to-get-someone-admitted-to-drug-rehabilitation-centre-in-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">🤝</span>
              <span>Rehab Admission Guide</span>
            </a>
            <a href="/blog/dual-diagnosis-treatment-addiction-mental-health-lahore" style="display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 8px; text-decoration: none; color: #1E293B; font-weight: 600; font-size: 0.9rem;">
              <span style="font-size: 1.1rem;">⚖️</span>
              <span>Dual Diagnosis Treatment</span>
            </a>
          </div>
        </div>$1`;

if (targetPattern.test(html)) {
  html = html.replace(targetPattern, replacementBlock);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully updated blog section in index.html!');
} else {
  console.error('Target pattern not found in index.html');
}
