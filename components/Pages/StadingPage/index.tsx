"use client";
import React from "react";
import LeagueStanding from "@/components/Pages/LeagueDetailPage/LeagueStanding";
import NoData from "@/components/common/NoData";
import CompetitionSelect from "@/components/common/CompetitionSelect";
import TeamSelect from "@/components/Pages/CreatePostPage/TeamSelect";
import { Form } from "antd";
import { getStandingAPI } from "@/apis/soccer_apis";
import {
  Button,
  MenuItem,
  Box,
  Stack,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import WrapTitle from "@/components/common/WrapTitle";
import { seasons } from "@/assets/database/seasons";
import { updateLoading } from "@/reducers/loadingSlice";
import { store } from "@/store";

const StadingContent = () => {
  const [standingData, setStandingData] = React.useState<any>(null);
  const [initLeagues, setInitLeagues] = React.useState([]);
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const p = {
      competitionSlug: values.competitionSlug.slug,
      teamCode: values?.teamCode?.code || "",
      season: values?.season || "",
    };
    store.dispatch(updateLoading(true));
    getStandingAPI(p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          setStandingData(d.data);
        }
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      })
      .catch(() =>
        setTimeout(() => store.dispatch(updateLoading(false)), 1000)
      );
  };

  const handleChange = (values: any) => {
    setInitLeagues(values?.competitionSlug?.name || []);
  };

  return (
    <Box>
      <WrapTitle title="Bộ lọc" />
      <Form
        onFinish={handleFinish}
        form={form}
        style={{ padding: 8 }}
        onValuesChange={handleChange}
      >
        <Form.Item
          name="competitionSlug"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giải đấu",
            },
          ]}
        >
          <CompetitionSelect multiple={false} />
        </Form.Item>
        <Form.Item name="teamCode">
          <TeamSelect initLeagues={initLeagues} multiple={false} />
        </Form.Item>
        <FormControl fullWidth>
          <InputLabel id="season">Mùa giải</InputLabel>
          <Form.Item name="season" initialValue={seasons[0].value}>
            <Select labelId="season" label="Chọn mùa giải" fullWidth>
              {seasons.map((season: any) => (
                <MenuItem value={season.value} key={season.value}>
                  {season.title}
                </MenuItem>
              ))}
            </Select>
          </Form.Item>
        </FormControl>
        <Stack alignItems={"flex-end"}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            className="bg-primary hover:bg-success"
          >
            Lọc
          </Button>
        </Stack>
        <Typography className="mt-4 text-xs text-gray-400">
          (*) Bạn có thể nhập từ khóa để tìm kiếm đội bóng, giải đấu. Mặc định
          là những đội bóng, giải đấu được đề cử.
        </Typography>
      </Form>
      <WrapTitle title="Bảng xếp hạng" />
      {!Boolean(standingData) && <NoData />}
      {Boolean(standingData) && <LeagueStanding standingData={standingData} />}
    </Box>
  );
};

export default StadingContent;
