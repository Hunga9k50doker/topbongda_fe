"use client";
import React from "react";
import MatchItem from "@/components/Soccer/MatchItem";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getMatchesListAPI } from "@/apis/soccer_apis";
import { numberWithCommas } from "@/utils";
import HTMLReactParser from "html-react-parser";
import RelatedTopicsHeadlineItem from "@/components/Soccer/RelatedTopicsHeadlineItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WrapTitle from "@/components/common/WrapTitle";
import { MatchDataModel } from "@/models/match_model";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import { TeamModel } from "@/models/team_model";
import { TableHead } from "@mui/material";

interface TeamOverviewProps {
  slugCode: string;
  teamDetail: TeamModel;
  matchesData: MatchDataModel<any>;
  relatedTopics: any;
}

function TeamOverview({
  slugCode,
  teamDetail,
  matchesData,
  relatedTopics,
  ...props
}: TeamOverviewProps) {
  const [items, setItems] = React.useState(matchesData.data);
  const [hasNext, setHasNext] = React.useState(matchesData.hasNext);
  const [currentPage, setCurrentPage] = React.useState(matchesData.current);

  const handleLoadMore = React.useCallback(() => {
    const p = {
      db: teamDetail.code,
      page: currentPage + 1,
    };
    getMatchesListAPI(p)
      .then((r) => {
        const d = r.data;
        setItems([...items, ...d.data]);
        setCurrentPage(d.current);
        setHasNext(d.hasNext);
      })
      .catch((e) => {});
  }, [currentPage, items]);

  return (
    <div className="pb-12">
      <WrapTitle title={`Tổng quan ${teamDetail.name}`} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead />
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-400">Thành lập </TableCell>
              <TableCell align="right">{teamDetail.foundedYear}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Nickname</TableCell>
              <TableCell align="right">{teamDetail.nickName || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Tên khác</TableCell>
              <TableCell align="right">{teamDetail.nameAlt || "-"}</TableCell>
            </TableRow>
            {teamDetail.venue ? (
              <>
                <TableRow>
                  <TableCell className="text-gray-400">Sân đấu</TableCell>
                  <TableCell align="right">
                    {teamDetail.venue.name}
                    {teamDetail.venue.capacity > 0 && (
                      <span className="ml-1">
                        ({numberWithCommas(teamDetail.venue.capacity)} chỗ ngồi)
                      </span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-400">Địa chỉ</TableCell>
                  <TableCell align="right">
                    {teamDetail.venue.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-400">Thành phố</TableCell>
                  <TableCell align="right">
                    {teamDetail.city || teamDetail.venue?.city}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell className="text-gray-400">Sân đấu</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-400">Địa chỉ</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-400">Thành phố</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
              </>
            )}
            <TableRow>
              <TableCell className="text-gray-400">Quốc gia</TableCell>
              <TableCell align="right">{teamDetail.country}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <h2>
        <WrapTitle title={`Lịch thi đấu bóng đá ${teamDetail.name}`} />
      </h2>
      {items?.map((item, idx) => (
        <Card className="mb-4" key={`${item[0]}-${idx}`}>
          <div className="mt-4 mb-2">
            <h2 className="uppercase text-sm font-bold text-primary border-0 border-l-4 border-solid border-primary/40 pl-2">
              {item[1]}
            </h2>
          </div>

          {item[2].map((mi: any, key: number) => (
            <MatchItem
              key={key}
              matchItem={mi}
              viewStatus={true}
              showLeagueName
              style={styles}
            />
          ))}
          <Divider />
        </Card>
      ))}

      <div className="px-4 mb-4">
        {hasNext ? (
          <LoadMoreButton loadMore={handleLoadMore} />
        ) : (
          <p className="text-xs text-center italic">~ hết danh sách ~</p>
        )}
      </div>

      {teamDetail.desc.length > 0 && (
        <Card className="mb-4">
          <CardContent component="article">
            <h2 className="text-primary font-bold heading-font mb-2">
              Thông tin về {teamDetail.name}
            </h2>

            <div className="wiki">{HTMLReactParser(teamDetail.desc || "")}</div>
          </CardContent>
        </Card>
      )}

      {relatedTopics.items.length > 0 && (
        <>
          <WrapTitle title="Các bài viết liên quan"></WrapTitle>
          {relatedTopics.items.slice(0, 10).map((item: any, key: number) => (
            <RelatedTopicsHeadlineItem key={key} item={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default React.memo(TeamOverview);

const styles = {
  "& img": {
    width: "24px",
    height: "24px",
  },
  "& h4": {
    fontSize: "16px",
  },

  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
};
