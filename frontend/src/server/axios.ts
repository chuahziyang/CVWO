import axiosalias from "axios";

const test =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUxNzc0MDd9.0nrmUHZbOcWwDKCtDumq2bgmvH_gqpSVsVLOkOjqf2c";

export const axios = axiosalias.create({
  baseURL: "http://localhost:3000",
});

export const axioswithAuth = (header: string) => {
  return axiosalias.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: "Bearer " + header,
    },
  });
};
