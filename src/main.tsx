import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import UserProvider from "./context/User/UserProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SupabaseProvider from "./features/user/SupabaseProvider.tsx";
import Account from "./pages/account";
import Header from "./components/shared/Header.tsx";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <UserProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </UserProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
