import { useCallback, useEffect, useState } from 'react';

export type UseSlidesOptions = {
  circular?: boolean;
  initialIndex?: number;
  onChange?: (index: number) => void;
};

export default function useSlides<T>(
  items: T[],
  options: UseSlidesOptions = {}
) {
  const { circular = true, initialIndex = 0, onChange } = options;
  const [index, setIndex] = useState(Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1)));

  useEffect(() => {
    onChange?.(index);
  }, [index, onChange]);

  const next = useCallback(() => {
    setIndex(i => {
      const nextIdx = i + 1;
      if (nextIdx >= items.length) return circular ? 0 : i;
      return nextIdx;
    });
  }, [items.length, circular]);

  const prev = useCallback(() => {
    setIndex(i => {
      const prevIdx = i - 1;
      if (prevIdx < 0) return circular ? items.length - 1 : i;
      return prevIdx;
    });
  }, [items.length, circular]);

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= items.length) return;
    setIndex(n);
  }, [items.length]);

  return {
    index,
    item: items[index],
    length: items.length,
    isFirst: index === 0,
    isLast: index === items.length - 1,
    next,
    prev,
    goTo,
    setIndex,
  };
}