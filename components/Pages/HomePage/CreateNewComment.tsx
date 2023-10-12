import React from "react";
import { useSelector } from "react-redux";
import { postForumAPI } from "@/apis/forum_apis";
import { Form, Input } from "antd";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Stack, Button } from "@mui/material";
import { FORUM_API_CREATE_NEW_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { RootState } from "@/store";
import AvatarCustom from "@/components/common/AvatarCustom";
import ModalAuth from "@/components/Modal/ModalAuth";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { useTheme } from "@mui/material/styles";
import CustomLink from "@/components/common/CustomLink";
interface CreateNewCommentProps {
  type: "topic" | "match" | "story";
  code: string;
  parent?: any;
  callBack?: () => void;
}

export default React.memo(function CreateNewComment({
  type,
  code,
  parent,
  callBack,
  ...props
}: CreateNewCommentProps) {
  const theme: any = useTheme();
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const { childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );
  const { updateModal } = React.useContext(ModalContext);
  const parentCode = parent?.code;
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
        ...values,
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
          } else {
            toast.error(d.msg);
            setLoading(false);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
            callBack && callBack();
          }, 500);
        })
        .catch((reason) => {
          setLoading(false);
        });
    },
    [userStore.username, code, parentCode, childrenComments, params]
  );

  const onKeyUp = (e: any) => {
    if (e.key === "Enter") form.submit();
  };

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      className="relative mb-4 form-create-comment"
    >
      <Stack sx={{ mt: 2 }} gap={1.5}>
        <Stack direction="row" gap={1}>
          <CustomLink href={userStore.url}>
            <AvatarCustom
              // @ts-ignore
              data={userStore}
              style={{ width: 40, height: 40 }}
            />
          </CustomLink>
          <Stack flex={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Form.Item
              className="w-full"
              style={{ marginBottom: "8px" }}
              name={`content`}
              rules={[{ required: true, message: "Trường này là bắt buộc." }]}
            >
              <Input.TextArea
                // autoFocus
                onKeyUp={onKeyUp}
                tabIndex={-1}
                className="border-gray-400 hover:border-green-500 focus:border-green-500"
                placeholder={"Thêm bình luận..."}
                showCount
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={200}
                ref={txtRef}
                classNames={{
                  textarea: `placeholder:text-gray-400`,
                }}
                styles={{
                  textarea: {
                    backgroundColor: theme.palette.custom.bgInput,
                    color: theme.palette.text.primary,
                  },
                  count: {
                    color: theme.palette.text.secondary,
                  },
                }}
              />
            </Form.Item>
          </Stack>
        </Stack>
        <Stack alignItems={"flex-end"}>
          {loading ? (
            <LoadingButton loading>Đăng</LoadingButton>
          ) : (
            <Button
              id={`button-submit-create-new-comment`}
              type="submit"
              variant="outlined"
            >
              <b className="text-xs">Đăng</b>
            </Button>
          )}
        </Stack>
      </Stack>
    </Form>
  );
});
