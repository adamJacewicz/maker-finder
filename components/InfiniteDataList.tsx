import React, { ReactElement, useCallback, useMemo, useRef } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import restClient from '@/rest-client';

type InfiniteDataListProps<T> = {
  queryKey: SWRInfiniteKeyLoader;
  initialData?: Array<T>;
  renderItem: (item: T) => ReactElement;
};

function InfiniteDataList<T>({ queryKey, initialData = [], renderItem }: InfiniteDataListProps<T>) {
  const observer = useRef<IntersectionObserver>();
  const listRef = useRef<HTMLDivElement>(null);
  const { data, setSize } = useSWRInfinite(queryKey, restClient.fetcher, {
    fallbackData: initialData,
  });
  const parsedData = useMemo(() => data?.flat() ?? [], [data]);

  const lastListItemRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setSize((s) => s + 1);
        }
      },
      { root: listRef.current, rootMargin: '10px' },
    );
    if (node) observer.current.observe(node);
  }, [setSize]);

  return (
    <div className="overflow-y-auto scrollbar-hidden pt-2 mt-3 -mx-5 px-5" ref={listRef}>
      {parsedData.map(renderItem)}
      <div ref={lastListItemRef} />
    </div>
  );
}

export default InfiniteDataList;
