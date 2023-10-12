import * as React from "react";
import { Drawer } from "antd";
import { Form, Input, Button } from "antd";
import { postUsersAPI } from "@/apis/user_apis";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { USER_API_RECOVER } from "@/configs/endpoints/user_endpoints";
import { ModalContext } from "@/context/ModalContext/ModalContext";

interface ModalRecoverByEmailProps {}

export default React.memo(
  function ModalRecoverByEmail({}: ModalRecoverByEmailProps) {
    const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState(false);

    const onFinish = (values: any) => {
      setIsLoading(true);
      postUsersAPI(USER_API_RECOVER, values)
        .then((r) => {
          toast.success(r.data.msg);
          router.push("/tai-khoan/phuc-hoi-tai-khoan/ok/");
        })
        .catch((e) => {
          toast.error(
            "Khôi phục tài khoản thất bại. Kiểm tra lại email đã đăng ký."
          );
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };

    const router = useRouter();

    return (
      <Drawer
        title="Khôi phục tài khoản"
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
            label="Email"
            name="email"
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
        </Form>
      </Drawer>
    );
  }
);
