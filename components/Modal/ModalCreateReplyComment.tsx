import React from "react";
import { useSelector } from "react-redux";
import { postForumAPI } from "@/apis/forum_apis";
import { Drawer, Form, Input } from "antd";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Stack, Button, Typography } from "@mui/material";
import { FORUM_API_CREATE_NEW_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { RootState, store } from "@/store";
import { updateSubComments } from "@/reducers/commentsSlice";
import DialogActions from "@mui/material/DialogActions";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalAuth from "@/components/Modal/ModalAuth";
import { useTheme } from "@mui/material/styles";
import { UserModel } from "@/models/user_model";
import CustomLink from "@/components/common/CustomLink";
import { useRouter } from "next/navigation";
interface ModalCreateReplyCommentProps {
  type: "topic" | "match" | "story";
  code: string; // topicCode | matchCode | storyCode
  data: any; // parent comment
  tooltip?: boolean;
  tagUser?: UserModel;
}

export default React.memo(function ModalCreateReplyComment({
  type,
  code,
  data,
  tooltip,
  tagUser,
  ...props
}: ModalCreateReplyCommentProps) {
  const theme: any = useTheme();
  const router = useRouter();
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const { childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const parentCode = data?.code;
  const txtRef: any = React.useRef<HTMLTextAreaElement>();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const params = React.useMemo(() => {
    switch (type) {
      case "topic":
        return { topicCode: code };
      case "story":
        return { storyCode: code };
      case "match":
        return { matchCode: code };
      default:
        return { topicCode: code };
    }
  }, [type]);

  const handleFinish = React.useCallback(
    (values: any) => {
      if (!userStore.isAuth) return updateModal(`modal-auth`, <ModalAuth />);
      setLoading(true);
      const p = {
        content: values.content,
        ...params,
        parentCode,
      };
      postForumAPI(FORUM_API_CREATE_NEW_COMMENT, p)
        .then((r) => {
          const d = r.data;
          if (d.ok) {
            form.resetFields();
            toast.success("Gửi bình luận thành công!", { autoClose: 500 });
            setLoading(false);
            if (!(data?.numComments > 0 && !childrenComments[parentCode])) {
              store.dispatch(
                updateSubComments({
                  [parentCode]: childrenComments[parentCode]
                    ? [d.data, ...childrenComments[parentCode]]
                    : [d.data],
                })
              );
            }
          } else {
            toast.error(d.msg);
            setLoading(false);
          }
        })
        .finally(() => {
          setTimeout(() => {
            handleCloseModal();
            setLoading(false);
          }, 500);
        })
        .catch((reason) => {
          handleCloseModal();
          setLoading(false);
        });
    },
    [userStore.username, code, parentCode, childrenComments, params]
  );

  const onRedirect = (url: string) => {
    handleCloseModal();
    router.push(url);
  };

  const onKeyUp = (e: any) => {
    if (e.key === "Enter") form.submit();
  };

  return (
    <Drawer
      title={
        <Typography display={"inline"}>
          Trả lời bình luận&nbsp;
          <Typography
            component={"span"}
            className="text-primary cursor-pointer"
            onClick={() => onRedirect(data.user.url)}
          >
            @{data?.user?.name}
          </Typography>
        </Typography>
      }
      onClose={handleCloseModal}
      open={isOpenModal}
      bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
      placement="bottom"
      zIndex={theme.zIndex.modal + 2}
    >
      <Form onFinish={handleFinish} form={form}>
        <Stack direction={"row"} sx={{ my: 2 }} gap={1}>
          <Stack
            flex={1}
            justifyContent={"flex-end"}
            alignItems={"flex-start"}
            sx={{
              "& .ant-input-data-count": {
                color: "#9ca3af",
              },
            }}
          >
            <Form.Item
              className="w-full"
              style={{ marginBottom: "8px" }}
              name={`content`}
              rules={[{ required: true, message: "Trường này là bắt buộc." }]}
            >
              <Input.TextArea
                onKeyUp={onKeyUp}
                tabIndex={-1}
                autoFocus
                className="border-gray-400 hover:border-green-500 focus:border-green-500"
                placeholder={"Nội dung trả lời..."}
                showCount
                rows={5}
                maxLength={200}
                ref={txtRef}
                classNames={{
                  textarea: `placeholder:text-gray-400`,
                  count: `text-gray-400`,
                }}
                styles={{
                  textarea: {
                    zIndex: theme.zIndex.modal + 3,
                    backgroundColor: theme.palette.custom.bgInput,
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Form.Item>
          </Stack>
        </Stack>
        {tooltip && (
          <Typography className="mt-4 text-xs text-gray-400">
            (*) Bình luận này sẽ được xem như đang trả lời bình luận cha. Tuy
            nhiên người bạn trả lời&nbsp;
            <CustomLink className="text-primary" href={tagUser?.url || ""}>
              @{tagUser?.name}&nbsp;
            </CustomLink>
            &nbsp; vẫn nhận được thông báo!
          </Typography>
        )}
        <DialogActions>
          {loading ? (
            <LoadingButton variant="outlined" loading>
              Trả lời
            </LoadingButton>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="text"
                onClick={handleCloseModal}
                className="text-gray-400"
              >
                Hủy bỏ
              </Button>
              <Button variant="outlined" type="submit">
                Trả lời
              </Button>
            </div>
          )}
        </DialogActions>
      </Form>
    </Drawer>
  );
});
