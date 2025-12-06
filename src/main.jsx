import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2000,
            style: {
              fontFamily: "inherit",
              borderRadius: "12px",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
