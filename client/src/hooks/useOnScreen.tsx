import { RefObject, useEffect, useState } from 'react';

export default function useOnScreen<T extends Element> (ref: RefObject<T>, rootMargin = '0px'): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    // return () => {
    //   observer.unobserve(ref.current!);
    // };
  }, []);
  return isIntersecting;
}
