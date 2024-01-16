import { Categories, Post } from "../types/posts";
import { axios } from "./axios";
import { getComments } from "./comments";

export const archivePostauth = ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  console.log(id);
  console.log(token);
  return axios
    .put(`/posts/${id}`, null, {
      headers: {
        Authorization: "bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const deletePostauth = ({
  id,
  token,
}: {
  id: number;
  token: string;
}) => {
  console.log(token);
  console.log(`/posts/${id}`);
  return axios
    .delete(`/posts/${id}`, {
      headers: {
        Authorization: "bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const newPostAuth = ({
  name,
  content,
  category,
  token,
}: {
  name: string;
  content: string;
  category: Categories;
  token: string;
}) => {
  return axios
    .post(
      "/posts",
      {
        name: name,
        category: category,
        status: "offline",
        description: "ASDASJDHALKSDJ HLAKJSHVDNKAJSHVD",
        environment: "Active",
        created_at: "2024-01-03T18:53:07.929Z",
        updated_at: "2024-01-03T18:53:09.554Z",
        content: content,
      },
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      console.log(processPost(data));
      return processPost(data) as Post;
    });
};

export const getPosts = () => {
  return () =>
    axios
      .get("/posts")
      .then((res) => res.data)
      .then((data) => {
        return data.map((post: any) => processPost(post)) as Post[];
      });
};

export const getActivity = async () => {
  const posts = await getPosts()();
  const comments = await getComments()();

  console.log(posts);
  console.log(comments);
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
