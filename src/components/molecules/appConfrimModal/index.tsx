"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { AppButton } from "../appButton";
import Exclamation from "../../../../public/svg/exclamation-circle.svg";

type AppConfrimModalProps = {
  buttonTitles: Array<string>;
  message: string;
};

const customTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full ",
    show: {
      on: "flex bg-gray-900 bg-opacity-30",
      off: "hidden",
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start",
    },
  },
  content: {
    base: "relative h-full w-full p-6 md:h-auto !text-subtitle-16",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-sm !bg-light-primary-surface-default-subtle gap-5 text-light-primary-text-subtitle !text-subtitle-16",
  },
  body: {
    base: "self-center overflow-auto p-6 !bg-light-primary-surface-default-subtle !text-subtitle-16",
    popup: "pt-0",
  },
  header: {
    base: "flex w-full items-center justify-between rounded-sm border-b p-5 ",
    popup: "border-b-0 p-2",
    title: "text-light-primary-text-title text-title-18 w-full",
    close: {
      base: "ml-auto inline-flex items-center rounded-sm bg-transparent p-1.5 !text-title-18 !text-light-primary-text-title",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center gap-3 rounded-sm p-6",
    popup: "border-t",
  },
};

const AppConfrimModal: React.FC<AppConfrimModalProps> = (props) => {
  const [openConfrimModal, setOpenConfrimModal] = useState(false);

  return (
    <>
      <Modal
        theme={customTheme}
        show={openConfrimModal}
        size="md"
        onClose={() => setOpenConfrimModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center flex flex-col items-center gap-4">
            <Exclamation />
            <h3 className="mb-5">{props.message}</h3>
            <div className="flex justify-center gap-4">
              {props.buttonTitles.map((item, index) => (
                <AppButton
                  key={index}
                  text={item}
                  variant={index % 2 === 0 ? "failure" : "primary"}
                  outline={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppConfrimModal;
