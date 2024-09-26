import { useCallback, useEffect, useMemo } from 'react';
import { useHash } from 'react-use';

const getCacheOrNull = (hash: string) => {
  try {
    return JSON.parse(decodeURIComponent(hash.replace(/^#/, '')));
  } catch {
    return null;
  }
};

type StorageTypes =
  | string
  | number
  | boolean
  | string[]
  | Record<string, string>;

export const useStorage = <K extends StorageTypes>(
  key: string,
  defaultValue: K
): [K, (value: StorageTypes) => void] => {
  const [hash, setHash] = useHash();

  const updateHash = useCallback(
    (value: StorageTypes) => {
      const cache = getCacheOrNull(hash);
      setHash(
        JSON.stringify({
          ...(cache ?? {}),
          [key]: value,
        })
      );
    },
    [hash, key, setHash]
  );

  const hashValue = useMemo(() => {
    const cache = getCacheOrNull(hash);
    if (cache === null || !cache[key]) {
      return defaultValue as K;
    }
    return cache[key] as K;
  }, [hash, key]);

  useEffect(() => {
    const cache = getCacheOrNull(hash);
    if (cache === null || !cache[key]) {
      setHash(
        JSON.stringify({
          ...(cache ?? {}),
          [key]: defaultValue,
        })
      );
    }
  }, [hash]);

  return [hashValue, updateHash];
};
