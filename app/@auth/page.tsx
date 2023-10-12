import Auth from "@/components/Auth";
import { getMyProfileAPI } from "@/apis/user_fetch_apis";

export default async function AuthPage() {
  const userData = await getMyProfileAPI({
    cache: "no-cache",
  });
  return (
    <>
      <Auth userData={userData} />
    </>
  );
}
