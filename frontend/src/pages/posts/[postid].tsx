import { XMarkIcon } from "@heroicons/react/20/solid";
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
import { useParams } from "react-router-dom";
import Comment from "../../components/comments";
import Notfound from "../../components/notfound";
import Postarea from "../../components/postarea";
import Shell from "../../components/shell";
import { getPost } from "../../server/posts";
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { postid } = useParams() as { postid: string };

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
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
