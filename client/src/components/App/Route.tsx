import { Route } from "react-router-dom";

import PrivateRoute from "@/components/App/PrivateRoute.tsx";

export const RouteComponent = (
  path: string,
  children: React.ReactNode,
  privateRoute: boolean = true,
) => (
  <Route
    path={path}
    element={
      privateRoute ? <PrivateRoute>{children}</PrivateRoute> : <>{children}</>
    }
  />
);
