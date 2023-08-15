import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import paths from "@/constants/paths";
import { PublicLayout, MasterLayout, NotFound } from "@/components";

import routes from "./routes";
import useAuth from "../hooks/useAuth";

const RootRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            isAuthenticated ? (
              <Navigate to={paths.adminList} />
            ) : (
              window.location.replace(paths.login)
            )
          }
        />
        {routes.map((route) => {
          const AppLayout = route.isPublic ? PublicLayout : MasterLayout;
          if (!route.isPublic && !isAuthenticated) {
            return (
              <Route
                exact
                path={route.path}
                key={route.path}
                element={() => {
                  window.location.replace(paths.login);
                }}
              />
            );
          }
          return (
            <Route
              key={route.path}
              exact
              path={route.path}
              element={
                <AppLayout>
                  <route.component />
                </AppLayout>
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
