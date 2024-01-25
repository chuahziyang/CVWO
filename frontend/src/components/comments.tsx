import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
//@ts-ignore
import { useCookies } from "react-cookie";
import {
  deleteCommentauth,
  newCommentauth,
  updateCommentauth,
} from "../server/comments";
import { images } from "../types/imagedata";
import { Comment } from "../types/posts";

import { TrashIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { Modal } from "../components/modal";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const commentBlock = (comments: Comment[]) => {
  const queryClient = useQueryClient();
  const [cookie] = useCookies(["token"]);
  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentauth,
    onSuccess: () => {
      console.log("asdasd");
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: updateCommentauth,
    onSuccess: () => {
      console.log("asdasd");
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  const updateComment = (id: number) => () => {
    editCommentMutation.mutate({
      id,
      token: cookie.token,
      content: changecomment,
    });
  };

  const deleteComment = (id: number) => () => {
    deleteCommentMutation.mutate({
      id,
      token: cookie.token,
    });
  };

  const [changecommentOpen, setChangecommentOpen] = useState(false);
  const [changecomment, setChangecomment] = useState("");
  const [commentid, setCommentid] = useState(0);
  return (
    <>
      <Modal open={changecommentOpen} setOpen={setChangecommentOpen}>
        <form className="m-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Edit Your Comment
            </h2>
          </div>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={changecomment}
              onChange={(e) => {
                setChangecomment(e.target.value);
              }}
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          {/* {showError && ErrorMessage()} */}
          <button
            onClick={(e) => {
              console.log("asdasd");
              e.preventDefault();
              updateComment(commentid)();
              setChangecommentOpen(false);
              queryClient.invalidateQueries({
                queryKey: ["post"],
              });
            }}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Post comment
          </button>
        </form>
      </Modal>
      {comments.map((comment) => {
        return (
          <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={images[comment.user_id]}
                    alt="Helene Engels"
                  ></img>
                  {comment.user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <time>{moment(comment.created_at).fromNow()}</time>
                </p>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={deleteComment(comment.id)}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                          >
                            <TrashIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Delete Comment</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              setChangecommentOpen(true);
                              setChangecomment(comment.content);
                              setCommentid(comment.id);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                          >
                            <TrashIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>Edit Comment</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <div
                id="dropdownComment3"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment.content}
            </p>
          </article>
        );
      })}
    </>
  );
};
export default function Example({
  comments,
  postid,
}: {
  comments: Comment[];
  postid: number;
}) {
  console.log(comments);

  const [newcomment, setNewcomment] = useState("");

  const [showError, setShowError] = useState(false);

  const [cookie] = useCookies(["token"]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newCommentauth,
    onSuccess: () => {
      console.log("asdasd");
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newcomment === "") {
      setShowError(true);
      return;
    }

    mutation.mutate({
      content: newcomment,
      token: cookie.token,
      post_id: postid,
    });
    setNewcomment("");
    setShowError(false);
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h2>
      </div>
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            value={newcomment}
            onChange={(e) => {
              setNewcomment(e.target.value);
            }}
            id="comment"
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        {showError && ErrorMessage()}
        <button
          onClick={handleSubmit}
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Post comment
        </button>
      </form>
      {commentBlock(comments)}
    </div>
  );
}

const ErrorMessage = () => {
  return (
    <div className="rounded-md bg-red-50 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There were an error with your comment
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              <li>Comment must not be empty</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
