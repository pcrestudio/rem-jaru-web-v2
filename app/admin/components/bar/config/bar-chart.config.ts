import { BarChartType } from "@/app/admin/types/ChartDataType";

const barChartOptionConfig = (
  title: string,
  combinedData: number[],
  categoryAxisData: string[],
  colors: string[],
  type: string,
) => {
  const isVertical = type === BarChartType.vertical;
  const total = combinedData.reduce((sum, value) => sum + value, 0); // Calculate the total sum of all values

  return isVertical
    ? {
        title: {
          text: title.toUpperCase(),
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params: any) {
            const value = params[0].value;
            const percent = ((value / total) * 100).toFixed(2);

            return `${params[0].name}: ${!isNaN(Number(percent)) ? percent : Number(0).toFixed(2)}%`;
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
          minInterval: 1,
          axisLabel: {
            formatter: "{value}", // Keep raw numbers for x-axis labels
          },
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params: any) {
            const value = params[0].value;
            const percent = ((value / total) * 100).toFixed(2); // Calculate percentage

            return `${params[0].name}: ${percent}%`;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: categoryAxisData,
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLabel: {
            formatter: "{value}", // Keep raw numbers for y-axis labels
          },
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
