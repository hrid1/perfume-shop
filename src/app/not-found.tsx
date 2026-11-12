import type { Metadata } from 'next';
import { Compass, ArrowRight } from 'lucide-react';
import { ButtonLink, EmptyState } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24">
      <EmptyState
        icon={Compass}
        eyebrow="404"
        title="This page has drifted away"
        description="The page you're looking for doesn't exist or may have moved. Let's get you back to the collection."
        actions={
          <>
            <ButtonLink href="/catalog" size="lg" className="w-full sm:w-auto">
              <span>Explore Fragrances</span>
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </ButtonLink>
          </>
        }
      />
    </main>
  );
}
