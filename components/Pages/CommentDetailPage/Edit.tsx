"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { postForumAPI } from "@/apis/forum_apis";
import { Form, Input } from "antd";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { ItemCommentModel } from "@/models/comment_model";
import { updateComment, updateSubComment } from "@/reducers/commentsSlice";
import { store } from "@/store";
import { FORUM_API_EDIT_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import ModalDelete from "@/components/Modal/ModalDelete";
import { ModalContext } from "@/context/ModalContext/ModalContext";

interface ModalEditProps {
  handleEvent?: () => void;
  data: ItemCommentModel;
  type: "comment" | "subcomment";
}

export default React.memo(function ModalEdit({
  data,
  type = "comment",
}: ModalEditProps) {
  const { updateModal } = React.useContext(ModalContext);
  const theme: any = useTheme();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const breadcrumbs = [
    {
      label: data.topic
        ? `Bài viết #${data.topic.code}`
        : `Trận đấu #${data.match.code}`,
      href: data.url,
    },
    {
      label: `Bình luận #${data.code}`,
      href: data.url,
    },
    {
      label: "Biên tập",
    },
  ];

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
          router.push(`/binh-luan/${data?.parent?.code || data.code}`);
        }, 500);
      });
  }, []);

  const onClose = () => {
    router.back();
  };

  const onDeleteComment = () => {
    updateModal(
      `${data?.code}-report`,
      <ModalDelete handleEvent={onConfirmDeleteComment} />
    );
  };

  const onConfirmDeleteComment = () => {
    postForumAPI(FORUM_API_EDIT_COMMENT, {
      code: data.code,
      content: data.contentMd,
      delete: "yes",
    })
      .then((r) => {
        toast.success("Xóa bình luận thành công");
        router.push(data?.topic?.url || data?.match?.url);
      })
      .catch((e) => {
        toast.error("Xóa bình luận thất bại");
      });
  };

  return (
    <Box>
      <BreadCrumbCustom data={breadcrumbs} />
      <Typography variant="h6" component={"h1"} p={1}>
        Chỉnh sửa nội dung bình luận #{data.code}
      </Typography>
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
        <DialogActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Button
            className="text-red-400"
            variant="outlined"
            onClick={onDeleteComment}
            color="inherit"
          >
            Xóa
          </Button>
          {loading ? (
            <LoadingButton variant="outlined" loading>
              Cập nhật
            </LoadingButton>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                className="text-gray-400"
                variant="text"
                onClick={onClose}
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
    </Box>
  );
});
