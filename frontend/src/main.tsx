import { Routes } from "@generouted/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "react-auth-kit";
import { createRoot } from "react-dom/client";
import "./index.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <AuthProvider
    authType={"cookie"}
    authName={"_auth"}
    cookieDomain={"http://localhost:5173/"}
    cookieSecure={false}
    // cookieSecure={window.location.protocol === "https:"}
  >
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </AuthProvider>
);
