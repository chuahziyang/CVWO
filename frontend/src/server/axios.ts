import axios from "axios";

const header =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUxNzc0MDd9.0nrmUHZbOcWwDKCtDumq2bgmvH_gqpSVsVLOkOjqf2c";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: "Bearer " + header,
  },
});

export default instance;
