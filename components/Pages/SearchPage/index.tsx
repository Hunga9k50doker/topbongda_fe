"use client";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  DEFAULT_AVATAR,
  DEFAULT_NEWS_STORY_COVER,
  DEFAULT_TEAM_ICON,
} from "@/constants";
import { getFromNowShort, getMediaURL } from "@/utils";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import CustomLink from "@/components/common/CustomLink";
import dayjs from "dayjs";
import {
  Box,
  Paper,
  InputBase,
  Divider,
  CircularProgress,
  Typography,
} from "@mui/material";
import WrapTitle from "@/components/common/WrapTitle";
import { Card, List, ListItem } from "@mui/material";
import { useEffectOnce, useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";
import { updateLoading } from "@/reducers/loadingSlice";
import { store } from "@/store";
import { Space, Tag } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { StoryDetailModel, TagModel } from "@/models/new_model";
import CardStoryShort from "@/components/Cards/CardStoryShort";
import { TopicDetailModel } from "@/models/topic_model";
import { UserModel } from "@/models/user_model";
import { CompetitionItemModel } from "@/models/competition_model";
import CardCompetition from "@/components/Cards/CardCompetition";
interface SearchPageProps {
  q: string;
  result: any;
}

function SearchPage({ q, result, ...props }: SearchPageProps) {
  const searchInput = React.useRef<any>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [stoVal, setStoVal] = useLocalStorage<any>("key-search", []);
  const [isCloseButton, setIsCloseButton] = React.useState(
    q.length > 0 ? true : false
  );

  const topicData =
    result?.filter((x: any) => x.index === "forum_topic")[0] || {};
  const teamData =
    result?.filter((x: any) => x.index === "soccer_team")[0] || {};
  const competitionData =
    result?.filter((x: any) => x.index === "soccer_competition")[0] || {};
  const userData =
    result?.filter((x: any) => x.index === "users_user")[0] || {};
  const tagData = result?.filter((x: any) => x.index === "news_tag")[0] || {};
  const storyData =
    result?.filter((x: any) => x.index === "news_story")[0] || {};

  const handleClear = () => {
    searchInput.current.value = "";
    setIsCloseButton(false);
  };

  const handleChange = (e: any) => {
    e.target.value !== "" ? setIsCloseButton(true) : setIsCloseButton(false);
    if (e.key === "Enter" && searchInput.current.value !== "") {
      const newKeySearchs = stoVal?.splice(0, 4) || [];
      const isHad = newKeySearchs.includes(searchInput.current.value);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if (!isHad) setStoVal([searchInput.current.value, ...newKeySearchs]);
      return router.push(`/tim-kiem/?q=${searchInput.current.value}`);
    }
  };

  const handleOnSearch = (e: any, isSearch = false) => {
    e.preventDefault();
    if ((e.key === "Enter" || isSearch) && searchInput.current.value !== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      const newKeySearchs = stoVal?.splice(0, 4) || [];
      const isHad = newKeySearchs.includes(searchInput.current.value);
      if (!isHad) setStoVal([searchInput.current.value, ...newKeySearchs]);
      router.push(`/tim-kiem/?q=${searchInput.current.value}`);
    }
  };

  useEffectOnce(() => {
    setTimeout(() => store.dispatch(updateLoading(false)), 1000);
  });
  return (
    <Box sx={{ py: 1 }}>
      <h1 className="uppercase font-bold mb-4 px-2">
        {q ? <>Kết Quả Tìm Kiếm `{q || ""}`</> : <>Tìm Kiếm</>}
      </h1>

      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 300,
          mx: 1,
        }}
      >
        <InputBase
          name="q"
          size="small"
          defaultValue={q}
          inputRef={searchInput}
          sx={{ ml: 1, flex: 1, p: "2px 4px" }}
          placeholder="Nhập từ khóa để tìm..."
          onKeyUp={handleChange}
        />
        {isCloseButton && (
          <IconButton aria-label="xóa" onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {isLoading ? (
          <IconButton disabled>
            <CircularProgress
              aria-busy={isLoading}
              aria-describedby="loading-progress"
              size={28}
              color="success"
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => handleOnSearch(e, true)}
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>

      {q.length > 0 ? (
        <Box>
          {(teamData.nbHits > 0 ||
            competitionData.nbHits > 0 ||
            teamData.nbHits > 0 ||
            tagData.nbHits > 0) && (
            <Box className="grid grid-cols-1 mt-8">
              {teamData.nbHits > 0 && (
                <Box className="team-col">
                  <WrapTitle
                    title="Đội bóng"
                    subtitle="Danh sách"
                    link="/doi-bong"
                  />
                  <Card className="mt-4 mx-2">
                    <List>
                      {teamData.hits.map((item: any) => (
                        <CustomLink
                          href={`/doi-bong/${item.code}`}
                          key={item.code}
                        >
                          <ListItem sx={{ gap: 1 }}>
                            <Image
                              src={
                                getMediaURL(item.searchExtra.iconUrl) ||
                                DEFAULT_TEAM_ICON
                              }
                              alt=""
                              width={40}
                              height={40}
                              className="bg-gray-300 rounded-full"
                            />
                            <span className="text-sm">{item.name}</span>
                          </ListItem>
                        </CustomLink>
                      ))}
                    </List>
                  </Card>
                </Box>
              )}

              {competitionData.nbHits > 0 && (
                <Box className="team-col">
                  <WrapTitle
                    title="Giải đấu"
                    subtitle="Danh sách"
                    link="/giai-dau"
                  />
                  <Card className="mt-4 mx-2">
                    <List>
                      {competitionData.hits.map(
                        (item: CompetitionItemModel) => (
                          <CardCompetition
                            key={item.slug}
                            competitionData={item}
                          />
                        )
                      )}
                    </List>
                  </Card>
                </Box>
              )}

              {tagData.nbHits > 0 && (
                <Box className="team-col">
                  <WrapTitle
                    title="Chủ đề"
                    subtitle="Danh sách"
                    link="/tin-bong-da/tag"
                  />
                  <Space
                    size={[0, 8]}
                    wrap
                    className="max-h-[60px] overflow-hidden mt-4 mx-2"
                  >
                    {tagData.hits.map((tag: TagModel) => (
                      <CustomLink
                        href={`/tin-bong-da/tag/${tag.slug}`}
                        key={tag.name}
                      >
                        <Tag
                          className="flex items-center py-1/2"
                          icon={<TagOutlined />}
                        >
                          {tag.name}
                        </Tag>
                      </CustomLink>
                    ))}
                  </Space>
                </Box>
              )}

              {userData.nbHits > 0 && (
                <Box className="team-col">
                  <WrapTitle
                    title="Thành viên"
                    subtitle="Danh sách"
                    link="/thành viên"
                  />
                  <Card className="mt-4 mx-2">
                    <List>
                      {userData.hits.map((item: UserModel) => (
                        <CustomLink href={item.url || ""} key={item.username}>
                          <ListItem sx={{ gap: 1 }}>
                            <Avatar
                              src={
                                getMediaURL(item.searchExtra.avatarUrl) ||
                                DEFAULT_AVATAR
                              }
                              alt=""
                              sx={{ width: 40, height: 40 }}
                            />
                            <span className="text-sm">
                              {item?.name || item.username}
                            </span>
                          </ListItem>
                        </CustomLink>
                      ))}
                    </List>
                  </Card>
                </Box>
              )}
            </Box>
          )}

          <Box className="mt-8">
            <WrapTitle
              title="Tin tức bóng đá"
              subtitle="Xem thêm"
              link="/tin-bong-da"
            />
            <Box mx={1}>
              {storyData.nbHits > 0 ? (
                storyData.hits.map((item: StoryDetailModel) => (
                  <CardStoryShort key={item.code} item={item} />
                ))
              ) : (
                <Typography className="text-xs italic text-center text-gray-400 mt-4">
                  Không tìm thấy tin tức nào.
                </Typography>
              )}
            </Box>
          </Box>

          <Box className="mt-8">
            <WrapTitle title="Bài viết diễn đàn" subtitle="Xem thêm" link="/" />
            <Box className="grid grid-cols-1 mt-4 mx-2">
              {topicData.hits.map((ti: TopicDetailModel, key: number) => (
                <ForumTopicItem key={key} item={ti} />
              ))}
              {topicData.nbHits === 0 && (
                <Typography className="text-xs italic text-center text-gray-400 mt-4">
                  Không tìm thấy bài viết nào.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="mt-4" style={{ height: 1000 }}>
          Bạn có thể tìm đội bóng, giải đấu, cầu thủ hoặc từ khóa mong muốn.
        </Box>
      )}
    </Box>
  );
}

export default React.memo(SearchPage);

const ForumTopicItem = ({ item, ...props }: { item: any }) => {
  return (
    <li className="flex mb-4 items-center">
      <CustomLink href={item.url || ""}>
        <Avatar
          src={
            getMediaURL(item.searchExtra.userAvatarUrl) ||
            DEFAULT_NEWS_STORY_COVER
          }
          alt=""
        />
      </CustomLink>
      <Box className="ml-4">
        <h3 className="font-bold text-md">
          <CustomLink
            href={item.url || ""}
            className="link-hover hover:text-primary"
          >
            {item.title}
          </CustomLink>
        </h3>
        <Box className="text-xs text-gray-400">
          Viết bởi{" "}
          <CustomLink
            href={item.searchExtra.userPageUrl || ""}
            className="link"
          >
            {item.searchExtra.username}
          </CustomLink>{" "}
          cách đây {getFromNowShort(dayjs.unix(item.publishedAt))}
        </Box>
      </Box>
    </li>
  );
};
