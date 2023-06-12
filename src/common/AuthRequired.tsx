import React, { ReactNode } from "react";
import { useAuthContext } from "../contexts/AuthContext";

import { Navigate } from "react-router-dom";

export default function AuthRequired({ children }: { children: ReactNode }) {
  const { signer } = useAuthContext();

  if (!signer) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
