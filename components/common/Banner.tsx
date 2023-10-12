import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper";
import { StoryDetailModel } from "@/models/new_model";
import {
  DefaultImage,
  DefaultImage_02,
  DefaultImage_04,
  DefaultImage_05,
  DefaultImage_06,
} from "@/assets/images";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { store } from "@/store";
import MatchItemBanner from "@/components/Soccer/MatchItemBanner";
import { updateUpcomingMatches } from "@/reducers/matchSlice";
import { useInterval, useMount } from "react-use";
import { MatchDetailModel } from "@/models/match_model";
import Link from "next/link";

interface BannerProps {
  image?: string;
  subtitle?: string;
  dataSwipper?: any[];
  typebanner?: "normal" | "match" | "news";
}

const arryImage = [
  DefaultImage.src,
  DefaultImage_02.src,
  DefaultImage_04.src,
  DefaultImage_05.src,
  DefaultImage_06.src,
];

const Banner = ({ dataSwipper = [], typebanner = "normal" }: BannerProps) => {
  const breakpoints = {
    0: {
      slidesPerView: 1,
    },
  };
  const theme: any = useTheme();
  const [imageRadom, setImageRadom] = React.useState(arryImage[2]);
  const [isMounted, setIsMounted] = React.useState(false);

  useInterval(() => {
    setImageRadom(arryImage[Math.floor(Math.random() * arryImage.length)]);
  }, 10000);

  useEffect(() => {
    setIsMounted(true);
    if (typebanner === "normal" && Boolean(dataSwipper.length)) {
      store.dispatch(updateUpcomingMatches(dataSwipper));
    }
  }, []);

  if (!isMounted || dataSwipper.length === 0)
    return (
      <Box
        style={{
          height: "200px",
          background: `url(${DefaultImage_02.src}) center / cover no-repeat`,
        }}
      ></Box>
    );

  return (
    <NewStyle>
      <Swiper
        style={{
          position: "relative",
          borderBottomLeftRadius: "2px",
          borderBottomRightRadius: "2px",
          width: "100%",
          height: "200px",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={breakpoints}
        modules={[Autoplay, Navigation, EffectFade, Pagination]}
        effect="fade"
        loop={true}
      >
        {dataSwipper.length > 0 && (
          <>
            {/* banner default match headlines */}
            {typebanner === "normal" &&
              dataSwipper.map((item: any, key) => (
                <SwiperSlide key={key}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      background: `url(${
                        item?.venue?.image || DefaultImage_02.src
                      }) center / cover no-repeat`,
                      "::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: theme.palette.background.paper,
                        zIndex: -1,
                      },
                    }}
                  >
                    <MatchItemBanner matchItem={item} showLeagueName={true} />
                  </Box>
                </SwiperSlide>
              ))}
            {/* banner news */}
            {typebanner === "news" &&
              dataSwipper.map((item: StoryDetailModel, key) => (
                <SwiperSlide key={key}>
                  <Box
                    sx={{
                      position: "relative",
                      padding: "8px",
                      height: "100%",
                      background: `url(${
                        item.getCoverThumbnailUrl || item.cover || imageRadom
                      }) center / cover no-repeat`,
                      "::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: theme.palette.background.paper,
                        zIndex: -1,
                      },
                    }}
                  >
                    <Link href={item.url}>
                      <Typography className="hover:text-primary font-bold text-sm w-[90%]">
                        {item.title}
                      </Typography>
                    </Link>
                  </Box>
                </SwiperSlide>
              ))}
            {/* banner match schedule, match detail */}
            {typebanner === "match" &&
              dataSwipper.map((item: MatchDetailModel, key) => (
                <SwiperSlide key={key}>
                  <Box
                    sx={{
                      height: "100%",
                      background: `url(${
                        item?.venue?.image || DefaultImage_02.src
                      }) center / cover no-repeat`,
                      "::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: theme.palette.background.paper,
                        zIndex: -1,
                      },
                    }}
                  >
                    <MatchItemBanner matchItem={item} showLeagueName={true} />
                  </Box>
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
    </NewStyle>
  );
};

export default React.memo(Banner);

const NewStyle = styled("div")(({ theme }: any) => ({
  ".swiper-pagination-bullet": {
    backgroundColor: theme.palette.primary.main,
  },
}));
