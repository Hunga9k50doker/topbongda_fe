"use client";
import React from "react";
import CustomLink from "@/components/common/CustomLink";
import UpcomingMatches from "@/components/Pages/HomePage/UpcomingMatches";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { getTopicsListAPI } from "@/apis/forum_apis";
import { numberFormatter } from "@/utils";
import HTMLReactParser from "html-react-parser";
import WrapTitle from "@/components/common/WrapTitle";
import { TopicDataModel, TopicDetailModel } from "@/models/topic_model";
import { CategoryModel } from "@/models/category_model";
import CardPost from "@/components/Cards/CardPost";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import {
  resetTopics,
  updateNewTopics,
  updatePopularTopics,
} from "@/reducers/topicsSlice";
import { useRouter } from "next/navigation";
import { updateLoading } from "@/reducers/loadingSlice";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import Link from "next/link";
import { useUnmount } from "react-use";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import { HomeCardLoader } from "@/loaders";
interface CategoryDetailContentProps {
  pk: string;
  isNew: string;
  category: CategoryModel;
  topicsListData: TopicDataModel;
  mostLikesTopics: TopicDetailModel[];
}

function CategoryDetailContent({
  pk,
  isNew,
  category,
  topicsListData,
  mostLikesTopics,
  ...props
}: CategoryDetailContentProps) {
  const breadcrumbs = [
    {
      label: "Chuyên mục",
      href: "/chuyen-muc/",
    },
    {
      label: category.name,
    },
  ];
  const { newTopics, popularTopics, isLoading } = useSelector(
    (state: RootState) => state.topicsStore
  );
  const router = useRouter();
  const [items, setItems] = React.useState(topicsListData.items);
  const [currentPage, setCurrentPage] = React.useState(topicsListData.current);
  const [numPages, setNumPages] = React.useState(topicsListData.numPages);
  const [value, setValue] = React.useState(isNew ? "1" : "0");

  const getTopicsList = React.useCallback(
    (params: any) => {
      getTopicsListAPI(params).then((r) => {
        if (isNew) {
          store.dispatch(
            updateNewTopics({ ...r.data, items: [...items, ...r.data.items] })
          );
        } else {
          store.dispatch(
            updatePopularTopics({
              ...r.data,
              items: [...items, ...r.data.items],
            })
          );
        }
        setCurrentPage(r.data.current);
        setNumPages(r.data.numPages);
      });
    },
    [items, isNew]
  );

  const handleLoadMore = () => {
    const p = {
      last_updated: isNew ? "yes" : "no",
      page: currentPage + 1,
      cat: pk,
    };
    getTopicsList(p);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    store.dispatch(updateLoading(true));
    router.push(`/chuyen-muc/${pk}${newValue === "1" ? "?isNew=yes" : ""}`);
    setValue(newValue);
  };

  React.useEffect(() => {
    if (isNew) {
      setItems(newTopics.items);
    } else {
      setItems(popularTopics.items);
    }
  }, [newTopics, popularTopics, isNew]);

  React.useEffect(() => {
    if (isNew) {
      store.dispatch(updateNewTopics(topicsListData));
    } else {
      store.dispatch(updatePopularTopics(topicsListData));
    }
    setTimeout(() => store.dispatch(updateLoading(false)), 1000);
  }, [topicsListData, isNew]);

  useUnmount(() => {
    store.dispatch(resetTopics());
  });

  return (
    <Box>
      <BreadCrumbCustom data={breadcrumbs} />
      <h1>
        <WrapTitle title={`Chuyên mục ${category.name}`} />
      </h1>
      <Card className="mb-4">
        <CardContent>
          {category.desc.length > 0 && (
            <Box className="text-sm">{HTMLReactParser(category.desc)}</Box>
          )}
          <List>
            <ListItem>
              <ListItemText
                primary={numberFormatter(category.numMembers) || "-"}
                secondary="Thành viên"
              />
              <ListItemText
                primary={numberFormatter(category.numTopics) || "-"}
                secondary="Bài viết"
              />
              <ListItemText
                primary={numberFormatter(category.numComments) || "-"}
                secondary="Bình luận"
              />
            </ListItem>
          </List>
          <Button
            component={Link}
            href={`/dang-bai/?cat=${category.id}`}
            variant="outlined"
            fullWidth
            startIcon={<AddCircleOutlineOutlinedIcon />}
            size="small"
          >
            Đăng bài trong mục này
          </Button>
        </CardContent>
      </Card>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: "divider", mb: 1 }}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Phổ biến" value="0" />
            <Tab label="Mới cập nhật" value="1" />
          </TabList>
        </Box>
        <TabPanel value={value} sx={{ p: 0 }}>
          {isLoading && <HomeCardLoader />}
          {items?.length > 0 &&
            !isLoading &&
            items?.map((item) => <CardPost key={item.code} data={item} />)}

          {items?.length === 0 && (
            <p className="mb-6 text-xs text-center italic">
              Không có bài viết nào trong chuyên mục này.
            </p>
          )}
          {currentPage < numPages ? (
            <LoadMoreButton
              title="Tải thêm bài viết"
              loadMore={handleLoadMore}
            />
          ) : (
            <p className="mb-6 text-xs text-center italic">~ Hết danh sách ~</p>
          )}
        </TabPanel>
      </TabContext>
      {mostLikesTopics.length > 0 && (
        <>
          <WrapTitle title="Bài viết yêu thích trong tuần" />
          <div>
            {mostLikesTopics.map((item) => (
              <MostLikedTopicsItem key={item.topic.code} item={item.topic} />
            ))}
          </div>
        </>
      )}
      <WrapTitle
        title="Trận đấu sắp diễn ra"
        subtitle="xem tất cả"
        link="/lich-thi-dau/"
      />
      <UpcomingMatches />
    </Box>
  );
}

export default CategoryDetailContent;

function MostLikedTopicsItem({ item, ...props }: { item: any }) {
  if (!item) return null;
  return (
    <div className="related-post-item">
      <CustomLink
        href={item.url}
        className="block px-4 py-2 hover:bg-gray-200/20 active:bg-gray-200/40 text-sm"
      >
        <div>
          <small>{item.name}</small>
        </div>
        <h3 className="font-bold line-clamp-2">{item.title}</h3>
        <div className="flex items-center space-x-1 text-gray-400">
          <span>{item.publishedAt}</span>
          {item.numComments > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <QuestionAnswerOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{numberFormatter(item.numComments)}</span>
              </span>
            </>
          )}

          {item.numLikes > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <ThumbUpOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{numberFormatter(item.numLikes)}</span>
              </span>
            </>
          )}
        </div>
      </CustomLink>
      <Divider />
    </div>
  );
}
