"use client";
import React from "react";
import {
  BRAND_NAME,
  FACEBOOK_PAGE_LINK,
  FACEBOOK_PAGE_SUPPORT,
} from "@/constants";
import Banner from "@/components/common/Banner";
import FeaturedMatchItems from "@/components/Pages/NewsPage/FeaturedMatchItems";
import { useInView } from "react-intersection-observer";
import CardStory from "@/components/Cards/CardStory";
import { Box } from "@mui/material";
import WrapTitle from "@/components/common/WrapTitle";
import { StoryModel } from "@/models/new_model";
import ParagraphBody from "@/components/common/Text/ParagraphBody";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import { toast } from "react-toastify";
import { getStoriesShortListAPI } from "@/apis/news_apis";
import NoData from "@/components/common/NoData";

interface NewsPageProps {
  listStories: StoryModel;
  sliderTags?: any;
  topFiveStories: StoryModel;
}

function NewsPage({
  listStories,
  sliderTags,
  topFiveStories,
  ...props
}: NewsPageProps) {
  const [pageData, setPageData] = React.useState(listStories);
  const [viewFeaturedMatchesRef, inView] = useInView({
    threshold: 0,
  });

  const getStories = React.useCallback(() => {
    getStoriesShortListAPI({
      page: pageData.current + 1,
      page_size: 10,
    })
      .then((r) => {
        setPageData({
          ...r.data,
          items: [...pageData.items, ...r.data.items],
        });
        return r.data;
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  }, [listStories, pageData]);

  return (
    <Box>
      <Banner typebanner="news" dataSwipper={topFiveStories.items} />
      <WrapTitle
        component={"h1"}
        title="Tin Tức Bóng Đá Mới Nhất"
        subtitle="Các chủ đề"
        link="/tin-bong-da/tag/"
      />
      {listStories.total > 0 && (
        <>
          {pageData.items.length > 0 &&
            pageData.items.map((item, key) => (
              <CardStory key={key} item={item} />
            ))}
        </>
      )}
      {listStories.total === 0 && <NoData title="Chưa có tin tức nào" />}
      {listStories.items.length === 0 && <NoData title="Chưa có tin tức nào" />}
      {pageData.current < listStories.numPages ? (
        <LoadMoreButton loadMore={getStories} title="Tải thêm bài viết" />
      ) : (
        listStories.items.length > 0 && (
          <p className="text-xs text-center italic">~ hết danh sách ~</p>
        )
      )}
      <div className="mt-4" ref={viewFeaturedMatchesRef}>
        <WrapTitle
          title="Các trận đấu sắp tới"
          subtitle="Lịch thi đấu"
          link="/lich-thi-dau/"
        />
        <FeaturedMatchItems inView={inView} />
      </div>

      <WrapTitle title={`${BRAND_NAME} News`} />
      <article className="container mx-auto px-4 text-gray-400 foot-article">
        <ParagraphBody>
          Bạn muốn cập nhật những tin bóng đá mới nhất một cách nhanh chóng từ
          nhiều nguồn? {BRAND_NAME} chính là website dành cho bạn.
        </ParagraphBody>
        <ParagraphBody>
          Tại đây, chúng tôi dịch những bài viết chất lượng từ các trang tin
          tiếng Anh uy tín khắp thế giới cùng với những quan điểm của những nhà
          báo trong nước. Với lượng bài viết phong phú, đa chiều đảm bảo sẽ
          khiến bạn đọc liên tục không rời mắt.
        </ParagraphBody>
        <ParagraphBody>
          Chúng tôi cũng hoan nghênh những bài viết và ý kiến đóng góp của quý
          vị độc giả thông qua fanpage chính thức tại Facebook:{" "}
          <a
            href={FACEBOOK_PAGE_SUPPORT}
            className="link"
            target="_blank"
            rel="noreferrer noopener"
          >
            {FACEBOOK_PAGE_LINK}
          </a>
          .
        </ParagraphBody>
      </article>
    </Box>
  );
}

export default NewsPage;
