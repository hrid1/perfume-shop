'use client';

import { useEffect } from 'react';

/**
 * Last-resort fallback when the root layout itself fails. It replaces the whole
 * document, so global CSS isn't loaded — styles are inline on purpose.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0c',
          color: '#f5f2ec',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <title>Something went wrong | Amros Perfumes</title>
        <div style={{ maxWidth: 420 }}>
          <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: 12, textTransform: 'uppercase' }}>
            Amros Perfumes
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 500, margin: '12px 0' }}>Something went wrong</h1>
          <p style={{ color: '#9a958c', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
            We hit an unexpected problem. Please try again in a moment.
          </p>
          <button
            onClick={() => retry()}
            style={{
              background: '#d4af37',
              color: '#0a0a0c',
              border: 'none',
              borderRadius: 4,
              padding: '12px 28px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
