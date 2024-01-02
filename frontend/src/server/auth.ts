import axios from "./axios";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  return axios
    .post("/auth/login", {
      email,
      password,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      return data;
    });
};
