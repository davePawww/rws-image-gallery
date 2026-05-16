import { useEffect, useRef, useState } from 'react';

export function useLazyLoad<T extends HTMLElement = HTMLDivElement>() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { isVisible, elementRef };
}
