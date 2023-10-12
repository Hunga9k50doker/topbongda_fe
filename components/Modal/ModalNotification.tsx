import * as React from "react";
import { Button, Form, Drawer } from "antd";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { getMySettingsAPI, updateSettingsAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import useSWR from "swr";
import { USER_API_GET_SETTING } from "@/configs/endpoints/user_endpoints";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import { isEmpty } from "lodash";
interface ModalNotificationProps {}

export default React.memo(
  function ModalNotification({}: ModalNotificationProps) {
    const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState(false);

    const { data: notificationSetting } = useSWR(
      USER_API_GET_SETTING,
      () =>
        getMySettingsAPI()
          .then((r) => r.data.data)
          .catch((error) => {}),
      {
        revalidateOnFocus: false,
      }
    );

    const onFinish = (values: any) => {
      setIsLoading(true);
      updateSettingsAPI(values)
        .then((r) => {
          if (r.data.ok) {
            toast.success(r.data.msg);
            handleCloseModal();
          } else {
            toast.warning(r.data.msg);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.msg);
          setIsLoading(false);
        });
    };

    return (
      <Drawer
        title="Cài đặt thông báo"
        onClose={handleCloseModal}
        open={isOpenModal}
        bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
        placement="bottom"
        zIndex={1000}
        extra={
          <>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "green" }}
              onClick={() => form.submit()}
            >
              Cập nhật
            </Button>
          </>
        }
      >
        {!isEmpty(notificationSetting) && (
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            initialValues={notificationSetting}
          >
            {Object.entries(notificationSetting).map((item, key) => (
              <Form.Item
                key={key}
                name={item[0]}
                valuePropName="checked"
                className="m-0"
              >
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary={renderContent(item[0]).title} />
                  {/* @ts-ignore */}
                  <Switch edge="end" defaultChecked={item[1]} />
                </ListItem>
              </Form.Item>
            ))}
          </Form>
        )}
      </Drawer>
    );
  }
);

const renderContent = (title: string) => {
  switch (title) {
    case "isNotifyFollowMatch":
      return {
        title: "Thông báo theo dõi trận đấu",
      };
    case "isNotifyFollowTeam":
      return { title: "Thông báo theo dõi đội bóng" };
    case "isNotifyFavoriteTeam":
      return { title: "Thông báo đội bóng yêu thích" };
    case "isNotifyComment":
      return { title: "Thông báo bình luận" };
    case "isNotifyGoals":
      return { title: "Thông báo bàn thắng" };
    case "isNotifyRedCard":
      return { title: "Thông báo thẻ đỏ" };
    default:
      return {
        title: title,
      };
  }
};
