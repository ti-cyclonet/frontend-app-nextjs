'use client'
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export type UIRoundChartProps = {
  label: string[],
  dataValue: number[],
  backgroundColor?: string[],
  hoverBackgroundColor?: string[]
};

export const UIRoundChart: React.FC<UIRoundChartProps> = ({ label, dataValue, backgroundColor, hoverBackgroundColor }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartPlugins, setChartPlugins] = useState<any[]>([]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: label,
      datasets: [
        {
          data: dataValue,
          backgroundColor
        },
      ],
    };

    const plugins = [ChartDataLabels];


    const options = {            
      responsive:true,
      maintainAspectRatio: false,     
      aspectRatio: 1.5,
      plugins: {        
        legend: {
          labels: {
            usePointStyle: true,
          },                 
          position: 'bottom',  
        },
        tooltip: {
          enabled: false
        },
        datalabels: {
          formatter: (value: number, ctx: any) => {
          
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data: number) => {
                sum += data;
            });
            let percentage = (value*100 / sum).toFixed(2)+"%";
            return percentage;
          },
          color: '#fff',
          font: {
            weight: 'bold',
            size: '16rem',
            
          },
        }, 
      },
    };

    setChartData(data);
    setChartOptions(options);
    setChartPlugins(plugins);
  }, []);

  return (
    
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        plugins={chartPlugins}
        style={{ position: "relative", width: "50%", margin: "auto" }}
      />
    
  );
}
