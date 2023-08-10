import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./shared/Header.tsx";
import Home from "../pages/home";
import Account from "../pages/account";
import { Protected } from "./Protected.tsx";
import Auth from "../pages/auth";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Header />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth"} element={<Auth />} />
          <Route
            path={"/account"}
            element={
              <Protected>
                <Account />
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
