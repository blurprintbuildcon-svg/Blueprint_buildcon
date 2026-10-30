'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

export default function ReferralShareButton() {
  const [message, setMessage] = useState('Share');

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Refer & Earn | BluePrint Build-Con',
          text: 'Refer a construction project to BluePrint Build-Con and earn rewards.',
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setMessage('Link Copied!');
      window.setTimeout(() => setMessage('Share'), 2000);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setMessage('Unable to Share');
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
    >
      <Share2 size={15} aria-hidden="true" />
      {message}
    </button>
  );
}
