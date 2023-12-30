import "./index.css";
import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>
);
