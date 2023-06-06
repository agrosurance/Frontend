import { useNavigate } from "react-router-dom";
import useGlobalContext from "../contexts/globalContext";

export default function useError() {
  const global = useGlobalContext();
  const navigate = useNavigate();

  function clear() {
    global.errorState.setError(null);
    navigate(-1);
  }

  function throwErr(err: string) {
    global.errorState.setError(err);
    navigate("/error");
  }

  return { message: global.errorState.error, clear, throwErr };
}
