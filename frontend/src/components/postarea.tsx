import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
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
}: {
  content: string;
  author: string;
  date: Date;
  authorid: number;
  category: Categories;
}) {
  return (
    <div className="bg-gray-900 px-4 py-5 sm:px-6">
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
            <span className="text-gray-400">/</span>
            <span className="whitespace-nowrap">
              {`  `}
              {category}
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
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                      <a
                        href="#"
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
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
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
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
