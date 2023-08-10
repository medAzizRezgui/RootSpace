import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import UserProvider from "./providers/UserProvider.tsx";
import SupabaseProvider from "./providers/SupabaseProvider.tsx";

import AppRouter from "./components/AppRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <UserProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </UserProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
