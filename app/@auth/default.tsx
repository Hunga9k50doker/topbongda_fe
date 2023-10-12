import { getMyProfileAPI } from "@/apis/user_fetch_apis";
import Auth from "@/components/Auth";

export default async function Default() {
  const userData = await getMyProfileAPI({
    cache: "no-cache",
  });
  return (
    <>
      <Auth userData={userData} />
    </>
  );
}
