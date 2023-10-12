import React from "react";
import { Stack } from "@mui/material";
import { formatDate, numberFormatter, numberWithCommas } from "@/utils";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { styled, useTheme } from "@mui/material/styles";
import { Datum } from "@/models/user_model";
import dayjs from "dayjs";
import { useWindowSize } from "react-use";

interface LineChartProps {
  data: Datum[];
}

function LineChart({ data }: LineChartProps) {
  const theme = useTheme();
  const { width } = useWindowSize();
  const [chartOptions, setChartOptions] = React.useState<Highcharts.Options>({
    rangeSelector: {
      // buttons: [],
      // inputDateFormat: "%d-%m-%Y",
      // inputEditDateFormat: "%d-%m-%Y",
      // inputStyle: {
      //   color: theme.palette.primary.main,
      // },
      enabled: false,
    },
    chart: {
      backgroundColor: "transparent",
      type: "line",
      height: 360,
      width: width - 16,
    },
    navigator: {
      maskFill: "rgba(255,255,255,0.1)",
    },
    colors: [theme.palette.primary.main],
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        style: {
          color: "#ccc",
        },
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return `<p >${dayjs(this.value).format("DD/MM")}<br/>
          ${dayjs(this.value).format("HH:mm")}</p>`;
        },
        style: {
          color: "#ccc",
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: theme.palette.background.paper,
      shared: true,
      useHTML: true,
      valueDecimals: 2.5,
      headerFormat: "",
      pointFormatter: function () {
        return (
          `<p className="text-xs">${formatDate(new Date(this.x))}</p>` +
          '<span className="text-xs" style="color:{point.color}">\u25CF</span> ' +
          `<span className="text-xs">Kinh nghiệm: </span>` +
          `<strong className="text-sm" style="color:${
            Number(this.y) < 0 ? "red" : "green"
          }">${
            Number(this.y) < 1e4
              ? numberWithCommas(this.y || 0)
              : numberFormatter(this.y)
          }</strong>` +
          "</b><br/>"
        );
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 2,
        },
      },
    },
    series: [
      {
        type: "line",
        data: [],
      },
    ],
  });

  const updateSeries = () => {
    const newSeries = data.map((item) => [
      new Date(item.createdAt).getTime(),
      item.exp,
    ]);
    setChartOptions({
      ...chartOptions,
      series: [
        {
          type: "line",
          data: newSeries.reverse(),
        },
      ],
    });
  };

  React.useEffect(() => {
    if (data.length > 0) updateSeries();
  }, [data]);

  return (
    <>
      {
        <Stack>
          <Stack alignItems={"center"} sx={{ p: 1 }}>
            <StyleChartCustom>
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={"stockChart"}
              />
            </StyleChartCustom>
          </Stack>
        </Stack>
      }
    </>
  );
}

export default React.memo(LineChart);

const StyleChartCustom = styled("div")(({ theme }) => ({}));
