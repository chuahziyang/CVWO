import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
//@ts-ignore
import { useMutation } from "@tanstack/react-query";
//@ts-ignore
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { archivePostauth, deletePostauth } from "../server/posts";
import { images } from "../types/imagedata";
import { Categories } from "../types/posts";
//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({
  content,
  date,
  author,
  authorid,
  category,
  title,
  postid,
}: {
  content: string;
  author: string;
  date: Date;
  authorid: number;
  title: string;
  category: Categories;
  postid: number;
}) {
  const [cookie] = useCookies(["token"]);
  console.log(cookie.token);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["deletepost"],
    mutationFn: deletePostauth,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setiserror(true);
    },
  });

  const archivemutation = useMutation({
    mutationKey: ["archivepost"],
    mutationFn: archivePostauth,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setiserror(true);
    },
  });

  console.log(postid);
  const deletepost = () => {
    console.log("asdasd");
    mutation.mutate({
      id: postid,
      token: cookie.token,
    });
  };

  const archivepost = () => {
    console.log(postid);
    console.log(cookie.token);
    archivemutation.mutate({
      id: postid,
      token: cookie.token,
    });
  };

  const [iserror, setiserror] = useState(false);

  return (
    <>
      {iserror && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            /> */}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Error: Unauthorized, this is not your post!
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setiserror(false)}
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
      )}
      <div className="px-8 mt-6">
        <div>
          <nav className="sm:hidden" aria-label="Back">
            <a
              href="/"
              className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              <ChevronLeftIcon
                className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-500"
                aria-hidden="true"
              />
              Back
            </a>
          </nav>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div className="flex items-center">
                  <a
                    href="/"
                    className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                  >
                    {category}
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-500"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    aria-current="page"
                    className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
                  >
                    {title}
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              {title}
            </h2>
          </div>
          {/* <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
            >
              Edit
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Publish
            </button>
          </div> */}
        </div>
      </div>
      <div className=" px-4 py-5 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={images[authorid]}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-100">
              <span className="truncate">
                {author}
                {`  `}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              <a href="#" className="hover:underline">
                {date.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </a>
            </p>
            <p className="text-white">{content}</p>
          </div>
          <div className="flex flex-shrink-0 self-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
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
                          onClick={archivepost}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm"
                          )}
                        >
                          <CheckIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Archive Post</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={deletepost}
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
                          <span>Delete Post</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
