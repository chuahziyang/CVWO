import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useRef } from "react";

export const Modal = ({
  children,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom=""
          enterTo="backdrop-blur-sm"
          leave="ease-in duration-200"
          leaveFrom="backdrop-blur-sm"
          leaveTo=""
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 sm:scale-100"
              leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
