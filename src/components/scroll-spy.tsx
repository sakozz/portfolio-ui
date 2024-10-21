import { createContext, ReactNode, useContext, useLayoutEffect, useState } from 'react';

export type ScrollSpyCtxType = {
  visibleElementId: string;
};
export const ScrollSpyCtx = createContext<ScrollSpyCtxType | null>(null);

export const useScrollSpyContext = function () {
  const ctx = useContext(ScrollSpyCtx);
  if (!ctx) {
    throw new Error('Component should be wrapped in ScrollSpy');
  }
  return ctx;
};

export default function ScrollSpy({
  offset = 0,
  children,
}: {
  offset?: number;
  children: ReactNode;
}) {
  const [visibleElementId, setVisibleElementId] = useState('');
  const isInViewPort = (entry: IntersectionObserverEntry, offset = 0) => {
    const rect = entry.boundingClientRect;
    return rect.top - 1 <= offset && rect.bottom >= offset;
  };

  const handleScroll = (entry: IntersectionObserverEntry, isInVewPort: boolean) => {
    const { target, boundingClientRect } = entry;
    if (boundingClientRect.y <= 600 && isInVewPort) {
      setVisibleElementId(target.id);
    }
  };

  useLayoutEffect(() => {
    const scrollables = document.querySelectorAll('[data-scrollspy]');
    for (const scrollable of scrollables) {
      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            handleScroll && handleScroll(entry, isInViewPort(entry, offset));
          });
        },
        {
          root: null,
          rootMargin: `-${offset}px 0px 100% 0px`,
          threshold: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
        },
      );
      observer.observe(scrollable);
    }
  }, [offset]);

  const ctxValue = { visibleElementId };
  return <ScrollSpyCtx.Provider value={ctxValue}>{children}</ScrollSpyCtx.Provider>;
}
