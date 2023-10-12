import { MatchDetailModel } from "@/models/match_model";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Stack,
  ListItemText,
} from "@mui/material";
import React from "react";
import { LineupImage } from "@/assets/images";
import { useTheme } from "@mui/material/styles";
import LineupItem from "@/components/Pages/MatchDetailPage/LineupItem";
import WrapTitle from "@/components/common/WrapTitle";
import NoData from "@/components/common/NoData";
interface LineupProps {
  data: MatchDetailModel;
}

const Lineup = ({ data }: LineupProps) => {
  const { homeLineup, awayLineup } = data;
  const theme: any = useTheme();
  if (!homeLineup.startXi || !awayLineup.startXi) {
    return <NoData />;
  }
  return (
    <>
      <Stack sx={{ px: 1 }} direction={"row"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {data.homeLineup.team.name}{" "}
        </Typography>
        <Typography>{data.homeLineup.formation} </Typography>
      </Stack>
      <Box
        sx={{
          background: `${theme.palette.custom.gradientOverlay}, url(${LineupImage.src}) no-repeat center center`,
        }}
      >
        <Divider />
        <LineupItem data={data.homeLineup} />
        <LineupItem reverse={true} data={data.awayLineup} />
        <Divider />
      </Box>
      <Stack sx={{ px: 1 }} direction={"row"} justifyContent={"space-between"}>
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {data.awayLineup.team.name}{" "}
        </Typography>
        <Typography>{data.awayLineup.formation} </Typography>
      </Stack>
      <WrapTitle title="Đội hình dự bị" />
      <Grid container sx={{ px: 1 }} columnSpacing={1}>
        <Grid
          item
          xs={6}
          sx={{
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {data.homeLineup.team.name}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            fontWeight: 600,
            fontSize: 16,
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        >
          {data.awayLineup.team.name}{" "}
        </Grid>
        <Grid item xs={6}>
          {homeLineup.substitutes.map((item, index) => (
            <ListItemText
              key={index}
              primary={`${item.player.number}. ${item.player.name}`}
              secondary={renderPosition(item.player.pos)}
            />
          ))}
        </Grid>
        <Grid item xs={6}>
          {awayLineup.substitutes.map((item, index) => (
            <ListItemText
              key={index}
              sx={{
                justifyContent: "flex-end",
              }}
              secondaryTypographyProps={{ textAlign: "right" }}
              primaryTypographyProps={{
                textAlign: "right",
              }}
              primary={`${item.player.name}.${item.player.number}`}
              secondary={renderPosition(item.player.pos)}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Lineup);

const renderPosition = (title: string) => {
  switch (title) {
    case "G":
      return "Thủ môn";
    case "D":
      return "Hậu vệ";
    case "M":
      return "Tiền vệ";
    case "F":
      return "Tiền đạo";
    default:
      return title;
  }
};
