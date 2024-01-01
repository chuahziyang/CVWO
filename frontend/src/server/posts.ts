import { postOverview } from "../types/posts";
import axios from "./axios";
export const getPosts = () => {
  return () =>
    axios
      .get("/posts")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return data.map((post: any) => ({
          ...post,
          created_at: new Date(post.created_at),
          updated_at: new Date(post.created_at),
        })) as postOverview[];
      });
};

export const getPost = (id: string) => {
  return () =>
    axios
      .get(`/posts/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return {
          ...data,
          created_at: new Date(data.created_at),
          updated_at: new Date(data.created_at),
        } as postOverview;
      });
};
