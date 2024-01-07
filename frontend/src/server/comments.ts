import axios from "./axios";

export const newComment = ({
  content,
  user_id,
  post_id,
}: {
  content: string;
  user_id: number;
  post_id: number;
}) => {
  return axios
    .post("/comments", {
      content,
      user_id,
      post_id,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      return data;
    });
};
