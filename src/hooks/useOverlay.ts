'use client';

import { useEffect, useRef } from 'react';

// Reference count so stacked overlays (e.g. a modal over a drawer) don't
// unlock page scrolling when only one of them closes.
let scrollLockCount = 0;

function lockScroll() {
  scrollLockCount += 1;
  if (scrollLockCount === 1) document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) document.body.style.overflow = '';
}

/** Locks body scroll and closes on Escape while `open` is true. */
export function useOverlay(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockScroll();
    };
  }, [open]);
}
