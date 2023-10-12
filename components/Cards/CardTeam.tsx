import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TeamModel } from "@/models/team_model";
import { Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Image from "next/legacy/image";
import CustomLink from "@/components/common/CustomLink";
import { DEFAULT_TEAM_ICON } from "@/constants";
interface CardTeamProps {
  data: TeamModel;
  style?: any;
  viewFollow?: boolean;
  onCancelFollowTeam?: (item: any) => void;
}

const CardTeam = ({
  data,
  style,
  viewFollow,
  onCancelFollowTeam,
}: CardTeamProps) => {
  const theme: any = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const onCancel = (e: any, item: TeamModel) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);

    Promise.resolve(onCancelFollowTeam && onCancelFollowTeam(item))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      )
      .catch(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  };

  return (
    <Stack
      component={CustomLink}
      href={data.url || `/doi-bong/${data.code}`}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        ...style,
        background: theme.palette.background.paper,
        my: 1,
        p: 1,
        borderRadius: 1,
        boxShadow: `0 1px 2px ${theme.palette.custom.boxShadow}`,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Image
          src={data.logo || DEFAULT_TEAM_ICON}
          alt={data.name}
          width={40}
          height={40}
          objectFit="contain"
        />
        <Stack>
          <Typography component={"p"} variant="h6" sx={{ fontSize: 16 }}>
            {data.name}
          </Typography>
          {data.numFans > 0 && (
            <Typography variant="body2">{data.numFans} fans</Typography>
          )}
        </Stack>
      </Stack>
      {viewFollow && (
        <Tag
          icon={isLoading ? <SyncOutlined spin /> : ""}
          onClick={(e) => onCancel(e, data)}
          style={{
            margin: 0,
            padding: "0 2px",
            width: "fit-content",
            fontSize: 10,
            fontWeight: 700,
            lineHeight: "16px",
            display: "flex",
            alignItems: "center",
          }}
          color="error"
        >
          Bỏ theo dõi
        </Tag>
      )}
    </Stack>
  );
};

export default React.memo(CardTeam);
