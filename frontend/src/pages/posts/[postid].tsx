/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/comments";
import Notfound from "../../components/notfound";
import Postarea from "../../components/postarea";
import Shell from "../../components/shell";
import { getPost } from "../../server/posts";
//@ts-ignore
import { useCookies } from "react-cookie";
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { postid } = useParams() as { postid: string };

  const [cookies] = useCookies(["name"]);
  const navigate = useNavigate();

  if (!cookies.token) {
    navigate("/login");
  }
  const query = useQuery({
    queryKey: ["post"],
    queryFn: getPost(postid),
  });

  return (
    <>
      <Shell isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {query.isSuccess && (
          <>
            {query.data.environment === "Closed" && topalert()}
            <Postarea
              category={query.data.category}
              content={query.data.content}
              date={query.data.created_at}
              author={query.data.user.name}
              authorid={query.data.user.id}
              title={query.data.name}
              postid={query.data.id}
            ></Postarea>
            {query.data.environment === "Active" && (
              <Comment
                postid={parseInt(postid)}
                comments={query.data.comments}
              ></Comment>
            )}
          </>
        )}
        {query.isError && <Notfound></Notfound>}
      </Shell>
    </>
  );
}

function topalert() {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">
            This post has been closed by its owner. You are not allowed to
            comment on it.
          </p>
        </div>
        <div className="ml-auto pl-3"></div>
      </div>
    </div>
  );
}
