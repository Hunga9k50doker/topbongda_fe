import * as React from "react";
import { Drawer } from "antd";
import { Form, Input, Button } from "antd";
import { checkVerifyEmailAPI } from "@/apis/user_apis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { USER_API_RECOVER } from "@/configs/endpoints/user_endpoints";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Typography } from "@mui/material";

interface ModalVerifyEmailProps {}

export default React.memo(function ModalVerifyEmail({}: ModalVerifyEmailProps) {
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish = (values: any) => {
    setIsLoading(true);
    checkVerifyEmailAPI(values)
      .then((r) => {
        if (r.data.ok) {
          window.location.reload();
        }
        toast.success(r.data.msg);

        // store.dispatch({
      })
      .catch((e) => {
        toast.error(e.msg);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const router = useRouter();

  return (
    <Drawer
      title="Xác thực email"
      onClose={handleCloseModal}
      open={isOpenModal}
      bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
      placement="bottom"
      zIndex={10000}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Mã xác thực"
          name="code"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "green" }}
          >
            Gửi
          </Button>
        </Form.Item>
        <Typography fontSize={"small"} className="text-gray-400">
          (*) Kiểm tra mã xác thực trong email của bạn. Để ý mục spam email!
        </Typography>
      </Form>
    </Drawer>
  );
});
