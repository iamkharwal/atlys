import * as React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { RxCross2 } from "react-icons/rx";

type ModalProps = React.PropsWithChildren<{
  show: boolean;
  onClose(): void;
  closeOnClickOutside?: boolean;
}>;

export function Modal({
  show,
  onClose,
  children,
  closeOnClickOutside = false,
}: ModalProps) {
  const appRoot = global.document.getElementsByTagName("BODY")[0];
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={300}
      unmountOnExit
      classNames={{
        enter: ".popup-enter",
        enterActive: ".popup-enter-active",
        enterDone: ".popup-enter-done",
        exit: ".popup-exit",
        exitActive: ".popup-exit-active",
      }}
    >
      <div
        className="root fixed left-0 z-50 top-0 w-screen h-screen flex items-center justify-center backdrop-blur-md "
        onClick={(event) => {
          event.stopPropagation();
          if (closeOnClickOutside) onClose();
        }}
      >
        <div className={`relative z-9`}>
          <div
            className="absolute z-10 right-[16px] top-[24px] bg-[#131319] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer"
            onClick={onClose}
          >
            <RxCross2 width={16} height={16} color="fff" />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>,
    appRoot,
  );
}
