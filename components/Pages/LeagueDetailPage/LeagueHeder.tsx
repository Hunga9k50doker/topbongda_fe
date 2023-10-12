"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { DEFAULT_COMPETITION_ICON } from "@/constants";
import { getMediaURL, handleAfterCopy } from "@/utils";
import Box from "@mui/material/Box";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import { CompetitionItemModel } from "@/models/competition_model";
import Stack from "@mui/material/Stack";
import PopoverCustom from "@/components/common/PopoverCustom";
import CopyToClipboard from "react-copy-to-clipboard";
import { MenuItem, Typography } from "@mui/material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { useLocalStorage } from "react-use";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineCopy, AiOutlinePlusCircle } from "react-icons/ai";

interface LeagueHederProps {
  competition: CompetitionItemModel;
}

const LeagueHeder = ({ competition }: LeagueHederProps) => {
  const { tab } = useParams();
  const title = React.useMemo(() => {
    switch (tab) {
      case "lich-thi-dau":
        return "Lịch thi đấu";
      case "fans":
        return "Fan hâm mộ";
      case "cau-thu":
        return "Cầu thủ";
      case "top-danh-hieu":
        return "Top danh hiệu";
      case "bai-viet":
        return "Bài viết";
      case "tin-tuc":
        return "Tin tức";
      default:
        return "";
    }
  }, [tab]);

  const breadcrumbs = !tab
    ? [
        {
          label: "Giải đấu",
          href: "/giai-dau",
        },
        {
          label: competition.name || competition.nameAlt,
        },
      ]
    : [
        {
          label: "Giải đấu",
          href: "/giai-dau",
        },
        {
          label: competition.name || competition.nameAlt,
          href: competition.url,
        },
        {
          label: title,
        },
      ];

  const [, setStoVal] = useLocalStorage<any>("tbd-new-topic-save", "");
  const router = useRouter();
  const onRederict = () => {
    setStoVal({
      competitions: [
        {
          name: competition.name,
          url: competition.url,
          icon: competition.logo,
        },
      ],
    });
    router.push("/dang-bai/");
  };

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Box className="flex items-center p-4 pt-2">
        <Avatar
          src={
            getMediaURL(competition.icon) ||
            competition.logo ||
            DEFAULT_COMPETITION_ICON
          }
          alt={competition.name}
          sx={{ width: 60, height: 60 }}
          imgProps={{ width: 60, height: 60 }}
          className="bg-gray-100"
        ></Avatar>
        <Box className="ml-4 flex-1">
          <h1 className="heading-font text-xl font-bold uppercase">
            {competition.name}
          </h1>
          {competition.nameAlt && (
            <h2 className="name-alt">{competition.nameAlt}</h2>
          )}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <div>{competition.country}</div>
            <PopoverCustom icon={<PendingOutlinedIcon />}>
              <MenuItem onClick={onRederict}>
                <AiOutlinePlusCircle />
                <Typography className="text-sm ml-2">
                  Đăng bài liên quan giải đấu
                </Typography>
              </MenuItem>
              <CopyToClipboard
                text={competition.url}
                onCopy={() => handleAfterCopy()}
              >
                <MenuItem>
                  <AiOutlineCopy />
                  <Typography className="text-sm ml-2">
                    Sao chép liên kết giải đấu
                  </Typography>
                </MenuItem>
              </CopyToClipboard>
            </PopoverCustom>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(LeagueHeder);
