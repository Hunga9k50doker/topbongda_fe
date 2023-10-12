import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import CustomLink from "@/components/common/CustomLink";
import { Navigation, EffectFade, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// const arrowNext = (onClickHandler, hasNext, label) => {
//   return (
//     <div className='flex items-center pl-2 w-12'>
//       <IconButton
//         onClick={onClickHandler}
//         color='primary'
//         aria-label={label}
//         disabled={!hasNext}
//         className='bg-green-400/10 hover:bg-green-400/30 disabled:bg-gray-200/30'
//       >
//         <NavigateNextIcon />
//       </IconButton>
//     </div>
//   )
// }

// const arrowPrev = (onClickHandler, hasPrev, label) => {
//   return (
//     <div className='flex items-center pr-2 w-12'>
//       <IconButton
//         onClick={onClickHandler}
//         color='primary'
//         aria-label={label}
//         disabled={!hasPrev}
//         className='bg-green-400/10 hover:bg-green-400/30 disabled:bg-gray-200/30'
//       >
//         <NavigateBeforeIcon />
//       </IconButton>
//     </div>
//   )
// }

function CategoriesCarousel({ tags }: { tags: any }) {
  return (
    <>
      <Swiper
        autoplay={true}
        modules={[Navigation, EffectFade, Pagination]}
        effect="fade"
        pagination={{
          clickable: true,
          clickableClass: "swiper-pagination-clickable",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
      >
        {tags.map((group: any, key: any) =>
          group.map((item: any) => (
            <SwiperSlide key={key}>
              <CatItem key={item.url} item={item} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}

export default CategoriesCarousel;

function CatItem({ item, ...props }: { item: any }) {
  return (
    <div className="py-1">
      <CustomLink
        href={item.url}
        className="card rounded border border-gray-200 hover:border-gray-300"
      >
        <div className="card-body truncate p-4">
          <div className="text-xs uppercase text-gray-400">Chủ đề</div>
          <h3 className="truncate font-bold">{item.name}</h3>
        </div>
      </CustomLink>
    </div>
  );
}
