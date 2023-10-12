"use client";
import React from "react";

interface ModalProviderProps {
  isOpenModal: boolean;
  updateModal: (name: string, modal?: React.ReactNode) => void;
  handleCloseModals: () => void;
  handleCloseModal: () => void;
}

export const ModalContext = React.createContext<ModalProviderProps>({
  isOpenModal: false,
  updateModal: () => {},
  handleCloseModals: () => {},
  handleCloseModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [modals, setModals] = React.useState<React.ReactNode[]>([]);
  const [modalName, setModalName] = React.useState<string[]>([]);
  let timer: any = null;

  //close all modal
  const handleCloseModals = () => {
    setIsOpenModal(false);
    timer = setTimeout(() => {
      setModalName([]);
      setModals([]);
    }, 300);
  };

  //close one modal
  const handleCloseModal = () => {
    const newModalname = modalName.slice(0, modalName.length - 1);
    const newModals = modals.slice(0, modals.length - 1);
    setModalName(newModalname);
    setModals(newModals);
  };

  //if modalName has name in array, add modal to array modals, else remove modal from array modals
  const updateModal = React.useCallback(
    (name: string, modal?: React.ReactNode) => {
      clearTimeout(timer);
      const index = modalName.findIndex((item) => item === name);
      if (index < 0) {
        //nested modal
        setIsOpenModal(true);
        setModals((pre) => [...pre, modal]);
        setModalName((pre) => [...pre, name]);
      } else {
        setModals([...modals.filter((item, idx) => idx !== index)]);
        setModalName([...modalName.filter((item, idx) => idx !== index)]);
      }
    },
    [modalName, modals]
  );

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        updateModal,
        handleCloseModals,
        handleCloseModal,
      }}
    >
      {modals.length > 0 &&
        modals.map((modal, index) => (
          <React.Fragment key={index}>{modal}</React.Fragment>
        ))}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
