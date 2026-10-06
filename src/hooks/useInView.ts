import { useEffect, useRef, useState } from "react";

/**
 * Reports once an element has scrolled into view.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = {
    rootMargin: "0px 0px -10% 0px",
  },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
