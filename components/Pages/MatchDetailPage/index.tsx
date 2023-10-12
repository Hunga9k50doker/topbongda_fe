"use client";
import React from "react";
import {
  DEFAULT_COMPETITION_ICON,
  WEBSOKET_URL_MATCH_DETAIL,
} from "@/constants";
import { getMediaURL, numberFormatter, numberWithCommas } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDebounce, useMount, useUnmount } from "react-use";
import HTMLReactParser from "html-react-parser";
import Banner from "@/components/common/Banner";
import WrapTitle from "@/components/common/WrapTitle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import { StoryDetailModel } from "@/models/new_model";
import { AiOutlineCopy, AiOutlineStar, AiFillStar } from "react-icons/ai";
import { HeadToHeadModel, MatchDetailModel } from "@/models/match_model";
import PopoverCustom from "@/components/common/PopoverCustom";
import { useParams } from "next/navigation";
import { RootState, store } from "@/store";
import CopyToClipboard from "react-copy-to-clipboard";
import { followMatchAPI, getListFollowMatchAPI } from "@/apis/user_apis";
import { updateFollowMatchs, deleteFollowMatch } from "@/reducers/userSlice";
import { useSelector } from "react-redux";
import { matchTabs } from "@/assets/database/matchTabs";
import Statistics from "@/components/Pages/MatchDetailPage/Statistics";
import MatchEvents from "@/components/Pages/MatchDetailPage/MatchEvents";
import Lineup from "@/components/Pages/MatchDetailPage/Lineup";
import HeadToHead from "@/components/Pages/MatchDetailPage/HeadToHead";
import MatchPrediction from "@/components/Pages/MatchDetailPage/MatchPrediction";
import dynamic from "next/dynamic";
import PredictionInfo from "@/components/Pages/MatchDetailPage/PredictionInfo";
import camelcaseKeys from "camelcase-keys";
import {
  MATCH_STATUS_FINISH,
  MATCH_STATUS_INCOMING,
  MATCH_STATUS_UPCOMING,
} from "@/configs/constants";
import MatchOverView from "@/components/Pages/MatchDetailPage/MatchOverView";
import { USER_API_LIST_FOLOW_MATCH } from "@/configs/endpoints/user_endpoints";
import useSWR from "swr";
import ModalAuth from "@/components/Modal/ModalAuth";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import CardStory from "@/components/Cards/CardStory";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { putHitMatchViewCountAPI } from "@/apis/soccer_apis";
const WrapComments = dynamic(() => import("@/components/common/WrapComments"), {
  ssr: false,
});

