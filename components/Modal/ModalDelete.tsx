import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
interface ModalDeleteProps {
  handleEvent?: () => void;
}

export default React.memo(function ModalDelete({
  handleEvent,
}: ModalDeleteProps) {
  const id = React.useId();
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);

  const handleCofirmDelete = () => {
    handleEvent && handleEvent();
    handleCloseModal();
  };

  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>Tiếp tục xóa?</DialogTitle>
      <DialogContent>
        <DialogContentText className="text-center">
          <WarningAmberOutlinedIcon color="warning" />
          Thao tác này sẽ không thể không phục!{" "}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCofirmDelete} color="error">
          Xóa
        </Button>
        <Button onClick={handleCloseModal} autoFocus>
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
});
