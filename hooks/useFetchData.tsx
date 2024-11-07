import { useState, useEffect, useRef } from 'react';

interface CacheType {
  [key: string]: any;
}

const useFetchData = <T,>(url: string): [T | null, boolean, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const cache = useRef<CacheType>({});

  useEffect(() => {
    if (cache.current[url]) {
      setData(cache.current[url]);
      setIsLoading(false);
    } else {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const json = (await response.json()) as T;
          setData(json);
          cache.current[url] = json;
        } catch (error) {
          console.error(error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [url]);

  return [data, isLoading, isError];
};

export default useFetchData;
