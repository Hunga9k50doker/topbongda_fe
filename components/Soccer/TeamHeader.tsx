"use client";
import React from "react";
import Image from "next/image";
import { getMediaURL, handleAfterCopy, numberWithCommas } from "@/utils";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { Stack, MenuItem, Typography, Box } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  AiOutlineCopy,
  AiOutlineStar,
  AiFillStar,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { followTeamAPI, getListFollowTeamAPI } from "@/apis/user_apis";
import { RootState, store } from "@/store";
import { deleteFollowTeam, updateFollowTeams } from "@/reducers/userSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { useEffectOnce, useLocalStorage } from "react-use";
import { TeamModel } from "@/models/team_model";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalAuth from "@/components/Modal/ModalAuth";
import PopoverCustom from "@/components/common/PopoverCustom";
import { useParams, useRouter } from "next/navigation";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";

function TeamHeader({ teamDetail, ...props }: { teamDetail: TeamModel }) {
  const { tab } = useParams();

  const title = React.useMemo(() => {
    switch (tab) {
      case "lich-thi-dau":
        return "Lịch thi đấu";
      case "fans":
        return "Fan hâm mộ";
      case "cau-thu":
        return "Cầu thủ";
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
          label: "Đội bóng",
          href: "/doi-bong/",
        },
        {
          label: teamDetail.name,
        },
      ]
    : [
        {
          label: "Đội bóng",
          href: "/doi-bong/",
        },
        {
          label: teamDetail.name,
          href: teamDetail.fullUrl,
        },
        {
          label: title,
        },
      ];

  const { followTeams, isAuth } = useSelector(
    (state: RootState) => state.userStore.data
  );
  const { updateModal } = React.useContext(ModalContext);
  const [, setStoVal] = useLocalStorage<any>("tbd-new-topic-save", "");
  const router = useRouter();

  useEffectOnce(() => {
    if (followTeams.length === 0) {
      getListFollowTeamAPI({ hl: "yes" })
        .then((r) => {
          return store.dispatch(updateFollowTeams(r.data.data));
        })
        .catch((e) => {});
    }
  });

  const onFollowTeam = () => {
    if (!isAuth) return updateModal("modal-auth", <ModalAuth />);
    followTeamAPI({
      team_code: teamDetail.code,
      is_remove: isFollow ? "yes" : "no",
    })
      .then((r) => {
        if (r.data.ok) {
          if (isFollow) store.dispatch(deleteFollowTeam(teamDetail.code));
          else
            store.dispatch(
              updateFollowTeams([
                ...followTeams,
                {
                  team: teamDetail,
                  teamCode: teamDetail.code,
                },
              ])
            );
        }
        return toast.success(r.data.msg);
      })
      .catch((e) => {});
  };

  const isFollow = React.useMemo(() => {
    const res = followTeams.find(
      (item: TeamModel) => item.teamCode === teamDetail.code
    );
    return Boolean(res);
  }, [followTeams, teamDetail.code]);

  const onRederict = () => {
    setStoVal({
      teams: [
        {
          ...teamDetail,
          icon: teamDetail.logo,
        },
      ],
    });
    router.push("/dang-bai/");
  };

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Stack direction={"row"} alignItems={"center"} margin={2}>
        <Image
          src={
            getMediaURL(teamDetail.coverImg) ||
            teamDetail.logo ||
            DEFAULT_TEAM_ICON
          }
          priority={true}
          alt=""
          width={44}
          height={44}
          className="no-select no-drag w-fit rounded-full bg-gray-300 p-2"
        />
        <Box className="ml-3 w-full">
          <h1 className="uppercase heading-font font-black text-lg">
            {teamDetail.name}
          </h1>
          <Box className="font-bold">{teamDetail.country}</Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              {teamDetail.numFans > 0 && (
                <Typography className="font-bold">
                  {numberWithCommas(teamDetail.numFans)} fans
                </Typography>
              )}
            </Box>
            <PopoverCustom icon={<PendingOutlinedIcon />}>
              <MenuItem onClick={onRederict}>
                <AiOutlinePlusCircle />
                <Typography className="text-sm ml-2">
                  Đăng bài liên quan đội bóng
                </Typography>
              </MenuItem>
              <CopyToClipboard
                text={teamDetail.fullUrl}
                onCopy={() => handleAfterCopy()}
              >
                <MenuItem>
                  <AiOutlineCopy />
                  <Typography className="text-sm ml-2">
                    Sao chép liên kết đội bóng
                  </Typography>
                </MenuItem>
              </CopyToClipboard>
              <MenuItem onClick={onFollowTeam}>
                {isFollow ? (
                  <>
                    <AiFillStar className="text-primary" />
                    <Typography className="text-sm ml-2">
                      Bỏ theo dõi đội bóng
                    </Typography>
                  </>
                ) : (
                  <>
                    <AiOutlineStar />
                    <Typography className="text-sm ml-2">
                      Theo dõi đội bóng
                    </Typography>
                  </>
                )}
              </MenuItem>
            </PopoverCustom>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default TeamHeader;
