const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', '.data', 'cms-store.json');
let data = { posts: [], categories: [] };

if (fs.existsSync(storePath)) {
  try {
    data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  } catch (err) {
    console.error('Error reading cms-store.json:', err);
  }
}

const articleContent = `<p class="lead">Finding the best rehab centre in Lahore is not easy for any family. Addiction is often hidden for months, sometimes years, because of shame and stigma. When a loved one finally needs help, families want three things at the same time: <strong>proper medical treatment</strong>, <strong>complete privacy</strong>, and <strong>doctors they can actually trust</strong>.</p>

<p>That is exactly where <strong>NiDAA Clinic and Drug Rehabilitation Centre in Lahore</strong> has built its reputation over nearly two decades of clinical service.</p>

<h2>What Makes a Rehab Centre the Best in Lahore?</h2>
<p>Before choosing any rehab centre, families should check a few vital medical standards rather than relying solely on advertisements:</p>
<ul>
  <li><strong>Medically Supervised Detox:</strong> Does the centre offer round-the-clock medically monitored detoxification, or does it simply lock the patient away in punitive confinement? Safe withdrawal requires specialized clinical protocols.</li>
  <li><strong>Qualified Consultant Psychiatrist:</strong> Is there a licensed, experienced psychiatrist leading and supervising the treatment from intake to discharge?</li>
  <li><strong>Dual-Diagnosis Mental Health Treatment:</strong> Are co-occurring mental health conditions—such as clinical depression, anxiety disorders, and trauma—diagnosed and treated alongside substance dependency?</li>
  <li><strong>Structured 12-Month Aftercare:</strong> Is there an individualized post-discharge plan? Clinical recovery does not end on the day of discharge; lasting sobriety depends on continuous support.</li>
</ul>
<p><strong>NiDAA Clinic meets all of these rigorous standards</strong>, which is why it is consistently recognized among the top and most trusted rehabilitation centres in Lahore.</p>

<h2>About NiDAA Clinic, Lahore</h2>
<p>Established in 2008 and fully registered with the <strong>Punjab Healthcare Commission (PHC Reg. #39483)</strong>, NiDAA Clinic provides psychiatric and addiction rehabilitation care in a safe, comfortable, and healing residential environment.</p>

<div style="background-color: #F8FAFC; border-left: 4px solid #BA181E; padding: 1.25rem 1.5rem; margin: 1.75rem 0; border-radius: 0 12px 12px 0;">
  <p style="margin: 0 0 0.5rem 0; font-weight: 700; color: #0F172A;">📍 Facility Location &amp; Accreditation:</p>
  <p style="margin: 0; color: #334155;"><strong>Address:</strong> 99 Westwood Colony, Westwood Road, near Thokar Chowk, Lahore — behind Chaman Ice Cream.<br>
  <strong>PHC Registration:</strong> Punjab Healthcare Commission Reg. #39483<br>
  <strong>Helpline:</strong> +92 321 7507866 (24/7 Confidential Assistance)</p>
</div>

<p>The clinic is led by its Medical Director and Chief Psychiatrist, <strong>Dr. Bilal Warraich (MBBS, MD, DPM – Psychiatry)</strong>, who brings more than 20 years of clinical practice since 2004. Dr. Bilal is an active member of the <strong>Pakistan Psychiatric Association (PPA)</strong> and a <strong>UNODC-qualified National Master Trainer on Substance Abuse and Addiction</strong>. Under his clinical leadership, a multidisciplinary team of consultant psychiatrists, clinical psychologists, detox physicians, and 24/7 nursing staff works together collaboratively under one roof.</p>

<h2>Addiction Treatment Programs at NiDAA Clinic</h2>
<p>NiDAA Clinic provides evidence-based, medically supervised detoxification and residential rehabilitation for a full spectrum of substance use disorders:</p>
<ul>
  <li><strong>Crystal Meth (Ice):</strong> Protocolized neurochemical stabilization, vital signs monitoring, and sleep architecture restoration.</li>
  <li><strong>Heroin &amp; Opioids:</strong> Safe pharmacological taper protocols to manage acute withdrawal symptoms comfortably and safely.</li>
  <li><strong>Benzodiazepines &amp; Sedatives:</strong> Controlled, gradual tapering to prevent severe seizure risks and rebound anxiety.</li>
  <li><strong>Alcohol Dependency:</strong> Intensive medical detox to prevent delirium tremens, electrolyte imbalance, and metabolic complications.</li>
  <li><strong>Prescription Drug Dependency:</strong> Painkiller, sleep aid, and stimulant dependency cessation plans.</li>
</ul>

<p>Treatment starts with <strong>safe inpatient medical detoxification</strong>, where withdrawal symptoms are actively managed under 24/7 medical supervision and the patient's vitals are stabilized. Once acute physical withdrawal is resolved, the transformative recovery work begins through comprehensive psychotherapy:</p>
<ul>
  <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Identifying destructive automatic thoughts, core cognitive distortions, and high-risk behavioral triggers.</li>
  <li><strong>12-Step Facilitation:</strong> Time-tested structured principles of self-awareness, acceptance, and peer accountability.</li>
  <li><strong>Cognitive Relapse Prevention:</strong> Personalized emergency action plans and coping toolkits to navigate cravings and real-world triggers.</li>
</ul>

<h3>The Essential Role of Dual-Diagnosis Care</h3>
<p>A distinctive clinical strength of NiDAA Clinic is comprehensive <strong>dual-diagnosis treatment</strong>. Clinical research reveals that a large percentage of individuals struggling with addiction also have an underlying mental health condition—such as major depression, generalized anxiety disorder, bipolar disorder, PTSD, or OCD.</p>
<p>Treating only the chemical dependency while ignoring the underlying psychiatric illness is the leading cause of chronic relapse. At NiDAA Clinic, our psychiatrist-led team treats both conditions simultaneously with integrated medical and psychological therapy.</p>
<p>Most residential rehabilitation programs typically range from <strong>30 to 90 days</strong>, customized according to the patient's substance history, medical condition, and psychological recovery milestones.</p>

<h2>More Than Just Addiction Treatment: Comprehensive Mental Health Care</h2>
<p>Beyond addiction recovery, NiDAA Clinic operates as a full-service psychiatric and clinical psychology healthcare centre. Specialized outpatient and inpatient programs include:</p>
<ul>
  <li><strong>Clinical Depression &amp; Anxiety Management:</strong> Intensive Cognitive Behavioral Therapy (CBT) and evidence-guided pharmacotherapy.</li>
  <li><strong>OCD, PTSD &amp; Severe Trauma Recovery:</strong> Exposure and Response Prevention (ERP) and trauma-informed cognitive stabilization.</li>
  <li><strong>Couples &amp; Family Rehabilitation Therapy:</strong> Resolving relationship distress, communication breakdown, and marital conflicts.</li>
</ul>
<p>NiDAA Clinic maintains <strong>transparent consultation fees</strong>, ranging from <strong>Rs. 2,200 to Rs. 3,500 per session</strong> depending on the clinician, ensuring accessible and ethical mental healthcare.</p>

<h3>Family Involvement: The Foundation of Long-Term Recovery</h3>
<p>Addiction never impacts just the individual; it impacts the entire family system. Family involvement is central to NiDAA Clinic's recovery philosophy. Through structured <strong>family psychoeducation and codependency therapy</strong>, family members learn how to support recovery at home constructively rather than unknowingly enabling addiction loops.</p>

<h2>The Recovery Journey at NiDAA Clinic: 4 Simple Steps</h2>
<ol>
  <li><strong>Confidential Booking:</strong> Reach out online or speak directly with our 24/7 admissions intake team via call or WhatsApp.</li>
  <li><strong>Clinical Assessment:</strong> A detailed psychiatric and physical diagnostic evaluation with Dr. Bilal Warraich or a senior specialist.</li>
  <li><strong>Personalized Care Plan:</strong> A structured inpatient detox or outpatient therapy roadmap tailored specifically for the individual patient—never a generic copy-paste program.</li>
  <li><strong>Continuous 12-Month Aftercare:</strong> A comprehensive aftercare system featuring scheduled check-ins, follow-up psychiatric reviews, and support meetings to safeguard long-term sobriety.</li>
</ol>

<h2>Why Families in Pakistan &amp; Overseas Choose NiDAA Clinic</h2>
<p>Privacy is understandably the foremost priority for families dealing with addiction and mental illness in Pakistan. NiDAA Clinic treats patient dignity with the highest standard of ethical protection:</p>
<ul>
  <li><strong>100% Doctor-Patient Confidentiality:</strong> Discreet admissions, private entrance protocols, and fully encrypted electronic medical records.</li>
  <li><strong>Non-Judgmental Healing Atmosphere:</strong> Warm, compassionate spaces including private executive suites, modern therapy lounges, and serene recovery areas.</li>
  <li><strong>Online Video Consultations:</strong> Fully encrypted virtual consultations for patients across Karachi, Islamabad, Peshawar, Quetta, and overseas Pakistanis living in the UK, USA, Gulf, and Canada.</li>
</ul>

<h2>Final Words: Recovery Begins With One Decision</h2>
<p>Addiction is a treatable medical disease of the brain's reward system, not a moral failure or character flaw. When provided with scientific medical treatment, compassionate therapy, and a supportive aftercare community, real and lasting recovery is 100% possible.</p>
<p>If you or someone you love is struggling with substance abuse or psychiatric distress in Lahore, delaying treatment only makes recovery more difficult. With an experienced psychiatrist-led team, safe inpatient medical detox, evidence-based psychotherapy, and a dedicated 12-month aftercare framework, <strong>NiDAA Clinic stands out as a trusted choice and one of the best rehab centres in Lahore</strong>.</p>

<div style="background: linear-gradient(135deg, #BA181E 0%, #8E0E14 100%); color: #FFFFFF; padding: 2rem; border-radius: 16px; margin-top: 2.5rem; text-align: center;">
  <h3 style="color: #FFFFFF; margin-top: 0; font-size: 1.5rem;">Begin Your Confidential Recovery Today</h3>
  <p style="color: rgba(255, 255, 255, 0.95); margin-bottom: 1.5rem; font-size: 1.05rem;">Speak directly with our clinical intake team. 24/7 admissions and emergency triage are available.</p>
  <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
    <a href="tel:+923217507866" style="background-color: #FFFFFF; color: #BA181E; padding: 0.85rem 1.75rem; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">📞 Call: 0321 7507866</a>
    <a href="https://wa.me/923217507866?text=Hello%20NiDAA%20Clinic%2C%20I%20would%20like%20to%20consult%20about%20addiction%20recovery%20treatment." target="_blank" rel="noopener noreferrer" style="background-color: #25D366; color: #FFFFFF; padding: 0.85rem 1.75rem; border-radius: 9999px; font-weight: 700; text-decoration: none; display: inline-block;">💬 WhatsApp 24/7</a>
  </div>
</div>`;

