import { axios } from "./axios";

export const signup = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return axios
    .post("/users", {
      email,
      password,
      name,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      return data;
    });
};
