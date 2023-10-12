import React from "react";
import { Stack, Typography } from "@mui/material";
import {
  MATCH_STATUS_FINISH,
  MATCH_STATUS_INCOMING,
  MATCH_STATUS_UPCOMING,
  MATCH_STATUS_OTHER,
} from "@/configs/constants";
import { Tag } from "antd";
import { MatchDetailModel } from "@/models/match_model";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalVideo from "@/components/Modal/ModalVideo";
import { SyncOutlined } from "@ant-design/icons";
import { styled } from "@mui/material/styles";
import CountdownCustom from "@/components/common/CountDown";

interface RenderStatusProps {
  status: string;
  data: MatchDetailModel;
}
const RenderStatus = ({ status, data }: RenderStatusProps) => {
  const { updateModal } = React.useContext(ModalContext);
  const handleLiveVideo = (url: string) => {
    updateModal(
      "modal-live-soccer",
      <ModalVideo url={url} matchDetail={data} />
    );
  };
  if (MATCH_STATUS_UPCOMING.includes(status)) {
    return (
      <>
        <CountdownCustom date={data.kickOffAt} />
        <TagCustom color={"processing"} className="upcoming">
          Sắp diễn ra
        </TagCustom>
      </>
    );
  }
  if (MATCH_STATUS_OTHER.includes(status)) {
    return (
      <>
        <CountdownCustom date={data.kickOffAt} />
        <TagCustom>{data.matchStatusTitle}</TagCustom>
      </>
    );
  }
  if (MATCH_STATUS_INCOMING.includes(status)) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        className="truncate"
      >
        <TypographyCustom
          className="score"
          component={"p"}
          variant="subtitle1"
          fontWeight={"bold"}
        >
          {data.homeGoals || 0} - {data.awayGoals || 0}
        </TypographyCustom>
        {data.timeElapsed > 0 && (
          <TypographyCustom
            component={"p"}
            variant="subtitle1"
            fontSize={"small"}
            color="primary"
            fontWeight={"bold"}
            className="timeElapsed"
          >
            {data.timeElapsed}&apos;
          </TypographyCustom>
        )}
        {data.liveVideoUrl ? (
          <TagCustom
            style={{
              margin: 0,
              cursor: "pointer",
            }}
            color="succeess"
            onClick={() => handleLiveVideo(data.liveVideoUrl)}
          >
            Xem ngay
          </TagCustom>
        ) : (
          <TagCustom
            className="flex items-center justify-center"
            color="success"
            icon={<SyncOutlined spin />}
          >
            {data.matchStatusTitle || "Đang diễn ra"}
          </TagCustom>
        )}
      </Stack>
    );
  }
  if (MATCH_STATUS_FINISH.includes(status)) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        className="truncate"
      >
        <TypographyCustom
          component={"p"}
          variant="subtitle1"
          className="score"
          color="primary"
          fontWeight={"bold"}
        >
          {data.homeGoals || 0} - {data.awayGoals || 0}
        </TypographyCustom>
        <TagCustom color="error">Đã kết thúc</TagCustom>
      </Stack>
    );
  }
  return <></>;
};

export default React.memo(RenderStatus);

const TypographyCustom = styled(Typography)(({ theme }: any) => ({
  color: theme.palette.custom.lightGreen,
})) as typeof Typography;

const TagCustom = styled(Tag)(({ theme }: any) => ({
  "&": {
    padding: "0 2px !important",
    width: "fit-content",
    fontSize: "10px !important",
    fontWeight: 700,
    lineHeight: "16px !important",
    display: "flex",
    alignItems: "center",
    margin: "0 !important",
  },
}));
