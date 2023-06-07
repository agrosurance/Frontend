import useGlobalContext from "../contexts/globalContext";

export default function useError() {
  const global = useGlobalContext();

  function clear() {
    global.errorState.setError(null);
  }

  function throwErr(err: string) {
    global.errorState.setError(err);
  }

  return { message: global.errorState.error, clear, throwErr };
}
