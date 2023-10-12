"use client";
import React from "react";
import Level from "@/components/Pages/AccountPage/Level";
import MyPosts from "@/components/Pages/AccountPage/MyPosts";
import Settings from "@/components/Pages/AccountPage/Setting";
import MyProfile from "@/components/Pages/AccountPage/MyProfile";
import MyFollow from "@/components/Pages/AccountPage/MyFollow";
import MyCollections from "@/components/Pages/AccountPage/MyCollections";
import MyPredictions from "@/components/Pages/AccountPage/MyPredictions";
import MyAccumulation from "@/components/Pages/AccountPage/MyAccumulation";
import SpedialCustom from "@/components/common/SpedialCustom";
import { useParams } from "next/navigation";
import { ACCOUNT_TABS } from "@/configs/constants";
import { TopicDataModel } from "@/models/topic_model";
import { TeamDataModel } from "@/models/team_model";
interface AccountPageProps {
  topic?: TopicDataModel;
  teamsFollow?: TeamDataModel;
  matchsFollow?: any;
  myCollection?: any;
  myPrediction?: any;
  myAccumulation?: any;
  level?: any;
  settings?: any;
}

function AccountPage({}: AccountPageProps) {
  const value = useParams().tab || ACCOUNT_TABS.TONG_QUAN;

  return (
    <>
      <SpedialCustom />
      {value === ACCOUNT_TABS.TONG_QUAN && <MyProfile />}
      {value === ACCOUNT_TABS.BAI_VIET && <MyPosts />}
      {value === ACCOUNT_TABS.THEO_DOI && <MyFollow />}
      {value === ACCOUNT_TABS.BO_SU_TAP && <MyCollections />}
      {value === ACCOUNT_TABS.DU_DOAN && <MyPredictions />}
      {value === ACCOUNT_TABS.LICH_SU_TICH_LUY && <MyAccumulation />}
      {value === ACCOUNT_TABS.CAP_DO && <Level />}
      {value === ACCOUNT_TABS.CAI_DAT && <Settings />}
    </>
  );
}

export default AccountPage;
