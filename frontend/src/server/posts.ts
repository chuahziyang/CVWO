import { postOverview } from "../types/posts";
import axios from "./axios";
export const getPosts = () => {
  return () =>
    axios
      .get("/posts")
      .then((res) => res.data)
      .then((data) => {
        return data.map((post: any) => processPost(post)) as postOverview[];
      });
};

export const getPost = (id: string) => {
  return () =>
    axios
      .get(`/posts/${id}`)
      .then((res) => res.data)
      .then((data) => {
        return processPost(data) as postOverview;
      });
};

const processPost = (post: any) => {
  return {
    ...post,
    created_at: new Date(post.created_at),
    updated_at: new Date(post.created_at),
    user: {
      ...post.user,
      created_at: new Date(post.user.created_at),
      updated_at: new Date(post.user.updated_at),
    },
  };
};
