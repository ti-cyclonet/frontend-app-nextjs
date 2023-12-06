"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";

export type ChartAllConectorsProps = {
  label: string[];
  dataValue: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
  totalConnectors: number;
};

export const ChartAllConectors: React.FC<ChartAllConectorsProps> = ({
  label,
  dataValue,
  backgroundColor,
  hoverBackgroundColor,
  totalConnectors,
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartPlugins, setChartPlugins] = useState<any[]>([]);

  useEffect(() => {
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

    const innerLabel = {
      id: "innerLabel",
      afterDatasetDraw(chart: any, args: any, pluginOptions: any) {
        const { ctx } = chart;
        const meta = args.meta;
        const xCoor = meta.data[0].x;
        const yCoor = meta.data[0].y;
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = "0.875rem sans-serif";
        ctx.fillText("Total conectores", xCoor, yCoor - 18);
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = "1.75rem sans-serif";
        ctx.fillText(`${totalConnectors}`, xCoor, yCoor + 2);
        ctx.responsive = true;
        ctx.restore();
      },
    };

    const plugins = [ChartDataLabels, innerLabel];

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      circumference: 180,
      rotation: -90,
      cutout: "75%",
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 7.17,
            },
          },
          position: "bottom",
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          display: false,
          color: "#fff",
          font: {
            weight: "bold",
            size: "16rem",
          },
        },
      },
      animation: {
        duration: 0, // Disable animations by setting duration to 0
      },
      
    };

    setChartData(data);
    setChartOptions(options);
    setChartPlugins(plugins);
  }, [
    backgroundColor,
    dataValue,
    hoverBackgroundColor,
    label,
    totalConnectors,
  ]);

  // console.log("dataValue", dataValue);
  // console.log("chartData", chartData);
  return (
    <>
      {dataValue && (
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          plugins={chartPlugins}
        />
      )}
    </>
  );
};
