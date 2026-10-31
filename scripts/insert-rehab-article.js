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

const articleContent = `<p class="lead">Navigating substance use disorders and severe psychiatric crises requires far more than isolation or temporary restraint; it demands scientifically validated medical intervention, psychiatric diagnostic precision, and compassionate psychological rehabilitation. At <strong>NiDAA Clinic</strong> (National Institute on Drug Abuse and Addiction), under the medical direction of <strong>Dr. Bilal Warraich (MBBS, FCPS Psychiatry, UNODC American Qualified)</strong>, we have established Lahore's premier inpatient treatment sanctuary dedicated to restoring dignity, mental clarity, and lasting recovery.</p>

<h2>Why Choosing the Right Rehabilitation Centre in Lahore Matters</h2>
<p>Substance dependency—whether involving ice (crystal methamphetamine), heroin, opioids, alcohol, prescription benzodiazepines, or cannabis—is recognized by modern medicine as a chronic, relapsing disorder of the brain's reward circuitry. Unfortunately, many unlicensed recovery centers in Pakistan continue to employ outdated, punitive, or psychologically damaging methods that exacerbate patient trauma.</p>
<p>At NiDAA Clinic, our clinical philosophy is rooted in evidence-based medicine and human empathy. Patients are not treated as moral failures; they are respected as medical patients battling a treatable neurological and behavioral condition. Our center on Canal Road, Westwood Colony, Lahore, combines international standards of medical safety with tranquil residential comfort.</p>

<h2>The 4 Clinical Pillars of Inpatient Recovery at NiDAA Clinic</h2>

<h3>1. Medically Monitored Inpatient Detoxification (24/7 Safety)</h3>
<p>Abruptly stopping substances without medical supervision can trigger life-threatening withdrawal complications, including delirium tremens, severe cardiac arrhythmias, grand mal seizures, and profound psychological distress. Our inpatient detox unit features continuous medical monitoring by specialized physicians and psychiatric nurses.</p>
<ul>
  <li><strong>Pharmacological Comfort Protocols:</strong> Individualized taper regimens and non-addictive stabilization medications to eliminate acute withdrawal agony.</li>
  <li><strong>Continuous Vital Signs Tracking:</strong> Round-the-clock cardiac, hemodynamic, and neurological assessments.</li>
  <li><strong>Nutritional & Electrolyte Rebalancing:</strong> Medical-grade IV vitamin therapy to reverse chronic nutritional depletion caused by chemical dependency.</li>
</ul>

<h3>2. Dual-Diagnosis Psychiatric Treatment</h3>
<p>Over 75% of individuals presenting with chemical dependency also suffer from co-occurring mental health conditions. Using substances is frequently an unconscious attempt to self-medicate unbearable emotional pain. As a consultant-led psychiatric hospital, Dr. Bilal Warraich conducts comprehensive diagnostic evaluations to identify and treat underlying conditions:</p>
<ul>
  <li>Major Depressive Disorder (MDD) and clinical anhedonia</li>
  <li>Severe Generalized Anxiety, Panic Disorder, and Social Phobias</li>
  <li>Bipolar Affective Disorder (BPAD)</li>
  <li>Trauma-related conditions and Post-Traumatic Stress Disorder (PTSD)</li>
  <li>Adult Attention-Deficit/Hyperactivity Disorder (ADHD) and impulsivity</li>
</ul>

<h3>3. Evidence-Based Psychotherapy & Cognitive Behavioral Therapy (CBT)</h3>
<p>Once medical detoxification is achieved, the psychological work of recovery begins. Our clinical psychology department, staffed by credentialed psychotherapists, conducts intensive daily therapeutic sessions:</p>
<ul>
  <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Identifying destructive automatic thoughts, cognitive distortions, and high-risk emotional triggers.</li>
  <li><strong>Dialectical Behavior Therapy (DBT) Skills:</strong> Distress tolerance, mindfulness techniques, and emotional regulation exercises.</li>
  <li><strong>Relapse Prevention Planning:</strong> Crafting actionable emergency behavioral plans for managing cravings and social pressures post-discharge.</li>
  <li><strong>Structured Group Psychotherapy:</strong> Facilitated peer groups that dismantle isolation and foster mutual accountability.</li>
</ul>

<h3>4. Family Systems Therapy & Relationship Healing</h3>
<p>Addiction is a family disease that erodes trust, induces chronic hypervigilance, and strains relationships. Our family counseling sessions educate parents, spouses, and siblings on codependency, healthy boundary setting, and supportive communication, transforming the home environment into a protective recovery fortress.</p>

<h2>Inside Our Executive Residential Facility in Lahore</h2>
<p>Physical environment plays a pivotal role in psychological healing. NiDAA Clinic provides an elevated inpatient experience designed for rest and reflection:</p>
<ul>
  <li><strong>Private & Semi-Private Executive Suites:</strong> Climate-controlled, sound-insulated residential rooms equipped with private en-suite bathrooms.</li>
  <li><strong>Nutritious Chef-Prepared Meals:</strong> Balanced dietary regimens designed by clinical nutritionists to support neurological recovery and gut-brain health.</li>
  <li><strong>Indoor Recreation & Wellness:</strong> Calm reading lounges, fitness spaces, and tranquil greenery overlooking peaceful gardens.</li>
  <li><strong>Strict Confidentiality & Dignity:</strong> Zero punitive confinement, zero harsh labor, and absolute non-disclosure protocols protecting patient privacy.</li>
</ul>

<h2>Frequently Asked Questions About Rehabilitation in Lahore</h2>

<h3>How long does inpatient rehabilitation typically last?</h3>
<p>While treatment plans are strictly individualized based on severity and substance type, clinical evidence demonstrates that comprehensive outcomes require between <strong>30 to 90 days</strong> of structured residential care. Acute medical detoxification generally spans 7 to 14 days, followed by intensive cognitive-behavioral stabilization.</p>

<h3>Is treatment confidential?</h3>
<p>Yes. NiDAA Clinic maintains strict HIPAA-aligned medical confidentiality standards. All patient records, admissions, and consultations are confidential, ensuring your family's personal privacy and professional reputation remain fully protected.</p>

<h3>How do we arrange an emergency admission?</h3>
<p>Our clinical admissions team operates 24/7. Families can call our emergency helpline at <strong>+92 321 7507866</strong> for immediate telephone triage. We assist with coordinated clinical transport and same-day direct psychiatric admissions.</p>

<h2>Take the First Step Toward Lasting Recovery Today</h2>
<p>Recovery is not an aspiration; it is an attainable medical reality when backed by science, compassion, and professional clinical expertise. If you or a family member is struggling with substance abuse or psychiatric distress in Lahore, contact our senior clinical team today.</p>
<p><strong>NiDAA Clinic (National Institute on Drug Abuse and Addiction)</strong><br />
📍 Canal Road, Westwood Colony, Lahore, Pakistan<br />
📞 24/7 Care Helpline: <strong>+92 321 7507866</strong><br />
🌐 Official Website: <a href="https://nidaclinic.com">https://nidaclinic.com</a></p>`;

