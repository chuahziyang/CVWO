import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { images } from "../types/imagedata";
//@ts-ignore
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../server/posts";

const navigation = [
  { name: "Posts", href: "/", icon: FolderIcon, current: true },
  // { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Shell = ({ children, isOpen, setSidebarOpen }: any) => {
  return (
    <>
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        {newFunction(true)}
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
          // onClose={() => {}}
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

                {newFunction(false)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="xl:pl-72">{children}</div>
    </>
  );
};

export default Shell;

function newFunction(background: boolean) {
  const [cookies, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  console.log(cookies);

  const location = useLocation();
  console.log(location.pathname);
  const query = useQuery({
    queryKey: ["myposts"],
    queryFn: getPosts(),
  });

  return (
    <div
      className={
        background
          ? `flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5`
          : "flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10"
      }
    >
      <div className="flex h-16 shrink-0 items-center">
        <img className="h-8 w-auto" src="/logo.png" alt="Your Company" />
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
              {query.isSuccess &&
                query.data
                  .filter((post) => post.user_id === 1)
                  .map((post) => (
                    <li key={post.id}>
                      <a
                        href={`/posts/${post.id}`}
                        className={classNames(
                          location.pathname === `/posts/${post.id}`
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {post.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="truncate">{post.name}</span>
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
                src={images[cookies?.user?.id]}
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{cookies?.user?.name}</span>
              <button
                onClick={() => {
                  removeCookie("user");
                  removeCookie("token");
                  navigate("/login");
                }}
              >
                {" "}
                Log out
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
