import { useEffect, useState } from "react";
import useGlobalContext from "../contexts/globalContext";
import { defaultCacheTimeout } from "../config";

export default function useFetch<T>(
  url: string,
  options?: {
    cacheTimeout?: number;
    initial?: T;
    callback?: Function;
    debug?: boolean;
  }
) {
  const [data, setData] = useState<T | null>(
    options && options.initial ? options.initial : null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const global = useGlobalContext();

  async function loadData() {
    setLoading(true);

    const cachedValue = global.cache.filter((e) => e.key === url)[0];

    if (
      (cachedValue &&
        Date.now() - cachedValue.updated <
          (options && options.cacheTimeout
            ? options.cacheTimeout
            : defaultCacheTimeout)) ||
      (options && options.debug && import.meta.env.MODE === "development")
    ) {
      setData(cachedValue.value);
      setLoading(false);
      return;
    }

    const fetchedData = await fetch(url);
    const parsedData = await fetchedData.json();

    global.putCache(url, parsedData);

    setData(parsedData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && options && options.callback) {
      options.callback();
    }
  }, [loading]);

  return [data as T, loading as boolean] as const;
}
