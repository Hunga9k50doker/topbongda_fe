import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CustomLink from "@/components/common/CustomLink";
import { DEFAULT_COMPETITION_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import { useTheme } from "@mui/material/styles";
import { CompetitionItemModel } from "@/models/competition_model";
import { Box, Stack, Typography } from "@mui/material";

interface CardCompetitionItemProps {
  item: CompetitionItemModel;
  view?: "list" | "grid" | null;
}

const CardCompetitionItem = ({
  item,
  view = "list",
  ...props
}: CardCompetitionItemProps) => {
  const theme: any = useTheme();
  return (
    <motion.div
      style={{
        background: theme.palette.custom.gradientButton,
      }}
      className="shadow-lg rounded-md overflow-hidden"
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}
    >
      <CustomLink href={item.url} aria-label={item.name} className="h-full">
        <Box
          className={`card-body h-full flex p-2 ${
            view === "list" ? "flex-row" : "flex-col"
          }`}
        >
          <Image
            loading="lazy"
            src={
              getMediaURL(item.icon) || item.logo || DEFAULT_COMPETITION_ICON
            }
            alt={item.name}
            width={40}
            height={40}
          />
          <Stack className="ml-2 flex-1">
            <Typography className="font-bold line-clamp-2 flex items-center gap-1 flex-wrap">
              {item.name}
              {view === "list" && item.nameAlt && (
                <Typography component={"span"} fontSize={"small"}>
                  ({item.nameAlt})
                </Typography>
              )}
            </Typography>
            {view !== "list" && item.nameAlt && (
              <Typography component={"span"} fontSize={"small"}>
                {item.nameAlt}
              </Typography>
            )}
            <Box
              className={`flex flex-1 ${
                view === "list" ? "" : "flex-col"
              } justify-between`}
            >
              <Typography
                fontSize={"small"}
                className="uppercase text-gray-400"
              >
                {item.country}
              </Typography>
              {item.numUpcomingMatches > 0 && (
                <Typography
                  fontSize={"small"}
                  className={`text-primary ${
                    view === "list" ? "text-right" : ""
                  } text-bold`}
                >
                  {item.numUpcomingMatches} trận sắp diễn ra
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </CustomLink>
    </motion.div>
  );
};

export default React.memo(CardCompetitionItem);
