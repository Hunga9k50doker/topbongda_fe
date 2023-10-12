import React from "react";
import { useSelector } from "react-redux";
import { Card, Skeleton, Stack } from "@mui/material";
import { RootState } from "@/store";
import useSWR from "swr";
import { getPredictionCountAPI } from "@/apis/prediction_apis";
import { PREDICTION_API_PREDICTIONS_COUNT } from "@/configs/endpoints/prediction_endpoints";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NoData from "@/components/common/NoData";
import { numberFormatter } from "@/utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { styled } from "@mui/material/styles";

interface MyPredictionsChartProps {
  type: string;
}

function MyPredictionsChart({ type }: MyPredictionsChartProps) {
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const [totalPredictions, setTotalPredictions] = React.useState([]);
  const [dataCountPrediction, setDataCountPrediction] = React.useState({
    goalsPrediction: {},
    resultPrediction: {},
    total: {},
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [chartOptions, setChartOptions] = React.useState<Highcharts.Options>({
    chart: {
      backgroundColor: "transparent",
      type: "pie",
      width: 240,
      height: 240,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        colors: [
          "rgba(3, 252, 53, 0.8)",
          "rgba(252, 3, 45, 0.8)",
          "rgba(3, 235, 252, 0.8)",
        ],
        allowPointSelect: true,
        cursor: "pointer",
        tooltip: {
          pointFormatter: function () {
            return (
              '<span style="color:{point.color}">\u25CF</span> ' +
              "Số lần: " +
              numberFormatter(this.y) +
              "</b><br/>"
            );
          },
        },

        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          distance: -50,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
        },
      },
    },
    accessibility: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        data: [
          {
            name: "Dự đoán đúng",
            y: totalPredictions[0],
            //@ts-ignore
            sliced: true,
            selected: true,
          },
          {
            name: "Dự đoán sai",
            y: totalPredictions[1],
          },
          {
            name: "Chưa có kết quả",
            y: totalPredictions[2],
          },
        ],
      },
    ],
  });

  const updateSeries = () => {
    setChartOptions({
      ...chartOptions,
      series: [
        {
          type: "pie",
          data: [
            {
              name: "Dự đoán đúng",
              y: totalPredictions[0],
              //@ts-ignore
              sliced: true,
              selected: true,
            },
            {
              name: "Dự đoán sai",
              y: totalPredictions[1],
            },
            {
              name: "Chưa có kết quả",
              y: totalPredictions[2],
            },
          ],
        },
      ],
    });
  };

  const newType = React.useMemo(() => {
    switch (type) {
      case "G":
        return "goalsPrediction";
      case "R":
        return "resultPrediction";
      default:
        return "total";
    }
  }, [type]);

  useSWR(
    PREDICTION_API_PREDICTIONS_COUNT,
    () => {
      getPredictionList({ user_code: userStore.code });
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getPredictionList = React.useCallback((prs: any) => {
    setIsLoading(true);
    getPredictionCountAPI(prs)
      .then((r) => {
        if (r.data.ok) {
          setDataCountPrediction(r.data.data);
          return r.data.data;
        }
      })
      .catch((e) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setTotalPredictions(Object.values(dataCountPrediction?.[newType]));
  }, [dataCountPrediction, type]);

  React.useEffect(() => {
    updateSeries();
  }, [totalPredictions]);

  const total = React.useMemo(() => {
    return totalPredictions.reduce((a, b) => a + b, 0);
  }, [totalPredictions]);

  return (
    <>
      {totalPredictions.length > 0 && (
        <Stack>
          <Stack alignItems={"center"} sx={{ height: 240 }}>
            <StyleChartCustom>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </StyleChartCustom>
          </Stack>
          <Card className="my-4">
            <List>
              <ListItem className="gap-2">
                <ListItemText
                  primary={numberFormatter(totalPredictions[0]) || "-"}
                  secondary="Chính xác"
                />
                <ListItemText
                  primary={numberFormatter(totalPredictions[1]) || "-"}
                  secondary="Chưa chính xác"
                />
                <ListItemText
                  primary={numberFormatter(totalPredictions[2]) || "-"}
                  secondary="Chưa có kết quả"
                />
                <ListItemText
                  primary={numberFormatter(total) || "-"}
                  secondary="Tổng số dự đoán"
                />
              </ListItem>
            </List>
          </Card>
        </Stack>
      )}
      {totalPredictions.length === 0 && !isLoading && (
        <NoData title="Lỗi tải dữ liệu" />
      )}
      {isLoading && (
        <Skeleton
          className="m-auto"
          variant="circular"
          height={200}
          width={200}
        />
      )}
    </>
  );
}

export default React.memo(MyPredictionsChart);

const StyleChartCustom = styled("div")(({ theme }) => ({}));
