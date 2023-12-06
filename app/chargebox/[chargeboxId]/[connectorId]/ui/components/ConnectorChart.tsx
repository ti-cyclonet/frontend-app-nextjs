import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export type ChartValue = {
  label: string[],
  dataValue: number[],
  backgroundColor: string[],
  hoverBackgroundColor: string[]
};

const RoundChart: React.FC<ChartValue> = ({ label, dataValue, backgroundColor, hoverBackgroundColor }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: label,
      datasets: [
        {
          data: dataValue,
          backgroundColor,
          hoverBackgroundColor,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div  className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        style={{ position: "relative", width: "20%", margin: "auto" }}
      />
    </div>
  );
}

export default RoundChart;
