import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import WrapTitle from "../../common/WrapTitle";
import MyTeamsFollow from "./MyTeamsFollow";
import MyMatchesFollow from "./MyMatchesFollow";

const MyFollow = () => {
  return (
    <div>
      <WrapTitle title={`Đội bóng đang theo dõi`} />
      <MyTeamsFollow />
      <WrapTitle title={`Trận đấu đang theo dõi`} />
      <MyMatchesFollow />
      {/* <WrapTitle title={`Người dùng đang theo dõi`} /> */}
    </div>
  );
};

export default MyFollow;