const newPost = {
  _id: 'post-best-rehab-centre-lahore-trusted-choice',
  title: 'Best Rehab Centre in Lahore: Why Nidaa Clinic Is a Trusted Choice for Addiction Recovery',
  slug: 'best-rehab-centre-in-lahore-trusted-choice',
  excerpt: 'Finding the best rehab centre in Lahore requires medically supervised detox, complete confidentiality, and psychiatrist-led care. Discover why NiDAA Clinic is Lahore’s premier choice.',
  contentHTML: articleContent,
  contentText: '',
  content: [],
  coverImage: {
    url: '/assets/images/nidaa_rehab_centre_lahore.jpg',
    alt: 'Best Rehab Centre in Lahore - NiDAA Clinic Addiction Recovery & Therapy Lounge',
    caption: 'Executive therapy lounge and inpatient recovery suites at NiDAA Clinic, Lahore'
  },
  featured_image_url: '/assets/images/nidaa_rehab_centre_lahore.jpg',
  categories: ['rehabilitation-recovery', 'addiction-treatment'],
  tags: [
    'best rehab centre in lahore',
    'rehab centre in lahore',
    'addiction recovery lahore',
    'drug rehabilitation centre lahore',
    'nidaa clinic lahore',
    'dr bilal warraich',
    'medical detox lahore',
    'inpatient rehab lahore',
    'punjab healthcare commission rehab'
  ],
  author: {
    name: 'Dr. Bilal Warraich',
    role: 'Medical Director & Chief Psychiatrist (MBBS, MD, DPM – Psychiatry)',
    avatar: '/assets/images/dr_bilal_warraich.jpg',
    bio: 'Medical Director (MBBS, MD, DPM – Psychiatry). Member of Pakistan Psychiatric Association and UNODC-qualified National Master Trainer on Substance Abuse and Addiction with 20+ years of clinical practice.'
  },
  seo: {
    metaTitle: 'Best Rehab Centre in Lahore: Why Nidaa Clinic Is a Trusted Choice',
    metaDescription: 'Looking for the best rehab centre in Lahore? NiDAA Clinic offers 24/7 medically supervised detox, psychiatrist-led recovery by Dr. Bilal Warraich, dual diagnosis care, and 12-month aftercare.',
    canonicalUrl: 'https://nidaclinic.com/blog/best-rehab-centre-in-lahore-trusted-choice',
    ogImage: '/assets/images/nidaa_rehab_centre_lahore.jpg',
    ogType: 'article',
    noIndex: false,
    focusKeyword: 'best rehab centre in lahore'
  },
  status: 'published',
  publishedAt: new Date().toISOString(),
  readingTime: 6,
  wordCount: 1100,
  version: 1,
  revisions: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Check if category exists
if (!Array.isArray(data.categories)) data.categories = [];
const catExists = data.categories.some(c => c.slug === 'rehabilitation-recovery');
if (!catExists) {
  data.categories.push({
    _id: 'cat-rehab-2026',
    name: 'Rehabilitation & Recovery',
    slug: 'rehabilitation-recovery',
    description: 'Inpatient addiction recovery, detox, and relapse prevention',
    order: 1,
    postCount: 1
  });
}

// Remove old if exists with same slug, and insert new at top
if (!Array.isArray(data.posts)) data.posts = [];
data.posts = data.posts.filter(p => p.slug !== newPost.slug && p._id !== newPost._id);
data.posts.unshift(newPost);

fs.mkdirSync(path.dirname(storePath), { recursive: true });
fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Successfully published article to .data/cms-store.json');
console.log('Title:', newPost.title);
console.log('Slug: /blog/' + newPost.slug);
console.log('Featured Image:', newPost.coverImage.url);
console.log('Total articles now in store:', data.posts.length);
