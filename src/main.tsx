import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import UserProvider from "./features/user/UserProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SupabaseProvider from "./features/user/SupabaseProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
