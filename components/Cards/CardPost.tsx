import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Divider, Box, Avatar, Chip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CustomLink from "@/components/common/CustomLink";
import { TopicDetailModel } from "@/models/topic_model";
import { getMediaURL } from "@/utils";
import HTMLReactParser from "html-react-parser";
import ParagraphSmall from "@/components/common/Text/ParagraphSmall";
import ListActions from "@/components/common/ListActions";
import AvatarCustom from "@/components/common/AvatarCustom";
import ChipLevel from "@/components/Chips/ChipLevel";
import ListTrophies from "@/components/common/ListTrophies";
import { DEFAULT_AVATAR } from "@/constants";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import Link from "next/link";
import TimeAgoShort from "@/components/TimeAgoShort";
import { useMount } from "react-use";
interface CardPostProps {
  data: TopicDetailModel;
  isViewDetail?: boolean;
  isShowFolows?: boolean;
  isViewPorifile?: boolean;
}

export default React.memo(function CardPost({
  data,
  isViewDetail = false,
  isShowFolows = true,
  isViewPorifile = false,
}: CardPostProps) {
  const theme: any = useTheme();
  const [isMount, setIsMount] = React.useState(false);
  useMount(() => setIsMount(true));
  if (!data?.user) return null;
  const { user } = data;
  return (
    <Card
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxShadow: `0 1px 4px ${theme.palette.custom.boxShadow}`,
      }}
    >
      <CardHeader
        avatar={
          isViewPorifile ? (
            <Avatar
              alt={user.name}
              sx={{
                border: `2px solid ${user.levelColor || "#fff"}`,
              }}
              imgProps={{
                loading: "lazy",
                width: 40,
                height: 40,
              }}
              src={
                getMediaURL(user.avatarUrl || user?.avatarSet?.og) ||
                DEFAULT_AVATAR
              }
            />
          ) : (
            <CustomLink href={user.url}>
              <AvatarCustom data={user} />
            </CustomLink>
          )
        }
        color="text.primary"
        sx={{
          fontWeight: 600,
          p: 1,
          "& .MuiCardHeader-avatar": {
            marginRight: "8px",
          },
        }}
        titleTypographyProps={{
          variant: "h6",
          component: CustomLink,
          href: user.url,
          fontSize: 14,
        }}
        subheaderTypographyProps={{ fontSize: 12 }}
        title={
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            {user.name}
            <ListTrophies data={user} style={{ width: 16, height: 16 }} />
          </Stack>
        }
        subheader={
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
            <ChipLevel data={user} />
            <FiberManualRecordIcon sx={{ width: 8, height: 8 }} />
            <ParagraphSmall variant="body2" color="text.secondary">
              {isMount && <TimeAgoShort datetimeStr={data.publishedAt} />}
              {data.editedAt && "(Đã chỉnh sửa)"}
            </ParagraphSmall>
          </Stack>
        }
      />
      <Divider />
      <Typography component={isViewDetail ? "h1" : "h2"}>
        <Link
          color={theme.palette.text.primary}
          aria-label="link"
          href={data.url}
          className={`line-clamp-2 ${isViewDetail ? "text-xl" : "text-lg"}`}
          style={{ padding: "0 8px", fontWeight: 600 }}
        >
          {data.title ? data.title : `Bài viết của ${user.name}`}
        </Link>
      </Typography>

      <CardContent sx={{ pb: 1, pt: 0, px: 1 }}>
        {isViewDetail ? (
          <Box className="my-2 text-lg">
            {HTMLReactParser(data.contentSafe)}
          </Box>
        ) : (
          <Typography
            component={Link}
            aria-label="link"
            href={data.url}
            sx={{
              mb: 1,
              fontWeight: 400,
              "& strong": {
                fontWeight: 400,
                color: `${theme.palette.text.primary} !important`,
              },
            }}
            color="text.primary"
            className="line-clamp-3 text-md"
          >
            {HTMLReactParser(data.contentPreview || "")}
          </Typography>
        )}

        <Stack direction={"row"} flexWrap={"wrap"} rowGap={1} mb={1}>
          {data.category && (
            <ChipCustom
              href={data.category.url}
              title={data.category.name}
              isViewDetail={isViewDetail}
            />
          )}
          {Boolean(data.teams) &&
            data.teams.map((team: any, key) => (
              <ChipCustom
                key={key}
                href={team.url}
                title={team.name}
                isViewDetail={isViewDetail}
              />
            ))}
          {Boolean(data.competitions) &&
            data.competitions.map((competition: any, key) => (
              <ChipCustom
                key={key}
                href={competition.url}
                title={competition.name}
                isViewDetail={isViewDetail}
              />
            ))}
        </Stack>
        {!isViewDetail && (
          <Typography
            component={Link}
            href={data.url}
            color={"GrayText"}
            sx={{
              fontWeight: 500,
              fontSize: 14,
              fontStyle: "italic",
              margin: "8px 0",
            }}
          >
            Xem chi tiết
            <ArrowRightAltOutlinedIcon fontSize="small" />
          </Typography>
        )}
      </CardContent>
      <Divider sx={{ mx: 2 }} />
      <ListActions type="topic" data={data} isViewDetail={isViewDetail} />
    </Card>
  );
});

const ChipCustom = ({
  title,
  href,
  isViewDetail = false,
}: {
  title: string;
  href: string;
  isViewDetail?: boolean;
}) => {
  return (
    <Chip
      label={title}
      component={Link}
      href={href}
      size="small"
      variant="outlined"
      className={`truncate mx-1 items-center ${
        isViewDetail ? "" : "max-w-[160px]"
      }`}
    />
  );
};
