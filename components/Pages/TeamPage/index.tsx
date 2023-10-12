"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import WrapTitle from "@/components/common/WrapTitle";
import { TeamDataModel } from "@/models/team_model";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CardTeam from "@/components/Cards/CardTeam";
import PopoverCustom from "@/components/common/PopoverCustom";
import ButtonCustom from "@/components/common/ButtonCustom";
import AbcIcon from "@mui/icons-material/Abc";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
interface TeamsContentProps {
  data: TeamDataModel;
  featured: string;
  q: string;
  s: string;
}

function TeamsContent({
  q = "",
  s = "",
  data,
  featured,
  ...props
}: TeamsContentProps) {
  const breadcrumbs = [
    {
      label: "Đội bóng",
    },
  ];
  const router = useRouter();
  const theme: any = useTheme();
  const refInput: any = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowClear, setIsShowClear] = React.useState(Boolean(q.length));
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value !== "") return setIsShowClear(true);
    setIsShowClear(false);
  };

  const onClear = () => {
    refInput.current.value = "";
    setIsShowClear(false);
    router.push(`/doi-bong`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refInput.current.value?.trim() === "") return;
    else {
      setIsLoading(true);
      router.push(`/doi-bong/?q=${refInput.current.value}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const handleChangePage = (e: any, page: number) => {
    router.push(`/doi-bong/?s=${s}&q=${q}&page=${page}`);
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
              href="/doi-bong/"
              disabled={!Boolean(s) && !Boolean(q)}
            >
              Nổi tiếng
            </ButtonCustom>
            {alphabet.map((char) => (
              <ButtonCustom
                component={Link}
                href={`/doi-bong/?s=${
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
          onChange={handleChange}
          name="q"
          defaultValue={q}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Nhập tên đội bóng để tìm..."
          inputProps={{ "aria-label": "Nhập tên đội bóng để tìm" }}
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
              size={28}
              color="success"
              aria-busy={isLoading}
              aria-describedby="loading-progress"
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
      {featured === "yes" ? (
        <h1>
          <WrapTitle title="Những đội bóng nổi tiếng" />
        </h1>
      ) : (
        <>
          {s.length > 0 && (
            <h1>
              <WrapTitle
                title={`Những đội bóng bắt đầu bằng ký tự "
                ${s === "others" ? "#" : s.toUpperCase()}"`}
              />
            </h1>
          )}
          {q.length > 0 && (
            <h1>
              <WrapTitle
                title={`Những đội bóng có từ khóa "${q.toUpperCase()}"`}
              />
            </h1>
          )}
        </>
      )}
      <div className="mx-auto px-2 pb-6">
        {data.items.length > 0 &&
          data.items.map((item) => <CardTeam key={item.url} data={item} />)}

        {data.items.length === 0 && (
          <p className="text-sm italic text-center">Không có đội bóng nào.</p>
        )}
        {data.numPages > 1 && (
          <Pagination
            className="flex justify-center"
            count={data.numPages}
            page={data.current}
            color="primary"
            onChange={handleChangePage}
          />
        )}
      </div>
      <h2>
        <WrapTitle
          title={`TeamModel Bóng đá và sự phát triển của Mạng xã hội`}
        />
      </h2>
      <article className="mt-4 text-slate-600 text-sm px-2 pb-4">
        <p>
          Bóng đá được mệnh danh là &quot;môn thể thao vua&quot; và thu hút sự
          chú ý của đại đa số người dân trên toàn thế giới. Sự yêu mến của các
          CĐV không chỉ có ý nghĩa về mặt tinh thần, mà nó còn giúp các doanh
          nghiệp đội bóng thu về những khoản thu khổng lồ từ việc bán vé, bán áo
          đấu,...
        </p>
        <p>
          Real Madrid và Barcelona là những câu lạc bộ có nhiều người theo dõi
          nhất trên các kênh phương tiện truyền thông xã hội chính thức.
          Manchester United, đội bóng chỉ mới có tài khoản Twitter chính thức từ
          tháng 4/2021 (3 năm sau Liverpool), là câu lạc bộ phổ biến thứ 3 trên
          mạng xã hội, sau hai đại diện đến từ Tây Ban Nha.
        </p>
        <p>
          Barcelona, Real Madrid, Manchester United, Arsenal, Chelsea, Paris
          Saint-Germain, Juventus và Liverpool thường xuyên góp mặt trong danh
          sách những áo đấu bán chạy nhất. Theo Planet Football, áo đấu sân nhà
          của Liverpool là mẫu được bán chạy nhất trên Amazon cho mùa giải
          2019-20, trong khi áo đấu sân nhà và sân khách của Man Utd, Man City
          và Arsenal đều có mặt trong top 10.
        </p>
        <p>
          Danh sách 50 đội thể thao giá trị nhất hành tinh được Forbes thống kê
          từ 4 môn thể thao, trong đó NFL (giải bóng bầu dục Mỹ) góp mặt nhiều
          đại diện nhất với 26 đội. Tiếp theo là bóng rổ (9), bóng đá (9) và
          bóng chày (6).
        </p>
      </article>
    </>
  );
}

export default React.memo(TeamsContent);
