"use client";
import { useDebounce, useLocalStorage } from "react-use";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import React from "react";
import ModalCookiePolicy from "@/components/Modal/ModalCookiePolicy";

export default function CookiePolicy() {
  const [stoVal, setStoval] = useLocalStorage<any>("cookie-policy", false);
  const { updateModal, handleCloseModal } = React.useContext(ModalContext);

  const onAccept = () => {
    setStoval(true);
    handleCloseModal();
  };
  const onReject = () => {
    handleCloseModal();
  };
  useDebounce(() => {
    if (!stoVal)
      updateModal(
        "cookie-policy",
        <ModalCookiePolicy onAccept={onAccept} onReject={onReject} />
      );
  }, 10000);

  return <></>;
}
