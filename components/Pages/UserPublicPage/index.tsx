"use client";
import React from "react";
import { numberWithCommas } from "@/utils";
import { UserModel } from "@/models/user_model";
import InfoUser from "@/components/Pages/UserPublicPage/InfoUser";
import UserTopicsList from "@/components/Pages/UserPublicPage/UserTopicsList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TopicDataModel } from "@/models/topic_model";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { USER_TABS } from "@/configs/constants";
import { Tabs } from "@mui/material";
import { useParams } from "next/navigation";
import Link from "next/link";
import Report from "@/components/Pages/UserPublicPage/Report";
interface UserPublicPageProps {
  publicProfile: UserModel;
  topicsData?: TopicDataModel;
  userCode: string;
}

function UserPublicPageContent({
  publicProfile,
  topicsData,
  userCode,
  ...props
}: UserPublicPageProps) {
  const { tab } = useParams();
  const { data } = useSelector((state: RootState) => state.userStore);
  const value = tab || USER_TABS.TONG_QUAN;
  if (!publicProfile) return <p>Không tìm thấy dữ liệu</p>;
  return (
    <Box className="pb-12">
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
        <Tabs value={value} aria-label="lab API tabs example">
          <TabLink label="Thông tin chung" value={USER_TABS.TONG_QUAN} />
          <TabLink
            label={`Bài Viết Diễn Đàn (${numberWithCommas(
              userCode === data.code ? data.numTopics : publicProfile.numTopics
            )})`}
            value={USER_TABS.BAI_VIET}
          />
        </Tabs>
      </Box>
      {value === USER_TABS.TONG_QUAN && (
        <InfoUser publicProfile={publicProfile} />
      )}
      {value === USER_TABS.BAI_VIET && topicsData && (
        <UserTopicsList userCode={userCode} topicsData={topicsData} />
      )}
      {value === USER_TABS.BAO_CAO && <Report data={publicProfile} />}
    </Box>
  );
}

export default UserPublicPageContent;

const TabLink = ({ label, value }: { label: string; value: string }) => {
  const { userCode } = useParams();
  //@ts-ignore
  const newUserCode = userCode?.replace("%40", "@");
  return (
    <Tab
      LinkComponent={Link}
      label={label}
      value={value}
      href={`/thanh-vien/${newUserCode}/${
        value === USER_TABS.TONG_QUAN ? "" : value
      }`}
    />
  );
};
