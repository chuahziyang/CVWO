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
import Shell from "../components/shell";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Categories } from "../types/posts";
import { postOverview } from "../types/posts";

const statuses = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};
const environments = {
  Active: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Closed: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};

// const activityItems = [
//   {
//     user: {
//       name: "Michael Foster",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     category: "ios-app",
//     commit: "2d89f0c8",
//     branch: "main",
//     date: "1h",
//     dateTime: "2023-01-23T11:00",
//   },
//   // More items...
// ];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  //@ts-ignore
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [posts, setPosts] = useState<postOverview[]>([]);

  //get data from api
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) =>
        // setPosts({ ...data, created_at: new Date(data.created_at) })
        setPosts(
          data.map((post) => ({
            ...post,
            created_at: new Date(post.created_at),
          }))
        )
      );
  }, []);

  return (
    <>
      {/* <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your threads
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {threads.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.name.charAt(0)}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Tom Cook</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root> */}

      <Shell>
        <div>
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-white">
                Threads
              </h1>

              {searchTerm}

              {/* Sort dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                  Sort by
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Name
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Date updated
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                        >
                          Environment
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </header>

            {/* post list */}
            <ul role="list" className="divide-y divide-white/5">
              {posts
                .filter(
                  (post) =>
                    post.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    post.category
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    post.environment
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((post) => (
                  <li
                    key={post.id}
                    className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
                  >
                    <div className="min-w-0 flex-auto">
                      <div className="flex items-center gap-x-3">
                        <div
                          className={classNames(
                            statuses[post.status],
                            "flex-none rounded-full p-1"
                          )}
                        >
                          <div className="h-2 w-2 rounded-full bg-current" />
                        </div>
                        <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                          <a
                            href={`/posts/${post.id}`}
                            className="flex gap-x-2"
                          >
                            <span className="truncate">{post.name}</span>
                            <span className="text-gray-400">/</span>
                            <span className="whitespace-nowrap">
                              {post.category}
                            </span>
                            <span className="absolute inset-0" />
                          </a>
                        </h2>
                      </div>
                      <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                        <p className="truncate">{post.description}</p>
                        <svg
                          viewBox="0 0 2 2"
                          className="h-0.5 w-0.5 flex-none fill-gray-300"
                        >
                          <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p className="whitespace-nowrap">
                          {post.created_at.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        environments[post.environment],
                        "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                      )}
                    >
                      {post.environment}
                    </div>
                    <ChevronRightIcon
                      className="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                  </li>
                ))}
            </ul>
          </main>

          {/* Activity feed */}
          {/* <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-white">
                Activity feed
              </h2>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-indigo-400"
              >
                View all
              </a>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {activityItems.map((item) => (
                <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.user.imageUrl}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                      {item.user.name}
                    </h3>
                    <time
                      dateTime={item.dateTime}
                      className="flex-none text-xs text-gray-600"
                    >
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-3 truncate text-sm text-gray-500">
                    Pushed to{" "}
                    <span className="text-gray-400">{item.category}</span> (
                    <span className="font-mono text-gray-400">
                      {item.commit}
                    </span>{" "}
                    on <span className="text-gray-400">{item.branch}</span>)
                  </p>
                </li>
              ))}
            </ul>
          </aside> */}
        </div>
      </Shell>
    </>
  );
}
