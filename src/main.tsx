import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
