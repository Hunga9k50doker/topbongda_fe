import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate, numberWithCommas } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import { UserModel } from "@/models/user_model";
import SocialLinks from "@/components/common/SocialLinks";
import WrapTitle from "@/components/common/WrapTitle";
import TopMembers from "@/components/Pages/HomePage/TopMembers";
const InfoUser = ({ publicProfile }: { publicProfile: UserModel }) => {
  return (
    <div className="main-col">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-400">Tên tài khoản</TableCell>
              <TableCell align="right">{publicProfile.name || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Mã tài khoản</TableCell>
              <TableCell align="right">{publicProfile.code}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">
                Số bài viết diễn đàn
              </TableCell>
              <TableCell align="right">
                {numberWithCommas(publicProfile.numTopics)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Số bình luận</TableCell>
              <TableCell align="right">
                {numberWithCommas(publicProfile.numComments)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Ngày gia nhập</TableCell>
              <TableCell align="right">
                {formatDate(publicProfile.dateJoined, true)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">
                Đội bóng yêu thích
              </TableCell>
              <TableCell align="right">
                {publicProfile?.favoriteTeam?.url ? (
                  <CustomLink
                    href={publicProfile.favoriteTeam.url}
                    className="link"
                  >
                    {publicProfile.favoriteTeam.name}
                  </CustomLink>
                ) : (
                  <span>{publicProfile.favoriteTeam || "-"}</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-400">Mạng xã hội</TableCell>
              <TableCell align="right">
                <SocialLinks data={publicProfile} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <WrapTitle
        title="Top thành viên trong tuần"
        subtitle="Danh sách"
        link="/thanh-vien/danh-sach/"
      />
      <TopMembers />
    </div>
  );
};

export default React.memo(InfoUser);
