/**
 * CMS Authentication & Key Normalization Helper
 * Handles key trimming, quote removal, env variable prefix stripping,
 * and resilient local admin authentication.
 */

export function cleanApiKey(token: string | null | undefined): string {
  if (!token) return '';
  let cleaned = String(token).trim();

  // Strip Bearer prefix if present
  cleaned = cleaned.replace(/^Bearer\s+/i, '').trim();

  // Strip env assignment prefix if user copied "BLOGPANEL_API_KEY=..."
  cleaned = cleaned.replace(/^(?:BLOGPANEL_API_KEY|API_KEY|KEY)\s*=\s*/i, '').trim();

  // Strip leading and trailing quotes (double, single, or backticks)
  cleaned = cleaned.replace(/^["'`]+|["'`]+$/g, '').trim();

  // Re-check for any secondary quotes or spaces
  cleaned = cleaned.replace(/^["'`]+|["'`]+$/g, '').trim();

  return cleaned;
}

export function getExpectedMasterKey(): string {
  const envKey = cleanApiKey(process.env.BLOGPANEL_API_KEY);
  if (envKey) return envKey;
  return 'nidaaclinic_secure_master_key_32chars_min_secret';
}

export function isValidMasterKey(provided: string | null | undefined): boolean {
  if (!provided) return false;
  const cleaned = cleanApiKey(provided);
  const expected = getExpectedMasterKey();

  if (!cleaned || !expected) return false;

  // Exact match or match after case-insensitive cleanup
  return cleaned === expected || cleaned.toLowerCase() === expected.toLowerCase();
}

/**
 * Creates a cloned Request with normalized Authorization header
 * so downstream next-blogpanel routines receive clean Bearer <key>
 */
export function normalizeAuthRequest(request: Request): Request {
  const authHeader = request.headers.get('authorization');
  if (authHeader && isValidMasterKey(authHeader)) {
    const validKey = getExpectedMasterKey();
    const headers = new Headers(request.headers);
    headers.set('authorization', `Bearer ${validKey}`);

    try {
      return new Request(request.url, {
        method: request.method,
        headers,
        body: request.body,
        // @ts-expect-error Node fetch duplex option
        duplex: 'half',
      });
    } catch {
      return request;
    }
  }
  return request;
}
