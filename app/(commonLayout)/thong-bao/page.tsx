import NotifacationPage from "@/components/Pages/NotificationPage";
import { Metadata } from "next";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import { getNotificationsListAPI } from "@/apis/user_fetch_apis";

export const metadata: Metadata = {
  title: `Thông Báo Bóng Đá - ${BRAND_NAME}`,
  description: `Thông báo của người dùng`,
};

const NotificationPage = async () => {
  const notifications = await getNotificationsListAPI();
  if (!notifications) return notFound();
  return <NotifacationPage notifications={notifications} />;
};

export default NotificationPage;
