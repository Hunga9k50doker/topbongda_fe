import { HeadToHeadModel } from "@/models/match_model";
import React from "react";
import HeadToHeadItem from "@/components/Pages/MatchDetailPage/HeadToHeadItem";
import NoData from "@/components/common/NoData";

interface HeadToHeadProps {
  matchHeadlines: HeadToHeadModel[];
}

const HeadToHead = ({ matchHeadlines }: HeadToHeadProps) => {
  return (
    <div>
      {!Boolean(matchHeadlines.length) && <NoData />}
      {matchHeadlines.length > 0 &&
        matchHeadlines.map((item, index) => (
          <HeadToHeadItem key={index} data={item} />
        ))}
    </div>
  );
};

export default React.memo(HeadToHead);
