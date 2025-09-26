import type { FC, ReactNode } from "react";

import { useAuthentification } from "@/hooks/useAuthentification.ts";

interface Props {
  children: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const authenticated = useAuthentification();
  if (!authenticated) return null;
  return <>{children}</>;
};

export default PrivateRoute;
