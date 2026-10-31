const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', '.data', 'cms-store.json');
let data = { posts: [], categories: [] };

try {
  data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
} catch (e) {
  console.log('Creating fresh store');
}

const homepageArticles = [
  {
    _id: 'post-ice-detox-lahore',
    title: 'Understanding Ice (Crystal Meth) Addiction & Safe Medical Detox',
    slug: 'understanding-ice-crystal-meth-addiction-medical-detox',
    excerpt: 'A clinical roadmap for withdrawal stabilization, vital monitoring, neurochemical rebalancing, and inpatient medical detox protocols under PHC standards.',
    contentHTML: `<p class="lead">Crystal methamphetamine (commonly termed "Ice") represents one of the most potent and destructive central nervous system stimulants circulating in modern society. Due to its intense surge of dopamine release—exceeding ten times the body's baseline natural rewards—ice rapidly rewires the brain's mesolimbic circuitry, precipitating rapid physiological dependence, profound sleep disruption, and high risks of stimulant-induced psychosis.</p>

<h2>The Neurobiology of Crystal Methamphetamine Dependence</h2>
<p>Unlike opioids or alcohol that depress neural signaling, crystal meth acts as an intensive neuro-stimulant, reversing dopamine, norepinephrine, and serotonin transporters. Over repeated cycles of abuse, cellular dopamine reserves are thoroughly exhausted, resulting in severe anhedonia (the absolute inability to experience pleasure) when the drug leaves the bloodstream.</p>
<p>At <strong>NiDAA Clinic</strong> under the medical direction of <strong>Dr. Bilal Warraich (UNODC American Qualified)</strong>, we approach crystal meth detox as an intensive medical and neuropsychiatric procedure, prioritizing neurological stabilization and compassionate clinical management.</p>

<h2>Why "Cold Turkey" Detox at Home is Extremely Dangerous</h2>
<p>Attempting unmonitored withdrawal from crystal meth outside a licensed hospital poses severe psychiatric and somatic risks:</p>
<ul>
  <li><strong>Stimulant Withdrawal Psychosis:</strong> Acute paranoid delusions, persecutory ideations, and severe auditory hallucinations.</li>
  <li><strong>Severe Depressive Crash & Suicidality:</strong> Extreme neurochemical depletion often induces intense suicidal impulses during the first 72 to 120 hours.</li>
  <li><strong>Cardiovascular Instability:</strong> Dysregulated adrenergic rebound causing tachyarrhythmias, malignant hypertension, and cardiac distress.</li>
  <li><strong>Severe Hyperpyrexia & Exhaustion:</strong> Disrupted hypothalamic thermoregulation coupled with metabolic collapse.</li>
</ul>

<h2>The 4 Phases of Inpatient Medical Detox at NiDAA Clinic</h2>

<h3>Phase 1: Emergency Clinical Triage & Neurochemical Stabilization (Days 1–3)</h3>
<p>Upon admission to our Canal Road Westwood residential facility in Lahore, every patient undergoes a complete metabolic panel, electrocardiogram (ECG), toxicology screening, and a psychiatric baseline assessment. We administer non-addictive neurochemical stabilizing agents to alleviate acute agitation, protect cardiac function, and gently restore natural circadian sleep architecture without dangerous over-sedation.</p>

<h3>Phase 2: Physiological Rehydration & Cellular Restoration (Days 4–7)</h3>
<p>Chronic meth consumption causes profound cellular dehydration, severe electrolyte imbalances, and nutritional cachexia. Our inpatient medical team utilizes clinical-grade IV vitamin therapy, zinc-magnesium infusion, and tailored electrolyte replenishment to repair cellular mitochondrial function.</p>

<h3>Phase 3: Cognitive Clarification & Psychiatric Assessment (Days 8–14)</h3>
<p>As the acute pharmacological fog dissipates, Miss Ayesha Ishaq and our clinical psychology team administer cognitive assessments to detect underlying co-occurring disorders such as ADHD, clinical depression, or trauma-induced anxiety that initially contributed to self-medication.</p>

<h3>Phase 4: Transition to Cognitive Behavioral Relapse Prevention</h3>
<p>Detoxification cleanses the body, but cognitive therapy protects long-term sobriety. Patients transition into intensive Cognitive Behavioral Therapy (CBT), learning to map environmental triggers, interrupt craving loops, and rebuild self-worth.</p>

<h2>Confidential Helpline & Admission Information</h2>
<p>If you or someone you care about is battling crystal meth in Lahore, confidential inpatient help is available 24/7. Call NiDAA Clinic at <strong>0321 7507866</strong> or visit our clinic at 99 Westwood Colony, Thokar Niaz Baig, Lahore.</p>`,
    contentText: 'Crystal methamphetamine represents one of the most potent CNS stimulants. A clinical roadmap for medical detox...',
    content: [],
    coverImage: {
      url: '/assets/images/service_rehab.jpg',
      alt: 'Ice Addiction Medical Detoxification at NiDAA Clinic Lahore',
    },
    categories: ['addiction-detox', 'addiction-treatment'],
    tags: ['ice addiction', 'crystal meth detox', 'rehab in lahore', 'substance detox', 'dr bilal warraich'],
    author: {
      name: 'Miss Ayesha Ishaq',
      avatar: '/assets/images/service_rehab.jpg',
      bio: 'Senior Clinical Psychologist, Specialist in Addiction Medicine and Cognitive Therapy.',
    },
    seo: {
      metaTitle: 'Understanding Ice Addiction & Safe Medical Detox in Lahore | NiDAA Clinic',
      metaDescription: 'A clinical roadmap for crystal meth withdrawal stabilization, vital monitoring, and medical detox under PHC standards at NiDAA Clinic Lahore.',
      canonicalUrl: 'https://nidaclinic.com/blog/understanding-ice-crystal-meth-addiction-medical-detox',
      ogImage: '/assets/images/service_rehab.jpg',
      ogType: 'article',
      noIndex: false,
      focusKeyword: 'ice addiction detox lahore',
    },
    status: 'published',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    wordCount: 1200,
    version: 1,
    revisions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'post-cbt-panic-ocd-lahore',
    title: 'CBT & Exposure Therapy: Overcoming Severe Panic Attacks & OCD',
    slug: 'cbt-exposure-therapy-panic-attacks-ocd',
    excerpt: 'How evidence-based Cognitive Behavioral Therapy (CBT) and ERP desensitize compulsive loops, intrusive thoughts, and generalized anxiety disorders.',
    contentHTML: `<p class="lead">Severe panic attacks and Obsessive-Compulsive Disorder (OCD) can transform everyday life into an unrelenting gauntlet of fear, physical distress, and mental exhaustion. While the sensations of panic feel like imminent physical disaster, evidence-based psychotherapy provides proven, long-lasting clinical relief without lifetime dependency on tranquilizers.</p>

<h2>Deconstructing the Anatomy of a Panic Attack</h2>
<p>A panic attack is essentially a false alarm triggered by the amygdala—the brain's ancient threat detection center. During an attack, a massive surge of adrenaline prompts rapid somatic reactions:</p>
<ul>
  <li>Tachycardia and chest tightness (frequently misinterpreted as an impending heart attack)</li>
  <li>Hyperventilation resulting in hypocapnia, tingling extremities, and lightheadedness</li>
  <li>Depersonalization (feeling detached from one's body) and derealization</li>
  <li>Catastrophic misinterpretation: "I am losing control, going crazy, or about to die."</li>
</ul>

<h2>The Cognitive Model of Panic: Breaking the Fear-Adrenaline Cycle</h2>
<p>At NiDAA Clinic, <strong>Miss Ayesha Ishaq</strong> leads specialized CBT protocols designed to break the cycle of anxiety:</p>
<ol>
  <li><strong>Somatic Symptom:</strong> A harmless physiological variation occurs (e.g., elevated heart rate from climbing stairs).</li>
  <li><strong>Catastrophic Thought:</strong> "My heart is failing."</li>
  <li><strong>Adrenaline Surge:</strong> The brain believes a mortal threat exists, releasing more adrenaline.</li>
  <li><strong>Intensified Symptoms:</strong> The heart pounds faster, seemingly confirming the catastrophe.</li>
</ol>
<p>Through systematic cognitive restructuring, clients learn to objectively identify distorted cognitions, examine empirical evidence, and replace catastrophic predictions with factual, neutral appraisals.</p>

<h2>Exposure and Response Prevention (ERP) for OCD</h2>
<p>Obsessive-Compulsive Disorder operates on a vicious cycle of <em>Intrusive Thought &rarr; Severe Anxiety &rarr; Compulsive Ritual &rarr; Temporary Relief &rarr; Strengthened Obsession</em>. Compulsions—whether physical washing, checking locks, or mental counting—actually reinforce OCD over time.</p>
<p>Exposure and Response Prevention (ERP) is the gold standard clinical treatment worldwide:</p>
<ul>
  <li><strong>Hierarchical Exposure:</strong> The psychologist and client co-create an anxiety hierarchy ranking triggers from mild to severe.</li>
  <li><strong>Controlled In-Vivo Exposure:</strong> The patient deliberately confronts the obsessive trigger in a safe, therapeutic setting.</li>
  <li><strong>Response Prevention:</strong> The patient is guided to refrain from the neutralizing ritual or reassurance-seeking.</li>
  <li><strong>Neuroplastic Habituation:</strong> The brain's alarm system gradually learns that the dreaded catastrophe does not occur, permanently dampening baseline anxiety.</li>
</ul>

<h2>Somatic Interoceptive Training</h2>
<p>In addition to cognitive exercises, we conduct interoceptive exposure: gentle, guided somatic exercises (such as voluntary hyperventilation or spinning) that reproduce benign panic sensations, desensitizing the nervous system to physical arousal.</p>

<h2>Consult Our Clinical Psychologists in Lahore</h2>
<p>If panic disorder, health anxiety, or OCD are impairing your peace of mind, reach out to NiDAA Clinic today at <strong>0321 7507866</strong> for in-clinic or online psychological consultation.</p>`,
    contentText: 'Severe panic attacks and OCD can transform life into an unrelenting gauntlet of fear. How CBT and ERP work...',
    content: [],
    coverImage: {
      url: '/assets/images/service_counseling.jpg',
      alt: 'CBT and Exposure Therapy for Panic and OCD at NiDAA Clinic',
    },
    categories: ['clinical-psychology', 'psychiatry-cbt'],
    tags: ['cbt therapy', 'panic attacks', 'ocd treatment', 'psychologist lahore', 'anxiety relief'],
    author: {
      name: 'Miss Ayesha Ishaq',
      avatar: '/assets/images/service_counseling.jpg',
      bio: 'Clinical Psychologist, Specialist in Cognitive Behavioral Therapy and ERP for Anxiety Disorders.',
    },
    seo: {
      metaTitle: 'CBT & Exposure Therapy for Panic Attacks & OCD in Lahore | NiDAA Clinic',
      metaDescription: 'Learn how evidence-based CBT and Exposure Response Prevention (ERP) eliminate severe panic attacks and obsessive thoughts at NiDAA Clinic Lahore.',
      canonicalUrl: 'https://nidaclinic.com/blog/cbt-exposure-therapy-panic-attacks-ocd',
      ogImage: '/assets/images/service_counseling.jpg',
      ogType: 'article',
      noIndex: false,
      focusKeyword: 'cbt for panic attacks lahore',
    },
    status: 'published',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 4,
    wordCount: 1100,
    version: 1,
    revisions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'post-psychosis-mdd-lahore',
    title: 'Early Warning Signs of Psychosis & Major Depressive Disorder (MDD)',
    slug: 'early-warning-signs-psychosis-major-depressive-disorder',
    excerpt: 'Recognizing subtle cognitive changes, social withdrawal, sleep breakdown, and depressive indicators for timely psychiatric medication and clinical care.',
    contentHTML: `<p class="lead">Severe psychiatric disorders like Major Depressive Disorder (MDD) and first-episode psychosis rarely develop overnight. Instead, they are preceded by weeks or months of subtle, escalating signs known clinically as the <em>prodromal phase</em>. Timely recognition and immediate psychiatric assessment under a qualified consultant psychiatrist dramatically improve long-term clinical recovery and protect brain architecture.</p>

<h2>Understanding the Prodrome of Psychosis</h2>
<p>Psychosis refers to a mental state where an individual's perception and processing of reality are profoundly impaired. Common early prodromal markers include:</p>
<ul>
  <li><strong>Attenuated Psychotic Symptoms:</strong> Fleeting moments of hearing voices, seeing shadows, or sensing someone standing directly behind when alone.</li>
  <li><strong>Ideas of Reference:</strong> A burgeoning suspicion that everyday radio broadcasts, street signs, or social media posts contain hidden, personalized messages.</li>
  <li><strong>Deteriorating Executive Focus:</strong> Inability to maintain concentration at university or office; speech becoming unusually tangential or disjointed.</li>
  <li><strong>Dramatic Sleep Deprivation:</strong> Consecutive nights of near-zero sleep without feelings of exhaustion, accompanied by heightened emotional agitation.</li>
  <li><strong>Uncharacteristic Social Withdrawal:</strong> Abandoning close friendships, ceasing hygiene routines, and expressing intense distrust of family members.</li>
</ul>

<h2>Major Depressive Disorder (MDD): More Than Transient Sadness</h2>
<p>Major Depressive Disorder is a debilitating neurobiological condition involving severe chemical and structural dysregulation across hippocampal and prefrontal circuits. Clinical diagnostic criteria encompass:</p>
<ul>
  <li><strong>Pervasive Anhedonia:</strong> Total absence of joy or interest in activities once passionately enjoyed.</li>
  <li><strong>Somatic Energy Depletion:</strong> Severe psychomotor retardation; feeling as though limbs are weighed down by lead.</li>
  <li><strong>Sleep & Appetite Disruption:</strong> Early morning awakening (terminal insomnia) accompanied by pervasive morning dread or marked weight shifts.</li>
  <li><strong>Excessive Guilt & Worthlessness:</strong> Irrational self-blame, feelings of being an intolerable burden to one's loved ones.</li>
  <li><strong>Passive or Active Suicidal Ideation:</strong> Recurring thoughts that "everyone would be better off if I didn't wake up tomorrow."</li>
</ul>

<h2>The Crucial Difference Between Clinical MDD and Psychotic Depression</h2>
<p>In severe clinical presentations, unipolar depression can develop psychotic features—such as nihilistic delusions (believing one's body is diseased or decaying) or auditory hallucinations commanding self-harm. In such critical circumstances, immediate medical inpatient evaluation is mandatory.</p>

<h2>Evidence-Based Multidisciplinary Intervention at NiDAA Clinic</h2>
<p>Under the leadership of <strong>Dr. Bilal Warraich (Medical Director)</strong> and our senior psychotherapists, NiDAA Clinic provides comprehensive psychiatric evaluation:</p>
<ul>
  <li><strong>Precision Pharmacotherapy:</strong> Modern, well-tolerated second-generation antipsychotics and SSRI/SNRI antidepressants tailored to minimize metabolic or sedative side effects.</li>
  <li><strong>Inpatient Protective Stabilization:</strong> Peaceful, private residential environment ensuring complete physical safety during acute mental health crises.</li>
  <li><strong>Individual Psychotherapy:</strong> Once acute symptoms stabilize, gentle supportive counseling and cognitive restructuring begin.</li>
</ul>

<h2>24/7 Crisis Support in Lahore</h2>
<p>If you observe sudden personality shifts, intense paranoia, or debilitating depressive paralysis in a loved one, do not wait. Contact NiDAA Clinic immediately at <strong>0321 7507866</strong> for confidential psychiatric evaluation.</p>`,
    contentText: 'Severe psychiatric disorders like MDD and psychosis rarely develop overnight. Recognizing early warning signs...',
    content: [],
    coverImage: {
      url: '/assets/images/service_psychiatric.jpg',
      alt: 'Psychiatric Evaluation for Psychosis and MDD at NiDAA Clinic Lahore',
    },
    categories: ['neuropsychiatry', 'psychiatric-care'],
    tags: ['psychosis symptoms', 'mdd depression', 'psychiatrist in lahore', 'mental health crisis', 'dr bilal warraich'],
    author: {
      name: 'Miss Ayesha Ishaq',
      avatar: '/assets/images/service_psychiatric.jpg',
      bio: 'Clinical Psychologist, Specialist in Neuropsychiatric Evaluation and Crisis Intervention.',
    },
    seo: {
      metaTitle: 'Early Warning Signs of Psychosis & Major Depressive Disorder | NiDAA Clinic',
      metaDescription: 'Recognizing subtle cognitive changes, sleep breakdown, and depressive indicators for timely psychiatric care in Lahore at NiDAA Clinic.',
      canonicalUrl: 'https://nidaclinic.com/blog/early-warning-signs-psychosis-major-depressive-disorder',
      ogImage: '/assets/images/service_psychiatric.jpg',
      ogType: 'article',
      noIndex: false,
      focusKeyword: 'psychosis symptoms lahore',
    },
    status: 'published',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 6,
    wordCount: 1350,
    version: 1,
    revisions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'post-codependency-family-lahore',
    title: 'Breaking Codependency: How Families Heal During Addiction Recovery',
    slug: 'breaking-codependency-families-heal-addiction-recovery',
    excerpt: 'Transforming unhealthy enabling dynamics into constructive boundaries, emotional empowerment, and supportive family communication systems.',
    contentHTML: `<p class="lead">Addiction is fundamentally a systemic family disease. When a loved one battles severe chemical dependency or compulsive behavior, the entire family system reorganizes around the crisis. Spouses, parents, and siblings often slip unknowingly into patterns of <em>codependency and enabling</em>—sacrificing their own emotional, financial, and mental health in a desperate attempt to rescue the addicted individual.</p>

<h2>What is Codependency in the Context of Addiction?</h2>
<p>Codependency occurs when family members become so obsessively preoccupied with controlling, hiding, or fixing another person's addiction that their own lives become unmanageable. Common signs include:</p>
<ul>
  <li>Walking on eggshells at home to prevent emotional outbursts or substance binges</li>
  <li>Covering up legal, financial, or employment disasters caused by substance use</li>
  <li>Experiencing chronic anxiety, panic, and sleepless nights while hyper-monitoring the addicted person</li>
  <li>Feeling extreme guilt whenever attempting to establish personal boundaries or say "no"</li>
  <li>Equating genuine love with self-sacrifice, endurance of abuse, and financial bailouts</li>
</ul>

<h2>Enabling vs. Helping: Understanding the Critical Distinction</h2>
<p>The difference between helping and enabling can be subtle but has life-or-death implications:</p>
<table style="width:100%; border-collapse: collapse; margin: 1.5rem 0;">
  <thead>
    <tr style="background: rgba(186,24,30,0.1); border-bottom: 2px solid #BA181E;">
      <th style="padding: 10px; text-align: left;">Constructive Helping</th>
      <th style="padding: 10px; text-align: left;">Destructive Enabling</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 10px;">Paying for licensed medical inpatient rehabilitation</td>
      <td style="padding: 10px;">Paying off drug debts, fines, or supplying daily unmonitored cash</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 10px;">Holding the patient accountable for their own behavioral recovery</td>
      <td style="padding: 10px;">Making excuses to employers, teachers, or extended family</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 10px;">Setting firm boundaries: "You cannot live in our home while actively using."</td>
      <td style="padding: 10px;">Allowing drugs or active substance use in the house to avoid a scene</td>
    </tr>
  </tbody>
</table>

<h2>How Family Systems Therapy Heals the Home</h2>
<p>At NiDAA Clinic, our clinical psychology department conducts structured family therapy sessions alongside inpatient treatment:</p>
<ul>
  <li><strong>De-escalating Chronic Hypervigilance:</strong> Teaching family members somatic calming techniques to overcome caregiver post-traumatic stress.</li>
  <li><strong>Establishing Non-Negotiable Boundaries:</strong> Empowering parents and spouses to state clear, loving limits without guilt or anger.</li>
  <li><strong>Dismantling Manipulation:</strong> Educating relatives on the psychological defenses of addiction (denial, gaslighting, projection) so they are no longer deceived.</li>
  <li><strong>Rebuilding Mutual Trust:</strong> Creating gradual milestones where trust is re-earned through verified biological screens and behavioral consistency.</li>
</ul>

<h2>Begin Family Healing Today</h2>
<p>You do not have to endure the agony of addiction alone. NiDAA Clinic provides confidential family counseling, intervention coordination, and comprehensive inpatient addiction treatment in Lahore. Call our senior team 24/7 at <strong>0321 7507866</strong>.</p>`,
    contentText: 'Addiction is fundamentally a systemic family disease. How families break codependency and heal together...',
    content: [],
    coverImage: {
      url: '/assets/images/rehabilitation_session.jpg',
      alt: 'Family Therapy and Codependency Healing at NiDAA Clinic Lahore',
    },
    categories: ['family-systems', 'clinical-psychology'],
    tags: ['family therapy', 'codependency', 'addiction recovery', 'family counseling lahore', 'ayesha ishaq'],
    author: {
      name: 'Miss Ayesha Ishaq',
      avatar: '/assets/images/rehabilitation_session.jpg',
      bio: 'Clinical Psychologist, Specialist in Family Systems Therapy and Codependency Recovery.',
    },
    seo: {
      metaTitle: 'Breaking Codependency: How Families Heal During Addiction Recovery | NiDAA Clinic',
      metaDescription: 'Transforming unhealthy enabling dynamics into constructive boundaries and family healing during addiction recovery at NiDAA Clinic Lahore.',
      canonicalUrl: 'https://nidaclinic.com/blog/breaking-codependency-families-heal-addiction-recovery',
      ogImage: '/assets/images/rehabilitation_session.jpg',
      ogType: 'article',
      noIndex: false,
      focusKeyword: 'codependency addiction family therapy',
    },
    status: 'published',
    publishedAt: new Date().toISOString(),
    readingTime: 5,
    wordCount: 1250,
    version: 1,
    revisions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Merge into data.posts
homepageArticles.forEach((article) => {
  const existingIdx = data.posts.findIndex((p) => p.slug === article.slug || p._id === article._id);
  if (existingIdx !== -1) {
    data.posts[existingIdx] = { ...data.posts[existingIdx], ...article };
    console.log('Updated:', article.slug);
  } else {
    data.posts.push(article);
    console.log('Added:', article.slug);
  }
});

// Ensure categories are present
const newCategories = [
  { _id: 'cat-addiction-detox', name: 'Addiction Detox', slug: 'addiction-detox', description: 'Medical detoxification and stabilization protocols', order: 1, postCount: 1 },
  { _id: 'cat-clinical-psychology', name: 'Clinical Psychology', slug: 'clinical-psychology', description: 'CBT, ERP, psychotherapy, and emotional wellness', order: 2, postCount: 2 },
  { _id: 'cat-neuropsychiatry', name: 'Neuropsychiatry', slug: 'neuropsychiatry', description: 'Psychiatric evaluation, psychosis, MDD, and pharmacotherapy', order: 3, postCount: 1 },
  { _id: 'cat-family-systems', name: 'Family Systems', slug: 'family-systems', description: 'Codependency, family counseling, and recovery boundaries', order: 4, postCount: 1 },
];

newCategories.forEach((cat) => {
  const cIdx = data.categories.findIndex((c) => c.slug === cat.slug);
  if (cIdx !== -1) {
    data.categories[cIdx] = { ...data.categories[cIdx], ...cat };
  } else {
    data.categories.push(cat);
  }
});

fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully saved cms-store.json with', data.posts.length, 'posts.');
