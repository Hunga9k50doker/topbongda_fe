import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { styled } from "@mui/material/styles";
import AuthForm from "@/components/Pages/AccountPage/AuthForm";
import { useEffectOnce } from "react-use";

interface ModalAuthProps {
  callBack?: Function;
}

export default React.memo(function ModalAuth({ callBack }: ModalAuthProps) {
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
  useEffectOnce(() => {
    localStorage.removeItem("url-search");
  });
  return (
    <DialogCustom fullWidth open={isOpenModal} onClose={handleCloseModal}>
      <AuthForm
        callBack={() => {
          callBack && callBack();
          handleCloseModal();
        }}
      />
    </DialogCustom>
  );
});

const DialogCustom = styled(Dialog)(({ theme }) => ({
  "&": {
    zIndex: theme.zIndex.modal + 10,
  },
}));
