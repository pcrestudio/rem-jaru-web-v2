import { BarChartType } from "@/app/admin/types/ChartDataType";

const barChartOptionConfig = (
  title: string,
  combinedData: number[],
  categoryAxisData: string[],
  colors: string[],
  type: string,
) => {
  return type === BarChartType.vertical
    ? {
        title: {
          text: title.toUpperCase(),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: categoryAxisData,
        },
        series: [
          {
            type: "bar",
            data: combinedData.map((value, index) => ({
              value,
              itemStyle: {
                color: colors[index % colors.length],
              },
            })),
          },
        ],
      }
    : {
        title: {
          text: title.toUpperCase(),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: categoryAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: combinedData.map((value, index) => ({
              value,
              itemStyle: {
                color: colors[index % colors.length],
              },
            })),
          },
        ],
      };
};

export default barChartOptionConfig;
