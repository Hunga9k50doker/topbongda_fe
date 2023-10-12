import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { postForumAPI } from "@/apis/forum_apis";
import { Form, Input } from "antd";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { ItemCommentModel } from "@/models/comment_model";
import { updateComment, updateSubComment } from "@/reducers/commentsSlice";
import { store } from "@/store";
import { FORUM_API_EDIT_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { useTheme } from "@mui/material/styles";
import { Modal } from "antd";

interface ModalEditProps {
  handleEvent?: () => void;
  data: ItemCommentModel;
  type: "comment" | "subcomment";
}

export default React.memo(function ModalEdit({
  data,
  type = "comment",
}: ModalEditProps) {
  const theme: any = useTheme();
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const handleFinish = React.useCallback((values: any) => {
    setLoading(true);
    const p = {
      ...values,
      code: data.code,
    };
    postForumAPI(FORUM_API_EDIT_COMMENT, p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          toast.success("Chỉnh sửa bình luận thành công!");
          store.dispatch(
            type == "comment"
              ? updateComment({
                  ...data,
                  contentMd: values.content,
                  editedAt: new Date().toISOString(),
                })
              : updateSubComment({
                  ...data,
                  contentMd: values.content,
                  editedAt: new Date().toISOString(),
                })
          );
        } else {
          toast.error(d.msg);
          setLoading(false);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          handleCloseModal();
        }, 500);
      });
  }, []);

  return (
    <Modal
      title="Chỉnh sửa nội dung"
      open={isOpenModal}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form
        size="large"
        name={`edit-comment-${data.code}`}
        onFinish={handleFinish}
        form={form}
        initialValues={{
          content: data.contentMd,
        }}
      >
        <DialogContent
          sx={{
            pt: 0,
            "& .ant-input-data-count": {
              color: "#9ca3af",
            },
          }}
        >
          <Form.Item
            style={{ marginBottom: "8px" }}
            name="content"
            rules={[{ required: true, message: "Trường này là bắt buộc." }]}
          >
            <Input.TextArea
              autoFocus
              className="border-gray-400 hover:border-green-500 focus:border-green-500"
              placeholder={"Nội dung trả lời..."}
              showCount
              rows={5}
              maxLength={200}
              classNames={{
                textarea: `placeholder:text-gray-400`,
                count: `text-gray-400`,
              }}
              styles={{
                textarea: {
                  backgroundColor: theme.palette.custom.bgInput,
                  color: theme.palette.text.primary,
                },
              }}
            />
          </Form.Item>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton variant="outlined" loading>
              Cập nhật
            </LoadingButton>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                className="text-gray-400"
                variant="text"
                onClick={handleCloseModal}
                color="inherit"
              >
                Hủy bỏ
              </Button>
              <Button variant="outlined" type="submit">
                Cập nhật
              </Button>
            </div>
          )}
        </DialogActions>
      </Form>
    </Modal>
  );
});
