"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import WrapTitle from "@/components/common/WrapTitle";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CardCompetitionItem from "@/components/Cards/CardCompetitionItem";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonCustom from "@/components/common/ButtonCustom";
import AbcIcon from "@mui/icons-material/Abc";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import PopoverCustom from "@/components/common/PopoverCustom";
import NoData from "@/components/common/NoData";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface LeaguesPageProps {
  competitionData: any;
  page: number;
  q: string;
  s: string;
}

function LeaguesPage({
  competitionData,
  page,
  q = "",
  s = "",
  ...props
}: LeaguesPageProps) {
  const breadcrumbs = [
    {
      label: "Giải đấu",
    },
  ];
  const router = useRouter();
  const theme: any = useTheme();
  const [view, setView] = React.useState<"list" | "grid" | null>("list");
  const refInput: any = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowClear, setIsShowClear] = React.useState(Boolean(q.length));

  const handleChangePage = (e: any, page1: number) => {
    router.push(`/giai-dau/?s=${s}&q=${q}&page=${page1}`);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "list" | "grid" | null
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value !== "") return setIsShowClear(true);
    setIsShowClear(false);
  };

  const onClear = () => {
    refInput.current.value = "";
    setIsShowClear(false);
    router.push(`/giai-dau`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refInput.current.value?.trim() === "") return;
    else {
      setIsLoading(true);
      router.push(`/giai-dau/?q=${refInput.current.value}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "2px 8px",
          display: "flex",
          alignItems: "center",
          minWidth: 300,
        }}
      >
        <PopoverCustom
          icon={<AbcIcon sx={{ color: theme.palette.primary.main }} />}
        >
          <div className="flex flex-wrap items-center gap-1 py-4 pl-4">
            <ButtonCustom
              component={Link}
              href="/giai-dau/"
              disabled={!Boolean(s) && !Boolean(q)}
            >
              Tất cả
            </ButtonCustom>
            {alphabet.map((char) => (
              <ButtonCustom
                component={Link}
                href={`/giai-dau/?s=${
                  char === "#" ? "others" : char.toLowerCase()
                }`}
                disabled={
                  Boolean(s === char.toLocaleLowerCase()) ||
                  (Boolean(s === "others") && char === "#")
                }
                key={char}
              >
                {char}
              </ButtonCustom>
            ))}
          </div>
        </PopoverCustom>
        <InputBase
          inputRef={refInput}
          onChange={handleChangeInput}
          name="q"
          defaultValue={q}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nhập tên giải đấu để tìm..."
          inputProps={{ "aria-label": "Nhập tên giải đấu để tìm" }}
        />
        {isShowClear && (
          <IconButton
            onClick={onClear}
            size="small"
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
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
            size="small"
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            type="submit"
          >
            <SearchIcon />
          </IconButton>
        )}
      </Paper>
      <h1>
        {!Boolean(s) && !Boolean(q) && (
          <WrapTitle title="Danh sách các giải đấu bóng đá hàng đầu thế giới" />
        )}
        {s.length > 0 && (
          <WrapTitle
            title={`Những giải đấu bắt đầu bằng ký tự "
                ${s === "others" ? "#" : s.toUpperCase()}"`}
          />
        )}
        {q.length > 0 && (
          <WrapTitle title={`Những giải đấu có từ khóa "${q.toUpperCase()}"`} />
        )}
      </h1>
      <div className="container mx-auto px-4 pb-12">
        <h2 className="font-bold text-xs text-gray-400">
          Những giải đấu phổ biến được xếp lên trước
        </h2>
        <div className="text-xs text-gray-400 mb-2">
          Trang {competitionData?.current} của danh sách{" "}
          {competitionData?.total} giải đấu
        </div>
        {competitionData?.total > 2 && (
          <ToggleButtonGroup
            orientation="horizontal"
            value={view}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="list" aria-label="list">
              <ViewListIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid">
              <ViewModuleIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
        {competitionData?.total === 0 && (
          <NoData title="Không có giải đấu nào phù hợp" />
        )}
        <div
          className={`grid ${
            view === "list" ? "grid-cols-1" : "grid-cols-2"
          } gap-2 mb-8 mt-4`}
        >
          {competitionData?.items.map((item: any) => (
            <CardCompetitionItem view={view} key={item.url} item={item} />
          ))}
        </div>
        {competitionData.numPages > 1 && (
          <Pagination
            count={competitionData.numPages}
            page={competitionData.current}
            color="primary"
            onChange={handleChangePage}
            className="mt-4 flex justify-center"
          />
        )}
      </div>
    </>
  );
}

export default LeaguesPage;
