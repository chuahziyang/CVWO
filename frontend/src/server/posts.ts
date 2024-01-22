import { images } from "../types/imagedata";
import { Categories, Comment, Post } from "../types/posts";
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

  const processedComments: Comment[] = comments.map((comment: any) => {
    return {
      ...comment,
      created_at: new Date(comment.created_at),
      updated_at: new Date(comment.updated_at),
    };
  });
  const processedPosts: Post[] = posts.map((post) => processPost(post));
  const finalprocessedComments = processedComments.map(
    //@ts-ignore
    (comment: Comment & { post: Post }) => {
      return {
        name: comment.user.name,
        imageUrl: images[comment.user.id],
        category: comment.post.category,
        date: comment.created_at,
        id: comment.post.id,
        type: "comment",
        title: comment.post.name,
      };
    }
  );

  const finalprocessedPosts = processedPosts.map((post: Post) => {
    return {
      name: post.user.name,
      imageUrl: images[post.user.id],
      category: post.category,
      date: post.created_at,
      id: post.id,
      type: "post",
      title: post.name,
    };
  });

  const all = finalprocessedComments
    .concat(finalprocessedPosts)
    .sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

  return all;
  // return [
  //   {
  //     name: "Chuah Zi Yang",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     category: "General",
  //     date: "1h",
  //     id: 1,
  //   },
  // ];
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
