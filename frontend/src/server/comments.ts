import { axios } from "./axios";

export const newCommentauth = ({
  content,
  post_id,
  token,
}: {
  content: string;
  post_id: number;
  token: string;
}) => {
  return axios
    .post(
      "/comments",
      {
        content,
        post_id,
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
      return data;
    });
};
