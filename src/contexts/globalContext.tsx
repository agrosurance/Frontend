import { ReactNode, createContext, useContext, useState } from "react";

type CacheType = { key: string; value: any; updated: number }[];

interface GlobalContextType {
  cache: CacheType;
  putCache: (key: string, value: any) => void;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<CacheType>([]);

  function putCache(key: string, value: any) {
    let xCache = cache;
    let flag = false;
    xCache.map((e) => {
      if (e.key === key) {
        e.value = value;
        e.updated = Date.now();
        flag = true;
      }
    });
    if (!flag) {
      xCache.push({ key: key, value: value, updated: Date.now() });
    }
    setCache(xCache);
  }

  const value = { cache, putCache };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
