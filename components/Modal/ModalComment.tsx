import * as React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Box } from "@mui/material";
import { Drawer } from "antd";
import { styled } from "@mui/material/styles";
import WrapComments from "@/components/common/WrapComments";
import { TopicDetailModel } from "@/models/topic_model";
import { FloatButton } from "antd";
import ModalCreateComment from "@/components/Modal/ModalCreateComment";
import { FormOutlined } from "@ant-design/icons";
import { numberFormatter } from "@/utils";
interface ModalCommentProps {
  data: TopicDetailModel;
}

export default React.memo(function ModalComment({ data }: ModalCommentProps) {
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);

  const onComment = () => {
    updateModal("modal-create-comment", <ModalCreateComment data={data} />);
  };
  return (
    <Drawer
      title={`Bình luận ${
        data.numComments > 0
          ? "(" + numberFormatter(data.numComments) + ")"
          : ""
      }`}
      placement="bottom"
      open={isOpenModal}
      height={"90vh"}
      onClose={handleCloseModal}
      headerStyle={{ padding: "auto 8px" }}
      bodyStyle={{ padding: 0, paddingBottom: 80 }}
      size="large"
    >
      <NewStyle>
        <WrapComments type="topic" code={data.code} data={data} />
      </NewStyle>
      <FloatButton icon={<FormOutlined />} onClick={onComment} />
    </Drawer>
  );
});

const NewStyle = styled(Box)(({ theme }) => ({
  "&": {
    marginTop: "16px",
    color: theme.palette.text.primary,
  },
  "& .option-sort": {
    display: "none",
  },
  "& .form-create-comment": {
    display: "none",
  },
  "& .MuiDivider-root": {
    display: "none",
  },
  "& .wrap-title": {
    display: "none",
  },
}));
