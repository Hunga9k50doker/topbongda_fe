import * as React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { changePasswordAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { Drawer, Button, Form, Input } from "antd";
import { deleteCookies } from "@/utils";
interface ModalChangePasswordProps {}

export default React.memo(
  function ModalChangePassword({}: ModalChangePasswordProps) {
    const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
    const [isLoading, setIsLoading] = React.useState(false);
    const onFinish = (values: any) => {
      setIsLoading(true);
      changePasswordAPI(values)
        .then((r) => {
          if (r.data.ok) {
            toast.success("Đổi mật khẩu thành công!");
            handleCloseModal();
            deleteCookies("jwt");
            window.location.reload();
          } else {
            toast.warning(r.data.msg);
          }
        })
        .catch((error) => {
          toast.error(error.msg);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    return (
      <Drawer
        title="Thay đổi mật khẩu"
        onClose={handleCloseModal}
        open={isOpenModal}
        bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
        placement="bottom"
        zIndex={10000}
        // size="large"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="old_password"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="new_password"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="new_password_confirm"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "green" }}
            >
              Xác nhận thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
);