const newPost = {
  _id: 'post-rehab-lahore-2026',
  title: 'Best Rehabilitation Centre in Lahore: Evidence-Based Inpatient Addiction Recovery & Psychiatric Care',
  slug: 'best-rehabilitation-centre-in-lahore',
  excerpt: 'Discover why NiDAA Clinic is recognized as the leading rehabilitation centre in Lahore. Led by Dr. Bilal Warraich (UNODC American Qualified), offering 24/7 medical detox, psychiatric stabilization, and CBT recovery.',
  contentHTML: articleContent,
  contentText: 'Navigating substance use disorders and severe psychiatric crises requires far more than isolation or temporary restraint...',
  content: [],
  coverImage: {
    url: '/assets/images/rehab_centre_lahore.jpg',
    alt: 'NiDAA Clinic Luxury Inpatient Rehabilitation Centre Lahore'
  },
  categories: ['rehabilitation-recovery', 'addiction-treatment'],
  tags: ['rehabilitation centre in lahore', 'best rehab in lahore', 'addiction treatment lahore', 'drug detox lahore', 'dr bilal warraich'],
  author: {
    name: 'Dr. Bilal Warraich',
    avatar: '/assets/images/dr_bilal_warraich.jpg',
    bio: 'Medical Director (MBBS, FCPS Psychiatry, UNODC American Qualified), Consultant Addiction Psychiatrist.'
  },
  seo: {
    metaTitle: 'Best Rehabilitation Centre in Lahore | NiDAA Clinic',
    metaDescription: 'NiDAA Clinic is the premier inpatient rehabilitation centre in Lahore. Medical detox, dual diagnosis, CBT therapy, and 24/7 confidential clinical psychiatric care.',
    canonicalUrl: 'https://nidaclinic.com/blog/best-rehabilitation-centre-in-lahore',
    ogImage: '/assets/images/rehab_centre_lahore.jpg',
    ogType: 'article',
    noIndex: false,
    focusKeyword: 'rehabilitation centre in lahore'
  },
  status: 'published',
  publishedAt: new Date().toISOString(),
  readingTime: 6,
  wordCount: 1450,
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

// Remove old if exists, and push to front of posts
if (!Array.isArray(data.posts)) data.posts = [];
data.posts = data.posts.filter(p => p.slug !== newPost.slug);
data.posts.unshift(newPost);

fs.mkdirSync(path.dirname(storePath), { recursive: true });
fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Successfully published article to .data/cms-store.json');
console.log('Slug: /blog/' + newPost.slug);
console.log('Total articles now in database:', data.posts.length);
