import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Form } from "antd";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { postUsersAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { USER_API_UPDATE_PROFILE } from "@/configs/endpoints/user_endpoints";

function PrivateInfoEdit() {
  const [form] = Form.useForm();
  const store = useSelector((state: RootState) => state.userStore.data);
  const [loading, setLoading] = React.useState(false);

  const handleFinish = React.useCallback((values: any) => {
    setLoading(true);
    const p = {
      ...values,
      action: "private-info",
    };
    postUsersAPI(USER_API_UPDATE_PROFILE, p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          toast.success("Cập nhật thành công!");
          window.location.reload();
        } else {
          toast.error(d.msg);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  }, []);

  React.useEffect(() => {
    form.setFieldsValue({
      birthYear: store.birthYear || "",
      phoneNumber: store.phoneNumber,
      email: store.email,
    });
  }, [store]);

  return (
    <Card className="mb-4">
      <CardContent>
        <h2
          className="text-primary font-bold heading-font"
          id="id_private_info"
        >
          Thông tin bí mật
        </h2>

        <Form
          name="form-edit-private-info"
          form={form}
          initialValues={{
            birthYear: store.birthYear || "",
            phoneNumber: store.phoneNumber,
            email: store.email,
          }}
          onFinish={handleFinish}
        >
          <Form.Item style={{ margin: "16px 0" }} name="email">
            <TextField
              label="Email"
              inputProps={{
                length: 4,
                readOnly: Boolean(store.isVerifiedEmail),
              }}
              type="email"
              fullWidth
            />
          </Form.Item>
          <Form.Item style={{ margin: "16px 0" }} name="birthYear">
            <TextField
              label="Năm sinh"
              inputProps={{ length: 4 }}
              type="number"
              fullWidth
            />
          </Form.Item>

          <Form.Item style={{ margin: "16px 0" }} name="phoneNumber">
            <TextField
              label="Số điện thoại liên lạc"
              inputProps={{ maxLength: 10 }}
              type="tel"
              fullWidth
            />
          </Form.Item>

          <div className="mt-4">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="bg-primary hover:bg-success"
            >
              Lưu Thông Tin
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            (*) Thông tin riêng tư chỉ có Admin mới có thể nhìn thấy, chỉ sử
            dụng khi bạn gửi yêu cầu phục hồi tài khoản.
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default React.memo(PrivateInfoEdit);
