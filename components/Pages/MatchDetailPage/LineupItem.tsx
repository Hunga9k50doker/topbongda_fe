import { LineupModel } from "@/models/match_model";
import { Grid, Typography, Box } from "@mui/material";
import React from "react";
interface LineupItemProps {
  data: LineupModel;
  reverse?: boolean;
}

const LineupItem = ({ data, reverse = false }: LineupItemProps) => {
  const teamFormation = data.formation.split("-");
  const lineGoalie = data.startXi.slice(0, 1);
  let position = 1;
  const linePlayer = React.useMemo(
    () =>
      teamFormation.map((item, key) => {
        let res = [];
        if (key === 0) {
          res = data.startXi.slice(position, position + +item);
          position = position + +item;
        } else {
          res = data.startXi.slice(position, position + +item);
          position = position + +item;
        }
        return res;
      }),
    [teamFormation, data.startXi]
  );
  const lineupTeam = [lineGoalie, ...linePlayer];
  return (
    <>
      {(reverse ? lineupTeam.reverse() : lineupTeam).map((item, key) => (
        <Grid key={key} container justifyContent={"center"}>
          {item.map((subitem, index) => (
            <Grid
              key={index}
              item
              xs={"auto"}
              flex={1}
              justifyContent={"center"}
              sx={{
                padding: 1,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "24px",
                  height: "24px",
                  border: `1px solid #ccc`,
                  background: `${reverse ? "#BB011E" : "#059FEA"}`,
                  borderRadius: "50%",
                  margin: "0 auto",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {subitem.player.number}
              </Box>
              <Typography variant={"body2"} fontSize={"small"}>
                {subitem.player.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

export default LineupItem;
