'use client';

import React, { useState, useEffect } from 'react';

export default function AdminAuthGuard({
  children,
  masterKey,
}: {
  children: React.ReactNode;
  masterKey: string;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user has active session
    const hasAuth =
      sessionStorage.getItem('nidaa_admin_authenticated') === 'true' &&
      sessionStorage.getItem('blogpanel_api_key') === masterKey;

    setIsAuthenticated(hasAuth);
  }, [masterKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === 'blog@nidclinic.com' && password === 'System-8706411@') {
      sessionStorage.setItem('nidaa_admin_authenticated', 'true');
      sessionStorage.setItem('blogpanel_api_key', masterKey);
      localStorage.setItem('nbp_api_key', masterKey);
      document.cookie = `nidaa_admin_token=admin_${Date.now()}; path=/; max-age=2592000; SameSite=Lax`;
      setIsAuthenticated(true);
    } else {
      setErrorMessage('Invalid email or password. Please use authorized clinic credentials.');
    }
    setLoading(false);
  };

  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
        <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F9FAFB',
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(186, 24, 30, 0.05) 0%, transparent 60%)',
          padding: '1.5rem',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '24px',
            padding: '2.75rem 2.25rem',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #BA181E 0%, #8E0E14 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 16px rgba(186, 24, 30, 0.25)',
                marginBottom: '1.25rem',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#BA181E',
                background: 'rgba(186, 24, 30, 0.08)',
                border: '1px solid rgba(186, 24, 30, 0.18)',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                marginBottom: '0.75rem',
              }}
            >
              NiDAA Clinic • Blog CMS
            </div>

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.02em',
                margin: '0 0 0.5rem 0',
              }}
            >
              Administrator Login
            </h1>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#6B7280',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Enter authorized clinic credentials to access the medical content dashboard.
            </p>
          </div>

          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
                lineHeight: 1.4,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="admin-email"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#374151',
                  marginBottom: '0.45rem',
                }}
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="blog@nidclinic.com"
                required
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '12px',
                  color: '#111827',
                  fontSize: '0.925rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#374151',
                  marginBottom: '0.45rem',
                }}
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '12px',
                  color: '#111827',
                  fontSize: '0.925rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #BA181E 0%, #8E0E14 100%)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.95rem',
                borderRadius: '9999px',
                padding: '0.85rem 1.5rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(186, 24, 30, 0.25)',
                marginTop: '0.5rem',
              }}
            >
              {loading ? 'Verifying Credentials...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
            <a
              href="/"
              style={{
                color: '#6B7280',
                fontSize: '0.85rem',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              &larr; Return to NiDAA Clinic Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
