'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button, ButtonLink, EmptyState } from '@/components/ui';

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Swap for an error-reporting service (e.g. Sentry) once one is set up.
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && 'digest' in error ? String((error as { digest?: string }).digest) : null;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-24">
      <EmptyState
        icon={AlertTriangle}
        eyebrow="Something went wrong"
        title="We couldn't load this page"
        description={
          <>
            A temporary problem stopped this page from loading. Please try again — your bag and
            wishlist are safe.
            {digest && (
              <span className="block mt-2 font-mono text-[11px] text-noir-500">Ref: {digest}</span>
            )}
          </>
        }
        actions={
          <>
            <Button size="lg" onClick={() => retry()} className="w-full sm:w-auto">
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
            <ButtonLink href="/" variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </ButtonLink>
          </>
        }
      />
    </div>
  );
}
