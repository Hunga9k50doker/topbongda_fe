import * as React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Modal } from "antd";
import CardMedia from "@mui/material/CardMedia";

interface ModalPreviewProps {
  title?: string;
  imageUrl: string;
}

export default React.memo(function ModalPreview({
  title = "Xem trước",
  imageUrl,
}: ModalPreviewProps) {
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);

  return (
    <Modal
      open={isOpenModal}
      onCancel={handleCloseModal}
      title={title}
      footer={null}
    >
      <CardMedia
        component="img"
        width={"100%"}
        height={"auto"}
        src={imageUrl}
        alt={imageUrl}
      />
    </Modal>
  );
});
