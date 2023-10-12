"use client";
import { TeamMemberModel } from "@/models/team_model";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import Image from "next/image";
import TeamPlayerStatistics from "@/components/Pages/TeamDetailPage/TeamPlayerStatistics";
import { renderPosition } from "@/utils";
import WrapTitle from "@/components/common/WrapTitle";
import { getTeamMemberAPI } from "@/apis/soccer_apis";
import useSWR from "swr";
import { SOCCER_API_TEAM_MEMBER } from "@/configs/endpoints/soccer_endpoints";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Element, scroller } from "react-scroll";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { RootState, store } from "@/store";
import { updateTeamMembers } from "@/reducers/teamSlice";
import NoData from "@/components/common/NoData";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { useSelector } from "react-redux";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
interface TeamPlayerDetailProps {
  data: TeamMemberModel;
}

const TeamPlayerDetail = ({ data }: TeamPlayerDetailProps) => {
  const { members } = useSelector((state: RootState) => state.teamStore);
  const [otherMembers, setOtherMembers] =
    React.useState<TeamMemberModel[]>(members);
  const theme: any = useTheme();
  const router = useRouter();
  useSWR(
    SOCCER_API_TEAM_MEMBER,
    () => {
      if (!Boolean(members.length)) {
        getTeamMemberAPI({ teamCode: data.team.code })
          .then((r) => {
            if (r.data.ok) {
              setOtherMembers(r.data.player);
              store.dispatch(updateTeamMembers(r.data.player));
              return r.data.player;
            }
          })
          .catch(() => []);
      } else {
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const onShowInfoMember = (code: string) => {
    scroller.scrollTo("playerDetail", {
      duration: 800,
      delay: 100,
      smooth: true,
      offset: -50,
    });
    router.push(`/doi-bong/thanh-vien/${code}`);
  };
  const breadcrumbs = [
    {
      label: "Danh sách",
      href: `/doi-bong/${data.team.code}/cau-thu/`,
    },
    {
      label: data.name,
    },
  ];
  return (
    <Element name="playerDetail">
      <BreadCrumbCustom data={breadcrumbs} />
      <Stack
        sx={{
          m: 1,
          mt: 2,
        }}
        direction={"row"}
        gap={1}
      >
        <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
          <Badge
            style={{ width: "fit-content" }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<SmallAvatar alt={data.name} src={data.team.icon} />}
          >
            <Avatar
              sx={{
                background: theme.palette.background.paper,
                width: 80,
                height: 80,
              }}
              alt={data.name}
              src={data.avatar}
            />
          </Badge>
          <Stack gap={1} justifyContent={"center"} direction={"row"}>
            <Tooltip title="Số lần ra sân">
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  p: 1,
                  mt: 1,
                  height: 32,
                  width: 32,
                  borderRadius: "8px",
                  clipPath:
                    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  background: theme.palette.background.paper,
                }}
              >
                <Typography fontWeight={700} fontSize={"small"}>
                  {data?.statistics?.games?.appearences || "-"}
                </Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Đánh giá">
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  p: 1,
                  height: 40,
                  width: 40,
                  aspectRatio: "1/1",
                  borderRadius: "8px",
                  clipPath:
                    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  background: theme.palette.background.paper,
                }}
              >
                <Typography fontWeight={700}>
                  {data?.statistics?.games?.rating
                    ? Number(data?.statistics?.games?.rating).toFixed(1)
                    : "-"}
                </Typography>
              </Stack>
            </Tooltip>
            <Tooltip title="Số bàn thắng đã ghi">
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  p: 1,
                  mt: 1,
                  height: 32,
                  width: 32,
                  borderRadius: "8px",
                  clipPath:
                    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  background: theme.palette.background.paper,
                }}
              >
                <Typography fontWeight={700} fontSize={"small"}>
                  {data?.statistics?.goals?.total || "-"}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack>
          <Typography variant="h6" component="h6">
            {data.name}
          </Typography>

          <Typography fontSize={"small"} component="span">
            {renderPosition(data?.statistics?.games?.position || "-")}
          </Typography>
          <Stack gap={1} justifyContent={"center"}>
            {data.nationality && (
              <Typography fontSize={"small"} component="span">
                Quốc tịch:&nbsp;
                <Image
                  width={22}
                  height={22}
                  src={data.nationality || DEFAULT_TEAM_ICON}
                  alt={data.birthCountry}
                />
              </Typography>
            )}

            <Typography fontSize={"small"} component="span">
              Nơi sinh: {data.birthCountry}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      {Boolean(data.statistics) ? (
        <>
          <TeamPlayerStatistics statistics={data.statistics} />
        </>
      ) : (
        <>
          <WrapTitle title="Tổng quan" />
          <NoData title="Chưa có dữ liệu" />
        </>
      )}
      {/* <WrapTitle title="Tin liên quan" />
      <NoData title="Chưa có tin liên quan nào" /> */}
      <WrapTitle title="Các thành viên khác trong đội bóng" />
      <Box
        sx={{
          "& .swiper-pagination-bullet": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Swiper
          style={{ padding: "20px 0 40px 0" }}
          autoplay={true}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
        >
          {otherMembers.length > 0 &&
            otherMembers
              .filter((item) => item.code !== data.code)
              .map((otherMember, key) => (
                <SwiperSlide
                  key={key}
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    className="cursor-pointer"
                    onClick={() => onShowInfoMember(otherMember.code)}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <SmallAvatar
                        alt={otherMember.name}
                        src={otherMember.nationality}
                      >
                        {otherMember.nationality ? (
                          <></>
                        ) : (
                          <LanguageOutlinedIcon className="text-gray-400" />
                        )}
                      </SmallAvatar>
                    }
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                      }}
                      alt={otherMember.name}
                      src={otherMember.avatar}
                    />
                  </Badge>
                  <Typography
                    fontSize={10}
                    fontWeight={700}
                    className="truncate max-w-[50px] mt-2"
                  >
                    {otherMember.name}
                  </Typography>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </Element>
  );
};

export default React.memo(TeamPlayerDetail);

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: "#fff",
  border: `2px solid ${theme.palette.background.paper}`,
}));
