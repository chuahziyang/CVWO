import axiosalias from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://offbeat-salt-production.up.railway.app"
    : "http://localhost:3000";

export const axios = axiosalias.create({
  baseURL: baseURL,
});
