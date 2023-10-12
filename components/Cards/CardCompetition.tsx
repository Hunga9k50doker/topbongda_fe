import React from "react";
import { DEFAULT_COMPETITION_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import Image from "next/image";
import CustomLink from "@/components/common/CustomLink";
import { CompetitionItemModel } from "@/models/competition_model";
import { ListItem } from "@mui/material";

interface CardCompetitionProps {
  competitionData: CompetitionItemModel;
}
const CardCompetition = ({ competitionData }: CardCompetitionProps) => {
  const [srcCompetiotion, setSrcCompetiotion] = React.useState(
    getMediaURL(competitionData.searchExtra.iconUrl) || DEFAULT_COMPETITION_ICON
  );
  return (
    <CustomLink
      href={`/giai-dau/${competitionData.slug}`}
      key={competitionData.objectID}
    >
      <ListItem sx={{ gap: 1 }}>
        <Image
          src={srcCompetiotion}
          alt=""
          width={40}
          height={40}
          onError={() => setSrcCompetiotion(DEFAULT_COMPETITION_ICON)}
          className="bg-gray-300 rounded-full"
        />
        <span className="text-sm">{competitionData.name}</span>
      </ListItem>
    </CustomLink>
  );
};

export default CardCompetition;
