"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { CategoryDataModel } from "@/models/category_model";
import WrapTitle from "@/components/common/WrapTitle";
import { Box, Divider, InputBase, Paper } from "@mui/material";
import NoData from "@/components/common/NoData";
import CircularProgress from "@mui/material/CircularProgress";
import CardCategory from "@/components/Cards/CardCategory";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
interface AllTagsProps {
  tagsData: CategoryDataModel;
  q: string;
}

function AllTags({ tagsData, q = "" }: AllTagsProps) {
  const router = useRouter();
  const searchInput = React.useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCloseButton, setIsCloseButton] = React.useState(
    q.length > 0 ? true : false
  );
  const handleChangePage = (e: any, page1: number) => {
    router.push(`/tin-bong-da/tag/?q=${q}&page=${page1}`);
  };

  const handleChange = (e: any) => {
    e.target.value !== "" ? setIsCloseButton(true) : setIsCloseButton(false);
  };

  const handleOnSearch = (e: any, isSearch = false) => {
    e.preventDefault();
    if ((e.key === "Enter" || isSearch) && searchInput.current.value !== "") {
      setIsLoading(true);
      router.push(`/tin-bong-da/tag/?q=${searchInput.current.value}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    searchInput.current.value = "";
    setIsCloseButton(false);
    router.push(`/tin-bong-da/tag/`);
  };

  const breadcrumbs = [
    {
      label: "Tin bóng đá",
      href: "/tin-bong-da/",
    },
    {
      label: "Chủ đề",
    },
  ];

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <h1>
        <WrapTitle title="Danh Sách Chủ Đề" />
      </h1>
      <Box sx={{ px: 1 }}>
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 300,
          }}
        >
          <InputBase
            autoFocus
            name="q"
            size="small"
            defaultValue={q}
            inputRef={searchInput}
            sx={{ ml: 1, flex: 1, padding: "2px 4px" }}
            inputProps={{
              style: {
                padding: 0,
              },
            }}
            placeholder="Nhập từ khóa để tìm..."
            onKeyDown={handleChange}
          />
          {isCloseButton && (
            <IconButton aria-label="xóa" onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          )}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {isLoading ? (
            <IconButton>
              <CircularProgress
                size={28}
                color="primary"
                aria-busy={isLoading}
                aria-describedby="loading-progress"
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
        <h2 className="heading-font my-1 text-sm text-gray-400">
          Các chủ đề xếp theo thứ tự A-Z
        </h2>
        {tagsData.items.length === 0 && <NoData title="Không có chủ đề nào" />}
        {tagsData.items.map((item, key) => (
          <CardCategory key={key} data={item} type="tag" />
        ))}
        {tagsData.numPages > 1 && (
          <Pagination
            count={tagsData.numPages}
            page={tagsData.current}
            color="primary"
            onChange={handleChangePage}
            className="mt-4 flex justify-center"
          />
        )}
      </Box>
    </>
  );
}

export default AllTags;
