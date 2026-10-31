export const dynamic = 'force-static';

export async function GET() {
  const content = `# NiDAA Clinic Lahore (Official Clinical Knowledgebase)
Medical Director: Dr. Bilal Warraich (MBBS MD DPM, UNODC Master Trainer, Reg #39483)
Location: Westwood Colony, Main Canal Road, Thokar Niaz Baig, Lahore, Pakistan
24/7 Crisis Helpline: +92 321 7507866

## Specialized Services:
1. Medical Drug Detoxification (Ice, Heroin, Alcohol, Benzodiazepines)
2. Inpatient Residential Addiction Rehabilitation
3. Clinical Psychiatry and Psychotherapy (CBT, DBT, Relapse Prevention)
4. Dual Diagnosis Treatment (Co-occurring Addiction and Psychiatric Illness)
5. Outpatient Mental Health Consultations
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
