import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { Button, Form } from "antd";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { postUsersAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { Typography } from "@mui/material";
import { USER_API_UPDATE_PROFILE } from "@/configs/endpoints/user_endpoints";

function PublicInfoEdit() {
  const [form] = Form.useForm();
  const store = useSelector((state: RootState) => state.userStore.data);
  const [loading, setLoading] = React.useState(false);

  const handleFinish = React.useCallback((values: any) => {
    setLoading(true);
    const p = {
      ...values,
      action: "public-info",
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
      .catch(() => setLoading(false))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  }, []);

  React.useEffect(() => {
    form.resetFields();
  }, [store.username]);

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="text-primary font-bold heading-font" id="id_public_info">
          Thông tin công khai
        </h2>

        <Form
          name="form-edit-public-info"
          form={form}
          initialValues={{
            name: store.name,
            userTitle: store.userTitle,
            location: store.location,
            facebook: store.facebook,
            twitter: store.twitter,
            tiktok: store.tiktok,
          }}
          onFinish={handleFinish}
        >
          <Form.Item style={{ margin: "16px 0" }} name="name">
            <TextField
              label="Tên hiển thị"
              inputProps={{ maxLength: 50 }}
              fullWidth
            />
          </Form.Item>
          <Form.Item style={{ margin: "16px 0" }} name="userTitle">
            <TextField
              label="Giới thiệu bản thân"
              inputProps={{ maxLength: 200 }}
              fullWidth
              multiline
            />
          </Form.Item>

          <Form.Item style={{ margin: "16px 0" }} name="location">
            <TextField
              label="Địa phương"
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </Form.Item>
          <Form.Item style={{ margin: "16px 0" }} name="facebook">
            <TextField
              label="Facebook"
              inputProps={{ maxLength: 200 }}
              fullWidth
            />
          </Form.Item>
          <Form.Item style={{ margin: "16px 0" }} name="twitter">
            <TextField
              label="Twitter"
              inputProps={{ maxLength: 200 }}
              fullWidth
            />
          </Form.Item>
          <Form.Item style={{ margin: "16px 0" }} name="tiktok">
            <TextField
              label="Tiktok"
              inputProps={{ maxLength: 200 }}
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

          <Typography className="mt-4 text-xs text-gray-400">
            (*) Các trường trên đều là tùy chọn, nếu bạn điền, nó sẽ hiển thị
            ngoài trang cá nhân.
          </Typography>
        </Form>
      </CardContent>
    </Card>
  );
}

export default React.memo(PublicInfoEdit);
