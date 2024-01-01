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
import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Shell from "../components/shell";
import { getPosts } from "../server/posts";
import { Categories, postOverview } from "../types/posts";
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
  const [searchTerm, setSearchTerm] = useState("");

  const [posts, setPosts] = useState<postOverview[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categories, setCategories] = useState(
    Object.values(Categories).map((category, index) => ({
      id: index + 1,
      name: category,
      value: true,
    }))
  );

  const tick = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, value: !category.value } : category
      )
    );
  };

  // console.log(categories2);

  const query = useQuery({
    queryKey: ["post"],
    queryFn: getPosts(),
  });
  //get data from api
  return (
    <>
      <Shell isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
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
              {/* Sort dropdown */}
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                  <Dialog.Panel className="w-full max-w-sm rounded bg-white">
                    <fieldset className="m-8">
                      <legend className="text-base font-semibold leading-6 text-gray-900">
                        Topics
                      </legend>
                      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                        {categories.map((person, personIdx) => (
                          <div
                            key={personIdx}
                            className="relative flex items-start py-4"
                          >
                            <div className="min-w-0 flex-1 text-sm leading-6">
                              <label
                                htmlFor={`person-${person.id}`}
                                className="select-none font-medium text-gray-900"
                              >
                                {person.name}
                              </label>
                            </div>
                            <div className="ml-3 flex h-6 items-center">
                              <input
                                id={`person-${person.id}`}
                                name={`person-${person.id}`}
                                checked={person.value}
                                onClick={() => tick(person.id)}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </Dialog.Panel>
                </div>
              </Dialog>

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white"
              >
                Sort by
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </button>
              {/* <Menu as="div" className="relative">
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
                  <Listbox>
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    person.online
                                      ? "bg-green-400"
                                      : "bg-gray-200",
                                    "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                                  )}
                                  aria-hidden="true"
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.name}
                                  <span className="sr-only">
                                    {" "}
                                    is {person.online ? "online" : "offline"}
                                  </span>
                                </span>
                              </div>
                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </Transition>
              </Menu> */}
            </header>

            {/* post list */}
            <ul role="list" className="divide-y divide-white/5">
              {query.isSuccess
                ? query.data
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
                    .filter((post) => {
                      return categories
                        .filter((category) => category.value)
                        .map((category) => category.name)
                        .includes(post.category);
                    })
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
                    ))
                : null}
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
