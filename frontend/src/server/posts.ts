import { Categories, postOverview } from "../types/posts";
import axios from "./axios";

export const newPost = ({
  name,
  content,
  category,
}: {
  name: string;
  content: string;
  category: Categories;
}) => {
  return axios
    .post("/posts", {
      name: name,
      category: category,
      status: "offline",
      description: "ASDASJDHALKSDJ HLAKJSHVDNKAJSHVD",
      environment: "Active",
      created_at: "2024-01-03T18:53:07.929Z",
      updated_at: "2024-01-03T18:53:09.554Z",
      content: content,
      user_id: 1,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      console.log(processPost(data));
      return processPost(data) as postOverview;
    });
};

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