interface MatchDetailProps {
  data: MatchDetailModel;
  newsStoryHeadlines: StoryDetailModel[];
  matchHeadlines: HeadToHeadModel[];
}
function MatchDetail({
  data,
  newsStoryHeadlines,
  matchHeadlines,
  ...props
}: MatchDetailProps) {
  const breadcrumbs = [
    {
      label: "Danh sách giải đấu",
      href: "/giai-dau",
    },
    {
      label: data.competition.name,
      href: data.competition.url,
    },
    {
      label: <h1>{data.homeTeam.name + " vs " + data.awayTeam.name}</h1>,
    },
  ];
  const [matchDetail, setMatchDetail] = React.useState(data);
  const { updateModal } = React.useContext(ModalContext);
  const { followMatches } = useSelector(
    (state: RootState) => state.userStore.data
  );
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const ws = React.useRef<any>(null);
  const slug = useParams();
  const competition = matchDetail.competition;
  const { venue } = matchDetail;
  const [value, setValue] = React.useState("tab_match_item_0");
  const handleAfterCopy = () => {
    toast.success("Đã copy liên kết trận đấu!", { autoClose: 1000 });
  };

  const isIncoming = React.useMemo(() => {
    return MATCH_STATUS_INCOMING.includes(matchDetail.matchStatus);
  }, [matchDetail]);
  const isUpcoming = React.useMemo(() => {
    return MATCH_STATUS_UPCOMING.includes(matchDetail.matchStatus);
  }, [matchDetail]);
  const isFinish = React.useMemo(() => {
    return MATCH_STATUS_FINISH.includes(matchDetail.matchStatus);
  }, [matchDetail]);

  useSWR(
    USER_API_LIST_FOLOW_MATCH,
    () => {
      getListFollowMatchAPI({ hl: "yes" })
        .then((r) => {
          return store.dispatch(updateFollowMatchs(r.data.data));
        })
        .catch((e) => {});
    },
    { revalidateOnFocus: false }
  );

  const onFollowMatch = () => {
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    followMatchAPI({
      match_code: matchDetail.code,
      is_remove: isFollow ? "yes" : "no",
    })
      .then((r) => {
        if (r.data.ok) {
          if (isFollow) store.dispatch(deleteFollowMatch(matchDetail.code));
          else
            store.dispatch(
              updateFollowMatchs([
                ...followMatches,
                {
                  matchCode: matchDetail.code,
                  match: matchDetail,
                },
              ])
            );
        }
        return toast.success(r.data.msg);
      })
      .catch((e) => {});
  };

  const isFollow = React.useMemo(() => {
    const res = followMatches.find(
      (item: MatchDetailModel) => item.matchCode === matchDetail.code
    );
    return Boolean(res);
  }, [followMatches, matchDetail.code]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useDebounce(() => {
    putHitMatchViewCountAPI({ matchCode: matchDetail.code })
      .then((r) => {})
      .catch(() => {});
  }, 2000);

  useMount(() => {
    if (isIncoming) {
      ws.current = new WebSocket(
        `${WEBSOKET_URL_MATCH_DETAIL}/${matchDetail.code}`
      );
      ws.current.onopen = () => {};
      ws.current.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        if (data) {
          const formatData = camelcaseKeys(data.data, { deep: true });
          setMatchDetail(formatData);
        }
      };
    }
  });

  useUnmount(() => {
    if (isIncoming) {
      ws.current.close();
    }
  });
  return (
    <TabContext value={value}>
      <BreadCrumbCustom data={breadcrumbs} />
      <Banner typebanner="match" dataSwipper={[matchDetail]} />
      <WrapTitle
        title={`${matchDetail.homeTeam.name} - ${matchDetail.awayTeam.name}`}
      >
        <Stack direction={"row"} gap={1}>
          {data.numViews > 0 && (
            <Stack color={"GrayText"} direction={"row"} alignItems={"center"}>
              <RemoveRedEyeOutlinedIcon fontSize="small" />
              <Typography component={"span"}>
                {numberFormatter(data.numViews)}
              </Typography>
            </Stack>
          )}
          {data.numComments > 0 && (
            <Stack color={"GrayText"} direction={"row"} alignItems={"center"}>
              <CommentOutlinedIcon fontSize="small" />
              <Typography component={"span"}>
                {numberFormatter(data.numComments)}
              </Typography>
            </Stack>
          )}
          <PopoverCustom icon={<PendingOutlinedIcon />}>
            <CopyToClipboard
              text={matchDetail.fullUrl}
              onCopy={handleAfterCopy}
            >
              <MenuItem>
                <AiOutlineCopy />
                <Typography className="text-sm ml-2">
                  Sao chép liên kết trận đấu
                </Typography>
              </MenuItem>
            </CopyToClipboard>
            <MenuItem onClick={onFollowMatch}>
              {isFollow ? (
                <>
                  <AiFillStar className="text-primary" />
                  <Typography className="text-sm ml-2">
                    Bỏ theo dõi trận đấu
                  </Typography>
                </>
              ) : (
                <>
                  <AiOutlineStar />
                  <Typography className="text-sm ml-2">
                    Theo dõi trận đấu
                  </Typography>
                </>
              )}
            </MenuItem>
          </PopoverCustom>
        </Stack>
      </WrapTitle>
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="scrollable auto tabs match"
        sx={{
          justifyContent: "space-between",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
        variant="scrollable"
        scrollButtons={"auto"}
      >
        {matchTabs.map((item, key) => (
          <Tab
            key={key}
            value={`tab_match_item_${key}`}
            label={item.tilte}
            sx={{ minWidth: "unset" }}
          />
        ))}
      </Tabs>

      <TabPanel value={`tab_match_item_0`} sx={{ p: 0, py: 1 }}>
        <MatchOverView matchDetail={matchDetail} />
      </TabPanel>
      <TabPanel value={`tab_match_item_1`} sx={{ px: 0, py: 1 }}>
        <Statistics data={matchDetail} />
      </TabPanel>
      <TabPanel value={`tab_match_item_2`} sx={{ px: 0, py: 1 }}>
        <MatchEvents data={matchDetail} />
      </TabPanel>
      <TabPanel value={`tab_match_item_3`} sx={{ p: 0, py: 1 }}>
        <Lineup data={matchDetail} />
      </TabPanel>
      <TabPanel value={`tab_match_item_4`} sx={{ p: 0, py: 1 }}>
        <HeadToHead matchHeadlines={matchHeadlines} />
      </TabPanel>
      <TabPanel value={`tab_match_item_5`} sx={{ p: 0, py: 1 }}>
        {isIncoming && (
          <Typography className="text-center italic text-xs mt-4 text-gray-400">
            Trận đấu đã bắt đầu, không thể dự đoán.
          </Typography>
        )}
        {isFinish && (
          <Typography className="text-center italic text-xs mt-4 text-gray-400">
            Trận đấu đã kết thúc, không thể dự đoán.
          </Typography>
        )}
        {isUpcoming && <MatchPrediction matchDetail={matchDetail} />}
      </TabPanel>
      <TabPanel value={`tab_match_item_6`} sx={{ p: 0, py: 1 }}>
        <PredictionInfo matchDetail={matchDetail} />
      </TabPanel>
      <Box sx={{ mt: 2 }}>
        <WrapComments
          data={matchDetail}
          code={matchDetail.code}
          type="match"
          codeSlug={slug}
        />
        {matchDetail.desc.length > 0 && (
          <Card tw="mt-6">
            <CardContent className="wiki">
              {HTMLReactParser(matchDetail.desc)}
            </CardContent>
          </Card>
        )}
      </Box>
      <WrapTitle title="Thông tin giải đấu"></WrapTitle>
      <Card className="mb-4">
        <CustomLink
          href={competition.url}
          className="flex items-center hover:bg-gray-200/20 active:bg-gray-200/40 px-1 py-1"
        >
          <Avatar
            src={getMediaURL(competition.icon) || DEFAULT_COMPETITION_ICON}
            alt={competition.name}
            sx={{ width: 60, height: 60 }}
            imgProps={{ width: 48, height: 48 }}
            className="bg-gray-300"
          />
          <div className="ml-2 truncate text-sm flex-1">
            <div className="heading-font text-md font-bold truncate">
              {competition.name}
            </div>
            {competition.numNextMatches > 0 && (
              <div>
                {numberWithCommas(competition.numNextMatches)} trận sắp diễn ra
              </div>
            )}
          </div>
        </CustomLink>
      </Card>
      {venue && venue.image && (
        <Card className="mb-4 relative">
          <Image
            src={getMediaURL(venue.image)}
            alt=""
            width={800}
            height={600}
            className="no-drag no-select"
          />
          <div
            className="w-full absolute bottom-0 h-1/3
                            bg-gradient-to-t from-black via-gray-800/90 to-gray-500/10
                            text-white flex flex-col px-4"
          >
            <div className="font-bold text-xl line-clamp-1">{venue.name}</div>
            {venue.capacity > 0 && <div>{venue.capacity}</div>}
            <div> {venue.city}</div>
          </div>
        </Card>
      )}
      {newsStoryHeadlines.length > 0 && (
        <>
          <WrapTitle title="Tin bóng đá liên quan" />
          {newsStoryHeadlines.map((item, key) => (
            <CardStory key={key} item={item} />
          ))}
        </>
      )}
    </TabContext>
  );
}

export default React.memo(MatchDetail);
