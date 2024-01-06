import { Routes } from "@generouted/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//@ts-ignore
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import "./index.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </CookiesProvider>
);
