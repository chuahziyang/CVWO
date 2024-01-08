import { axios } from "./axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDUxNzc0MDd9.0nrmUHZbOcWwDKCtDumq2bgmvH_gqpSVsVLOkOjqf2c";

export const newComment = ({
  content,
  post_id,
}: {
  content: string;
  post_id: number;
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
