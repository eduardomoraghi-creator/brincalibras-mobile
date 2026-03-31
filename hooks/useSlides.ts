import { useCallback, useEffect, useState } from 'react';

export default function useSlides<T>(items: T[], options: any = {}) {
  // Alterado para circular: false para evitar o pulo para o final
  const { circular = false, initialIndex = 0 } = options;
  const [index, setIndex] = useState(initialIndex);
  const [maxVisited, setMaxVisited] = useState(initialIndex);

  const next = useCallback(() => {
    setIndex((i: number) => {
      const nextIdx = i + 1;
      if (nextIdx >= items.length) return i; // Trava no último
      return nextIdx;
    });
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i: number) => {
      const prevIdx = i - 1;
      if (prevIdx < 0) return i; // Trava no primeiro
      return prevIdx;
    });
  }, []);

  useEffect(() => {
    if (index > maxVisited) {
      setMaxVisited(index);
    }
  }, [index]);

  return {
    index,
    item: items[index],
    length: items.length,
    maxVisited,
    isFirst: index === 0,
    isLast: index === items.length - 1,
    isFinished: maxVisited === items.length - 1,
    next,
    prev,
  };
}