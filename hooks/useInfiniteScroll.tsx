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

    const target = targetRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [enabled, targetRef, onIntersect, threshold]);
}
