import { useEffect, useRef, useState } from 'react';

export function useVisibleOnce(rootMargin = '160px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (isVisible || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return { ref, isVisible };
}
