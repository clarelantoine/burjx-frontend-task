import { useEffect } from "react";

export function useInfiniteScroll({
  targetRef,
  onIntersect,
  enabled = true,
  threshold = 1,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}) {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    // target reference
    const target = targetRef.current;

    //create the intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold },
    );

    // oberver the target
    observer.observe(target);

    // remove intersection observer on component unmount
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [enabled, targetRef, onIntersect, threshold]);
}
