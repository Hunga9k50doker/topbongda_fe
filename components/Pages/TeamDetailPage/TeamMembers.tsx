import React from "react";
import { TeamModel, TeamMemberDataModel } from "@/models/team_model";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowPlayerCollapse from "@/components/common/RowPlayerCollapse";
import NoData from "@/components/common/NoData";
interface TeamMembersProps {
  teamDetail: TeamModel;
  teamMember: TeamMemberDataModel;
}

function TeamMembers({ teamMember, teamDetail, ...props }: TeamMembersProps) {
  const members = teamMember.player;
  return (
    <div>
      {!Boolean(members.length) && <NoData />}
      {members.length > 0 && (
        <div className="overflow-x-auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Danh sách</TableCell>
                  <TableCell align="right">Thông tin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMember.coach.name && (
                  <RowPlayerCollapse data={teamMember.coach} />
                )}
                {members.map((item: any, key) => (
                  <RowPlayerCollapse key={key} data={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default React.memo(TeamMembers);
