export const dynamic = 'force-static';

export async function GET() {
  const content = `# NiDAA Clinic Lahore
National Institute on Drug Abuse and Addiction
Medical Director: Dr. Bilal Warraich (MBBS MD DPM)
Address: Westwood Colony, Main Canal Road, Thokar Niaz Baig, Lahore, Pakistan
Helpline: 0321 7507866
Website: https://www.nidaclinic.com
Services: Psychiatric treatment, clinical psychology, drug detox, addiction rehabilitation, dual diagnosis care.
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
