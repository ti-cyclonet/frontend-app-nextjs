import React, { useEffect, useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { emptyUser } from "@core/domain/IUser";
import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UIDropdown } from "@core/infrastructure/ui/components/UIDropdown";
import { UIInput } from "@core/infrastructure/ui/components/UIInput";
import { UICheckbox } from "@core/infrastructure/ui/components/UICheckbox";
import {
  TransactionContext,
  TransactionContextType,
} from "../context/TransactionContext";

import { TransactionManagement } from "@transactions/application/transactionManagement";
import {
  ITransaction,
  emptyTransaction,
} from "@transactions/domain/ITransaction";
import { TransactionService } from "@transactions/infrastructure/transaction.service";

import { Form, Row } from "react-bootstrap";
import { Chart } from "primereact/chart";
import 'chartjs-adapter-date-fns';
import { IMeterValue } from "@transactions/domain/IMeterValue";

import { parseISO, formatISO, format, parse } from "date-fns";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

export type TransactionFormProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  setShowModal,
}) => {
  const { currentTransaction, setCurrentTransaction } = React.useContext(
    TransactionContext
  ) as TransactionContextType;

  const [meterValuesSoc, setMeterValuesSoc] = useState<(string | null)[]>([]);
  const [meterValuesVoltage, setMeterValuesVoltage] = useState<
    (string | null)[]
  >([]);
  const [meterValuesPowerOffered, setMeterValuesPowerOffered] = useState<
    (string | null)[]
  >([]);

  const [localRoles, setLocalRoles] = useState<string[]>([]);
  const [reload, setReload] = useState(false);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartPlugins, setChartPlugins] = useState<any[]>([]);

  const manager = new TransactionManagement(new TransactionService());

  function generateDateRange(
    startDate: Date,
    endDate: Date,
    unit: string,
    interval: number
  ): Date[] {
    const dateRange: Date[] = [];
    const currentTime = new Date(startDate);

    while (currentTime <= endDate) {
      dateRange.push(new Date(currentTime));
      if (unit === "mm")
        currentTime.setMinutes(currentTime.getMinutes() + interval);
      if (unit === "ss")
        currentTime.setSeconds(currentTime.getSeconds() + interval);
    }
    //console.log(dateRange);
    return dateRange;
  }

  function adjustDate(date: Date) {
    const seconds = date.getSeconds();

    // Verificar si el segundo es impar
    if (seconds % 2 !== 0) {
      // Si es impar, incrementar en uno para hacerlo par
      date.setSeconds(seconds + 1);
    }
    return date;
    
  }

  const getMeterValuesBySoc = async (timeserie: Date[]): Promise<any> => {
    if (meterValuesSoc.length < 1) {
      //console.log('load meterValues by Soc on Detail (client)');

      const resp = await manager.getTransactionMeterValuesByType(
        currentTransaction.id,
        "SoC"
      );
      //console.log(resp);
      let _metervalues = resp.metervalues ?? [];
      //console.log(_metervalues);

      if (_metervalues) {
        let values: (string | null)[] = timeserie.map((date) => {
          const _value: IMeterValue | undefined = _metervalues.find(
            (metervalue) => {
              if (metervalue && metervalue.valueTimestamp) {

                //console.log("compare: [" +adjustDate(metervalue.valueTimestamp).getTime() +"] [" +date.getTime() +"]");
                //console.log("compare: [" +metervaluetimestap +"] [" +timeseriestimestamp +"]");
                //console.log("compare: [" + metervaluetimestap == timeseriestimestamp + "]");

                if (adjustDate(metervalue.valueTimestamp).getTime() == date.getTime()) {
                  //console.log(metervalue);
                  return metervalue;
                }
              }
            }
          );
          //console.log (_value)
          return _value && _value?.value ? _value.value : null;
        });

        console.log("SOC VALUES");
        console.log(values);
        setMeterValuesSoc(values);
      }
    } else {
      console.log("meterValues by Soc not empty");
    }
  };

  const getMeterValuesByVoltage = async (timeserie: Date[]): Promise<any> => {
    if (meterValuesVoltage.length < 1) {
      //console.log('load meterValues by Voltage on Detail (client)');

      const resp = await manager.getTransactionMeterValuesByType(
        currentTransaction.id,
        "Voltage"
      );
      //console.log(resp);
      let _metervalues = resp.metervalues ?? [];
      //console.log(_metervalues);

      if (_metervalues) {
        let values: (string | null)[] = timeserie.map((date) => {
          const _value = _metervalues.find((metervalue) => {
            if (metervalue && metervalue.valueTimestamp) {
              //console.log("compare: [" +adjustDate(metervalue.valueTimestamp).getTime() +"] [" +date.getTime() +"]");
              //console.log("compare: [" +metervaluetimestap +"] [" +timeseriestimestamp +"]");
              //console.log("compare: [" + metervaluetimestap == timeseriestimestamp + "]");

              if (adjustDate(metervalue.valueTimestamp).getTime() == date.getTime()) {
                return metervalue;
              }
            }
          });
          //console.log (_value)
          return _value && _value?.value ? _value.value : null;
        });

        //console.log(values);
        setMeterValuesVoltage(values);
      }
    } else {
      console.log("meterValues by Voltage not empty");
    }
  };

  const getMeterValuesByPowerOffered = async (
    timeserie: Date[]
  ): Promise<any> => {
    if (meterValuesPowerOffered.length < 1) {
      //console.log('load meterValues by Voltage on Detail (client)');

      const resp = await manager.getTransactionMeterValuesByType(
        currentTransaction.id,
        "Power.Offered"
      );
      //console.log(resp);
      let _metervalues = resp.metervalues ?? [];
      //console.log(_metervalues);

      if (_metervalues) {
        let values: (string | null)[] = timeserie.map((date) => {
          const _value = _metervalues.find((metervalue) => {
            if (metervalue && metervalue.valueTimestamp) {
              //console.log("compare: [" +adjustDate(metervalue.valueTimestamp).getTime() +"] [" +date.getTime() +"]");
              //console.log("compare: [" +metervaluetimestap +"] [" +timeseriestimestamp +"]");
              //console.log("compare: [" + metervaluetimestap == timeseriestimestamp + "]");

              if (adjustDate(metervalue.valueTimestamp).getTime() == date.getTime()) {
                return metervalue;
              }
            }
          });
          //console.log (_value)
          return _value && _value?.value
            ? "" + parseInt(_value?.value) / 1000
            : null;
        });

        //console.log(values);
        setMeterValuesPowerOffered(values);
      }
    } else {
      console.log("meterValues by Power.Offered not empty");
    }
  };

  useEffect(() => {
    console.log(currentTransaction);
    if (
      currentTransaction &&
      currentTransaction.startTimestamp
    ) {
      currentTransaction.startTimestamp.setSeconds(0);
      const startDate = currentTransaction.startTimestamp;
      let endDate = new Date();

      if (currentTransaction.stopTimestamp) {
        currentTransaction.stopTimestamp.setSeconds(59);
        endDate = currentTransaction.stopTimestamp;
      }

      console.log(endDate);
      const intervalInMinutes = 2; // Intervalo de 2 segundos

      const result = generateDateRange(
        startDate,
        endDate,
        "ss",
        intervalInMinutes
      );

      if (meterValuesSoc.length > 0 && meterValuesVoltage.length > 0) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
          "--text-color-secondary"
        );
        const surfaceBorder =
          documentStyle.getPropertyValue("--surface-border");
        const data = {
          labels: result,
          datasets: [
            {
              label: "SoC (%)",
              data: meterValuesSoc,
              fill: false,
              borderColor: "#82D616",
              tension: 0.2,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Voltage (V)",
              data: meterValuesVoltage,
              fill: false,
              borderColor: documentStyle.getPropertyValue("--cyan-400"),
              tension: 0.3,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Power (W)",
              data: meterValuesPowerOffered,
              fill: false,
              borderColor: "#252F40",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
          ],
        };
        const plugins = [ChartDataLabels];
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 0.35,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                color: textColor,
                boxWidth: 50, // Ancho del cuadro de la leyenda (puedes ajustarlo según tus necesidades)
                boxHeight: 10, // Alto del cuadro de la leyenda (puedes ajustarlo según tus necesidades)
              },
            },
          },
          scales: {
            x: {
              bounds: 'ticks',
              offsetAfterAutoskip: false,
              type: 'time',
              ticks: {
                display: true,
                source: "label",
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: 20,
              },
              grid: {
                color: "rgba(0, 0, 0, 0)",
              },
              time: {
                type: 'time',
                parser: 'HH:mm',
                unit: 'minute',
                displayFormats: {
                  'minute': 'HH:mm',
                  'hour': 'HH:mm'
                }
              },
            },
            y: {
              ticks: {
                color: textColorSecondary,
                beginAtZero: true,
                max: 2200,
                min: 0,
              },
              grid: {
                color: surfaceBorder,
              },
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
        setChartPlugins(plugins);
      } else {
        const promises = [
          getMeterValuesByVoltage(result),
          getMeterValuesBySoc(result),
          getMeterValuesByPowerOffered(result),
        ];
        console.log("preeeee");
        (async () => {
          await Promise.all(promises);
          console.log("cambia reload");
          setReload(true);
        })();
        console.log("pooooos");
      }
    }
  }, [reload]);

  return (
    <div className="mx-8 d-grid gap-3">
      <Row>
        <div className="mx-auto text-center">
          <Chart type="line" data={chartData} options={chartOptions} />
        </div>
      </Row>
    </div>
  );
};


export default TransactionForm;