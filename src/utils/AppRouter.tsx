import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/shared/Header.tsx";
import Home from "../pages/home";

import { Protected } from "./Protected.tsx";
import Auth from "../pages/auth";
import { useUser } from "../hooks/useUser.ts";
import { lazy, Suspense } from "react";
import Loading from "../components/shared/Loading.tsx";

import UserPage from "../pages/user";
const LazyAccount = lazy(() => import("../pages/account"));

const AppRouter = () => {
  const { isLoading, user, userDetails } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Header />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth"} element={<Auth />} />
          <Route path={"users"}>
            <Route
              path={":userId"}
              element={<UserPage userDetails={userDetails} user={user} />}
            />
          </Route>
          <Route
            path={"/account"}
            element={
              <Protected isLoading={isLoading} user={user}>
                <Suspense fallback={<Loading />}>
                  <LazyAccount userDetails={userDetails} user={user} />
                </Suspense>
              </Protected>
            }
          />
        </Route>

        <Route path={"*"} element={<Header />}>
          <Route path={"*"} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
