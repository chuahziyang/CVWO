import axios from "./axios";

export const getPosts = () => {
  return () => axios.get("/posts").then((res) => res.data);
};

export const getPost = (id: string) => {
  return () => axios.get(`/posts/${id}`).then((res) => res.data);
};
