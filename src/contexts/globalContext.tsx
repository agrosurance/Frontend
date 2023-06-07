import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

type CacheType = { key: string; value: any; updated: number }[];

interface GlobalContextType {
  cache: CacheType;
  putCache: (key: string, value: any) => void;
  modalState: {
    modal: ReactNode;
    setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  };
  errorState: {
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
  };
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<CacheType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<ReactNode | null>();

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
    saveLocalCache();
  }

  async function loadLocalCache() {
    const loadedCache = localStorage.getItem("cache");

    if (loadedCache) {
      const savedCache = await JSON.parse(loadedCache as string);
      setCache(savedCache);
    } else {
      localStorage.setItem("cache", JSON.stringify(cache));
    }

    setLoading(false);
  }

  async function saveLocalCache() {
    localStorage.setItem("cache", JSON.stringify(cache));
  }

  useEffect(() => {
    loadLocalCache();
  }, []);

  const value = {
    cache,
    putCache,
    modalState: { modal, setModal },
    errorState: { error, setError },
  };

  return (
    <GlobalContext.Provider value={value}>
      {error ? <ErrorPage></ErrorPage> : !loading && children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
