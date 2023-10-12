import React, { memo } from "react";
import CardUpComingMatch from "@/components/Cards/CardUpComingMatch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import NoData from "@/components/common/NoData";
import { CardItemLoader } from "@/loaders";

function UpcomingMatches() {
  const { upComingMatches, loading } = useSelector(
    (state: RootState) => state.matchStore
  );

  return (
    <>
      {loading && <CardItemLoader />}
      {upComingMatches.length > 0 &&
        upComingMatches.map((item: any) => (
          <CardUpComingMatch key={item.code} data={item} />
        ))}
      {!loading && !Boolean(upComingMatches.length) && (
        <NoData title="Chưa có trận đấu nào sắp diễn ra" />
      )}
    </>
  );
}

export default memo(UpcomingMatches);
