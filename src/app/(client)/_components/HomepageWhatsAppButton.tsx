import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/components/ui';

export function HomepageWhatsAppButton() {

  return (
    <a
      href={whatsappUrl('Hello Amros Perfumes, I would like to know more about your fragrances.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Amros Perfumes on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
