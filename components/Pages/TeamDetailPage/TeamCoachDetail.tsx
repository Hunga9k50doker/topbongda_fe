"use client";
import { TeamMemberModel } from "@/models/team_model";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
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
import { useSelector } from "react-redux";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";

interface TeamCoachDetailProps {
  data: TeamMemberModel;
}

const TeamCoachDetail = ({ data }: TeamCoachDetailProps) => {
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
    scroller.scrollTo("coachDetail", {
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
    <Element name="coachDetail">
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
        </Stack>

        <Stack>
          <Typography variant="h6" component="h6">
            {data.name}
          </Typography>

          <Typography fontSize={"small"} component="span">
            {renderPosition(data?.position || "-")}
          </Typography>
          <Typography fontSize={"small"} component="span">
            Nơi sinh: {data.birthCountry}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Thông tin</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="text-gray-400" component="th" scope="row">
                Ngày sinh
              </TableCell>
              <TableCell align="right">{data.dateOfBirth || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400" component="th" scope="row">
                Chiều cao / cân nặng
              </TableCell>
              <TableCell align="right">
                {data.height || "-"} / {data.weight || "-"}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-400" component="th" scope="row">
                Sự nghiệp
              </TableCell>
              <TableCell align="right">
                <Stack>
                  {data.career &&
                    data.career.map((item, key) => (
                      <ListItemText
                        key={key}
                        primary={
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={0.5}
                            justifyContent={"flex-start"}
                          >
                            <SmallAvatar
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              src={item.team.logo}
                            />
                            <Typography
                              component={"span"}
                              className="max-w-[100%] truncate text-sm"
                            >
                              {item.team.name}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Typography className="text-xs text-gray-400 text-left">
                            {dayjs(item.start).format("DD/MM/YYYY")} -&nbsp;
                            {item.end
                              ? dayjs(item.end).format("DD/MM/YYYY")
                              : "hiện tại"}
                          </Typography>
                        }
                      ></ListItemText>
                    ))}
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <WrapTitle title="Tin liên quan" />
      <NoData title="Chưa có tin liên quan nào" />
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

export default React.memo(TeamCoachDetail);

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: "#fff",
  border: `2px solid ${theme.palette.background.paper}`,
}));
