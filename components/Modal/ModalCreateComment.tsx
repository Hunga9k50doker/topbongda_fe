import * as React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Drawer } from "antd";
import { styled, useTheme } from "@mui/material/styles";
import CreateNewComment from "@/components/Pages/HomePage/CreateNewComment";

interface ModalCommentProps {
  data: any; //topic, match, news;
}

export default React.memo(function ModalCreateComment({
  data,
}: ModalCommentProps) {
  const theme: any = useTheme();
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);

  return (
    <Drawer
      title="Thêm bình luận"
      onClose={handleCloseModal}
      open={isOpenModal}
      bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
      placement="bottom"
      zIndex={theme.zIndex.drawer + 1}
    >
      <NewStyle>
        <CreateNewComment
          type={"topic"}
          code={data.code}
          callBack={handleCloseModal}
        />
      </NewStyle>
    </Drawer>
  );
});

const NewStyle = styled("div")`
  .avatar_create_comment {
    display: none;
  }
  textarea {
    min-height: 120px !important;
  }
`;
