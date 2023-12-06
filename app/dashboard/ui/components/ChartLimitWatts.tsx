"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/dashboard.css";
import { Color } from "@/app/constants/colors.enum";

export type ChartLimitWattsProps = {
  label: string[];
  labelLimite: string[];
  dataValue: number[];
  dataValueLimite: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
  porcentageUsed: string;
  powerUsed: string;
  powerMax: string;
};

export const ChartLimitWatts: React.FC<ChartLimitWattsProps> = ({
  label,
  labelLimite,
  dataValue,
  dataValueLimite,
  backgroundColor,
  hoverBackgroundColor,
  porcentageUsed,
  powerUsed,
  powerMax,
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartPlugins, setChartPlugins] = useState<any[]>([]);

  useEffect(() => {
    const data = {
      labels: [],
      datasets: [
        {
          label: "Limite",
          data: dataValueLimite,
          backgroundColor: [Color.GREY, Color.FAULTED, Color.GREYLIGHT],
          hoverBackgroundColor,
        },
        {
          label: "Potencia",
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
        ctx.font = "1.75rem sans-serif ";
        ctx.fillText(`${powerUsed}`, xCoor, yCoor - 18);
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = "0.875rem sans-serif";
        ctx.fillText(`${porcentageUsed} Limite`, xCoor, yCoor - 1);
        ctx.save();
        ctx.textAlign = "center";
        ctx.font = "1rem sans-serif";
        ctx.fillText(`(${powerMax} total)`, xCoor, yCoor + 19);
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
      cutout: "69%",
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
          position: "bottom",
          display: false,
        },
        tooltip: {
          enabled: true,
        },
        datalabels: {
          display: false,
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
    dataValueLimite,
    hoverBackgroundColor,
    label,
    porcentageUsed,
    powerMax,
    powerUsed,
  ]);

  return (
    <>
      {dataValue && (
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          plugins={chartPlugins}
          className="pb-2"
        />
      )}
    </>
  );
};
