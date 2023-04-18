import { useState, useEffect, useCallback, useRef } from 'react';
import { PaginationPayload } from '@/types/common';

export function useFetch({
  perPage = 10,
  page,
  fetcher,
  initialData = [],
}: {
  perPage?: number;
  page: number;
  fetcher: (payload: PaginationPayload) => Promise<any>;
  initialData?: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(initialData);
  const [pageNum, setPageNum] = useState(page);
  const lastUsedPage = useRef<number | null>(initialData.length ? 0 : null);

  const loadMore = useCallback(() => {
    setPageNum((prev) => prev + 1);
  }, []);

  const fetchData = useCallback(async () => {
    if (pageNum === lastUsedPage.current) return;
    lastUsedPage.current = pageNum
    try {
      setLoading(true);
      setError(false);
      const conversations = await fetcher({ page: pageNum, perPage });
      setData((prev) => [...prev, ...conversations]);
      setHasMore(conversations.length === 10);
    } catch (err) {
      setError(!!err);
    } finally {
      setLoading(false);
    }
  }, [pageNum]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, data, loadMore, hasMore };
}

export default useFetch;
