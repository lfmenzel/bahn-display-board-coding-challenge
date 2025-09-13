import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/redux";
import { App } from "@/components/App/App";
import { ThemeProvider } from "@/components/App/ThemeProvider";
import "@/resources/i18n";

createRoot(document.getElementById("body")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
