import React, { memo } from "react";
import CardTeam from "@/components/Cards/CardTeam";
import { CardItemLoader } from "@/loaders";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TopTeams = () => {
  const { topTeams, isLoading }: any = useSelector(
    (state: RootState) => state.teamStore
  );

  return (
    <>
      {isLoading && <CardItemLoader />}
      {topTeams?.items?.length > 0 &&
        topTeams?.items?.map((item: any, index: any) => (
          <CardTeam key={index} data={item} />
        ))}
      {topTeams?.items?.length === 0 && !isLoading && (
        <p className="text-center intalic text-xs">Không có đội bóng nào</p>
      )}
    </>
  );
};

export default memo(TopTeams);
