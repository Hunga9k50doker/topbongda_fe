import React from "react";
import Pagination from "@mui/material/Pagination";
import { useParams, useRouter } from "next/navigation";
import { TeamModel } from "@/models/team_model";
import { FanModel } from "@/models/fan_model";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowCollapse from "@/components/common/RowCollapse";
import NoData from "@/components/common/NoData";

interface TeamFansProps {
  teamDetail: TeamModel;
  fans: FanModel;
}

function TeamFans({ teamDetail, fans, ...props }: TeamFansProps) {
  const { slugCode } = useParams();
  const router = useRouter();

  const handleChangePage = (e: any, page1: number) => {
    router.push(`/doi-bong/${slugCode}/fans?page=${page1}`);
  };

  return (
    <div>
      {fans && !Boolean(fans.items.length) && (
        <NoData title="Hãy trở thành fan chân chính đầu tiên nào!" />
      )}
      {fans && fans.items.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Thành viên</TableCell>
                  <TableCell align="right">Thông tin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fans.items.map((item) => (
                  <RowCollapse key={item.name} data={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {fans.numPages > 1 && (
            <Pagination
              color="primary"
              count={fans.numPages}
              page={fans.current}
              onChange={handleChangePage}
              className="mt-4 flex justify-center"
            />
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(TeamFans);
