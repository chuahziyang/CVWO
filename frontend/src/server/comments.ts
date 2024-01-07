import { axioswithAuth } from "./axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUxNzc0MDd9.0nrmUHZbOcWwDKCtDumq2bgmvH_gqpSVsVLOkOjqf2c";

export const newComment = ({
  content,
  post_id,
}: {
  content: string;
  post_id: number;
}) => {
  return axioswithAuth(token)
    .post("/comments", {
      content,
      post_id,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      return data;
    });
};
