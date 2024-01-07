import { Categories, Post } from "../types/posts";
import { axios, axioswithAuth } from "./axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUxNzc0MDd9.0nrmUHZbOcWwDKCtDumq2bgmvH_gqpSVsVLOkOjqf2c";

export const newPost = ({
  name,
  content,
  category,
  user_id,
}: {
  name: string;
  content: string;
  user_id: number;
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
      user_id,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      console.log(processPost(data));
      return processPost(data) as Post;
    });
};

export const getPosts = () => {
  return () =>
    axioswithAuth(token)
      .get("/posts")
      .then((res) => res.data)
      .then((data) => {
        return data.map((post: any) => processPost(post)) as Post[];
      });
};

export const getPost = (id: string) => {
  return () =>
    axios
      .get(`/posts/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        const processedData = processPost(data);
        console.log(processedData);
        return processedData;
      });
};

const processPost = (post: any): Post => {
  return {
    ...post,
    created_at: new Date(post.created_at),
    updated_at: new Date(post.created_at),
    user: {
      ...post.user,
      created_at: new Date(post.user.created_at),
      updated_at: new Date(post.user.updated_at),
    },
    comments: post.comments
      .map((comment: any) => ({
        ...comment,
        created_at: new Date(comment.created_at),
        updated_at: new Date(comment.updated_at),
      }))
      .reverse(),
  };
};
