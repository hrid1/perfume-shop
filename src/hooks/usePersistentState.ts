'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { readStorage, writeStorage, type StorageKey, type Validator } from '@/lib/storage';

/**
 * useState that is hydrated from localStorage after mount and written back on change.
 * Starts with `initialValue` on the server and first client render, so markup matches.
 *
 * Pass `validate` as a module-level function (not an inline arrow) to keep it stable.
 * Returns `[value, setValue, isLoaded]`.
 */
export function usePersistentState<T>(
  key: StorageKey,
  initialValue: T,
  validate?: Validator<T>
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = readStorage<T>(key, validate);
    if (stored !== undefined) {
      // Hydrating from an external store after mount is the intended use here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(stored);
    }
    setIsLoaded(true);
  }, [key, validate]);

  useEffect(() => {
    if (!isLoaded) return;
    writeStorage(key, value);
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded];
}
