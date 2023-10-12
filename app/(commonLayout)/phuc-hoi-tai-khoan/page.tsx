import RecoverAccount from "@/components/Pages/RecoverPage";
import { BRAND_NAME } from "@/constants";
import { buildFullUrl } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Đăng Nhập/Đăng Ký - ${BRAND_NAME}`,
  description: "Nơi đăng ký tài khoản dễ dàng thảo luận và kết nối.",
  alternates: {
    canonical: buildFullUrl("/tai-khoan/phuc-hoi-tai-khoan/"),
  },
};
function RecoverAccountPage() {
  return <RecoverAccount />;
}

export default RecoverAccountPage;
