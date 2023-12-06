import { useContext, useEffect, useState } from "react";
//import { useHistory, Router, Route } from 'react-router';
import { ITransaction } from "@transactions/domain/ITransaction";
import { UIDataTableFilter } from "@core/infrastructure/ui/components/UIDataTableFilter";
import {
  TransactionContext,
  TransactionContextType,
} from "@transactions/ui/context/TransactionContext";
import { TransactionListKPI } from "@transactions/ui/components/TransactionListKPI";

import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UICalendar } from "@core/infrastructure/ui/components/UICalendar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";
import { TransactionKPIPlaceholder } from "./TransactionKPIPlaceholder";
import { RiContactsBookLine } from "react-icons/ri";
import { Button, Card, Form } from "react-bootstrap";
import { TransactionManagement } from "../../application/transactionManagement";
import { TransactionService } from "../../infrastructure/transaction.service";
import { IMeterValue } from "../../domain/IMeterValue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "primereact/chart";
import "chartjs-adapter-date-fns";
import { utils, writeFile } from "xlsx";
import { BiExport } from "react-icons/bi";
import { Calendar } from "primereact/calendar";
import { useRouter } from "next/navigation";
import * as Feather from "react-icons/fi";

export type TransactionListProps = {
  showKPI?: boolean;
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
};

const TransactionList: React.FC<TransactionListProps> = ({
  showKPI,
  setShowModal,
}) => {
  const {
    setQueryStartDate,
    setQueryEndDate,
    updateViewTransactions,
    setUpdateViewTransactions,
    transactions,
    setTransactions,
    currentTransaction,
    setCurrentTransaction,
    loadedTransactions,
    setLoadedTransactions,
    queryType,
    queryId,
    loadTransactions
  } = useContext(TransactionContext) as TransactionContextType;

  const [startdate, setStartDate] = useState<string | Date | Date[] | null>(
    null
  );
  const [enddate, setEndDate] = useState<string | Date | Date[] | null>(null);
  const [showGraphContainer, setShowGraphContainer] = useState<boolean>(false);

  // GRAPH ATTRIBUTES
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
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);
    const [temperature, setTemperature] = useState<string>("0");
    const _interval = 15; 

  const [startVisible, setStartVisible] = useState<boolean>(false);
  const [endVisible, setEndVisible] = useState<boolean>(false);

  let router = useRouter();

  const formatDate = (date: Date | undefined) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (date) {
      try {
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timeZone, // Utiliza el formato de 24 horas
        });
      } catch (e: any) {
        return "";
      }
    } else {
      return "";
    }
  };

  const dateFilterTemplate = (options: any) => {
    return (
      <UICalendar
        label=""
        name="filter-date"
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        maxDate={new Date()}
        placeholder="mm/dd/yyyy HH:mm"
        showTime={true}
      />
    );
  };

  const startEventTimestampBodyTemplate = (transaction: ITransaction) => {
    if (transaction && transaction.startEventTimestamp) {
      return formatDate(transaction.startEventTimestamp);
    } else {
      return "";
    }
  };

  const startTimestampBodyTemplate = (transaction: ITransaction) => {
    if (transaction && transaction.startTimestamp) {
      return formatDate(transaction.startTimestamp);
    } else {
      return "";
    }
  };
  const stopEventTimestampBodyTemplate = (transaction: ITransaction) => {
    if (transaction && transaction.stopEventTimestamp) {
      return formatDate(transaction.stopEventTimestamp);
    } else {
      return "";
    }
  };
  const stopTimestampBodyTemplate = (transaction: ITransaction) => {
    if (transaction && transaction.stopTimestamp) {
      return formatDate(transaction.stopTimestamp);
    } else {
      return "";
    }
  };

  const columns = [
    { field: "id", header: "TransactionId" },
    { field: "functionalName", header: "FunctionalUnit" },
    { field: "chargeBoxName", header: "ChargerName" },
    //{ field: 'idTag', header: 'idTag' },
    //{ field: 'startTimestamp', header: 'startTimestamp', dataType: 'date', template: startTimestampBodyTemplate, filterTemplate: dateFilterTemplate },
    //{ field: 'stopTimestamp', header: 'stopTimestamp', dataType: 'date', template: stopTimestampBodyTemplate, filterTemplate: dateFilterTemplate },
    { field: "totalValue", header: "EnergyDeliveredKWh", dataType: "numeric" },
    { field: "startValue", header: "InitialSoCPercent" },
    { field: "stopValue", header: "EndSoCPercent", dataType: "numeric" },
    {
      field: "startEventTimestamp",
      header: "StartAt",
      dataType: "date",
      template: startEventTimestampBodyTemplate,
      filterTemplate: dateFilterTemplate,
    },
    {
      field: "stopEventTimestamp",
      header: "EndAt",
      dataType: "date",
      template: stopEventTimestampBodyTemplate,
      filterTemplate: dateFilterTemplate,
    },
    { field: "vehicle_info", header: "VehicleId" },
    { field: "moduleid", header: "ModuleId" },
    { field: "connector_pk", header: "ConnectorPk" },
    { field: "connectorName", header: "ConnectorName" },
    { field: "placa", header: "AssetNum" },
    { field: "stopEventActor", header: "StopEventActor" },
    { field: "stopReason", header: "Reason" },
  ];

  function convertToDate(value: string | Date | Date[] | null): Date | null {
    if (value === null) {
      return null; // Si el valor es nulo, devuelve nulo
    } else if (value instanceof Date) {
      return value; // Si el valor ya es de tipo Date, devuelve el valor sin cambios
    } else if (typeof value === "string") {
      const date = new Date(value); // Intenta convertir la cadena en un objeto Date
      if (!isNaN(date.getTime())) {
        return date; // La conversión fue exitosa, devuelve el objeto Date
      }
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      return value[0]; // Si es una matriz de fechas, devuelve la primera fecha
    }
    // Si no se puede convertir, devuelve nulo o maneja el caso según tu lógica
    return null;
  }

  // Se debe validar como hacer el refresco del componente
  const handleRangeChange = (event: any) => {
    if (startdate && enddate) {
      event.preventDefault();
      setQueryStartDate(convertToDate(startdate));
      setQueryEndDate(convertToDate(enddate));
      setTransactions(null);
      setUpdateViewTransactions(new Date());
    }
  };

  const clearRangeChange = (event: any) => {
    setStartDate(null);
    setEndDate(null);
    event.preventDefault();
    setQueryStartDate(null);
    setQueryEndDate(null);
    setTransactions(null);
    setUpdateViewTransactions(new Date());
  };

  // GRAPH METHODS SECTION

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

  // METER VALUES FUNCTIONS
  async function getMeterValuesBySoc(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "SoC"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByVoltage(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Voltage"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByPowerOffered(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Power.Offered"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByTemperature(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Temperature"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByCurrent(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Current.Offered"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByMaximumCurrent(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Current.Import"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByMaximumPower(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Power.Active.Import"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  async function getMeterValuesByDeliveredEnergy(
    timeserie: Date[],
    transaction: ITransaction
  ): Promise<(string | null)[]> {
    const resp = await manager.getTransactionMeterValuesByType(
      transaction.id,
      "Energy.Active.Export.Register"
    );
    let _metervalues = resp.metervalues ?? [];
    return groupMeterValuesIntoList(timeserie, _metervalues);
  }

  function groupMeterValuesIntoList(
    timeserie: Date[],
    _metervalues: IMeterValue[]
  ): (string | null)[] {
    if (_metervalues) {
      let values: (string | null)[] = timeserie.map((date) => {
        const _value: IMeterValue | undefined = _metervalues.find(
          (metervalue) => {
            if (metervalue && metervalue.valueTimestamp) {
              if (
                adjustDate(metervalue.valueTimestamp).getTime() ==
                date.getTime()
              ) {
                return metervalue;
              }
            }
          }
        );
        return _value && _value?.value ? _value.value : null;
      });
      return values;
    }
    return [];
  }

  async function reloadGraph(transaction: ITransaction) {
    if (transaction && transaction.startTimestamp) {
      setShowGraphContainer(false);

      transaction.startTimestamp.setSeconds(0);
      const startDate = transaction.startTimestamp;
      let endDate = new Date();

      if (transaction.stopTimestamp) {
        transaction.stopTimestamp.setSeconds(59);
        endDate = transaction.stopTimestamp;
      }

      const intervalInMinutes = 2; // Intervalo de 2 segundos

      const result = generateDateRange(
        startDate,
        endDate,
        "ss",
        intervalInMinutes
      );

      const valuesByVoltages = await getMeterValuesByVoltage(
        result,
        transaction
      );
      const valuesByVoltageSoc = await getMeterValuesBySoc(result, transaction);
      const valuesByPowerOffered = await getMeterValuesByPowerOffered(
        result,
        transaction
      );
      const valuesByTemperature = await getMeterValuesByTemperature(
        result,
        transaction
      );
      const valuesByCurrent = await getMeterValuesByCurrent(
        result,
        transaction
      );
      const valuesByMaximumCurrent = await getMeterValuesByMaximumCurrent(
        result,
        transaction
      );
      const valuesByMaximumPower = await getMeterValuesByMaximumPower(
        result,
        transaction
      );
      const valuesByEnergyDelivered = await getMeterValuesByDeliveredEnergy(
        result,
        transaction
      );

      if (valuesByVoltageSoc.length > 0 && valuesByVoltages.length > 0) {
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
              label: "Current (A)",
              data: valuesByCurrent,
              fill: false,
              borderColor: "#58D68D",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Maximum Current (A)",
              data: valuesByMaximumCurrent,
              fill: false,
              borderColor: "#1E8449",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Maximum Power (KW)",
              data: valuesByMaximumPower,
              fill: false,
              borderColor: "#922B21",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Power (W)",
              data: valuesByPowerOffered,
              fill: false,
              borderColor: "#5DADE2",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Voltage (V)",
              data: valuesByVoltages,
              fill: false,
              borderColor: "#8E44AD",
              tension: 0.3,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Energy Delivered (KWH)",
              data: valuesByEnergyDelivered,
              fill: false,
              borderColor: "#F4D03F",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "Temperature (C)",
              data: valuesByTemperature,
              fill: false,
              borderColor: "#E67E22",
              tension: 1,
              spanGaps: true,
              borderDash: [25, 10],
            },
            {
              label: "SoC (%)",
              data: valuesByVoltageSoc,
              fill: false,
              borderColor: "#1ABC9C ",
              tension: 0.2,
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
              position: "bottom",
            },
          },
          scales: {
            x: {
              bounds: "ticks",
              offsetAfterAutoskip: false,
              type: "time",
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
                type: "time",
                parser: "HH:mm",
                unit: "minute",
                displayFormats: {
                  minute: "HH:mm",
                  hour: "HH:mm",
                },
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
        setShowGraphContainer(true);
      } else {
        console.log("Entro else", currentTransaction);
      }
    } else {
      setShowGraphContainer(false);
    }
  }

  const handleDetail = (transaction: ITransaction) => {
    reloadGraph(transaction);
  };

  const handleExport = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    let { datasets, labels } = chartData as any;
    let auxLabels = {};
    labels.map((label: any, i) => {
      if (i === 0) {
        auxLabels = { ...auxLabels, [`graph${i}`]: "" };
      }
      const date = new Date(label);
      const auxTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      auxLabels = { ...auxLabels, [`graph${i + 1}`]: auxTime };
    });
    let fullData: any[] = [auxLabels];
    datasets.map((dataset: any, i) => {
      let auxData = {};
      dataset.data.map((data: any, j) => {
        if (j === 0) {
          auxData = { ...auxData, [`graph${j}`]: dataset.label };
        }
        auxData = { ...auxData, [`graph${j + 1}`]: data };
        if (j === dataset.data.length - 1) {
          fullData.push(auxData);
        }
      });
    });
    console.log("Full DATA", ws);
    utils.sheet_add_json(ws, fullData, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Transactions");
    writeFile(wb, "ExportTransactionsGraphGreenMovil.xlsx");
  };

  useEffect(() => {
    //Nothing to do
    console.log("Grafica", transactions, loadedTransactions);
    if (transactions && loadedTransactions) {
      reloadGraph(transactions[0]);
    }
  }, [updateViewTransactions, reload, loadedTransactions]);

  useEffect( () => {
    //First Time
    setTime(_interval);
    setIsRunning(true);
  }, [queryId]);

  useEffect(() => {
      if (time === 0) {
        setTime(_interval);
        loadTransactions();
        if (queryType === "connector") {
          getTemperatureByConector();
        }
      }
  }, [time]);

async function getTemperatureByConector() {
    await manager.getTemperatureByConnectorId(queryId).then( (data) => {
        if (data.success) {
            setTemperature(data.temperature);
        } else {
            setTemperature("0");
        }
    });
}

useEffect(() => {
  if (!isRunning) {
      return;
  }
  const interval = setInterval(() => {
      setTime((t) => t - 5);
  }, 5000);
  return () => clearInterval(interval);
}, [queryId, isRunning]);

  return (
    <div>
      {showKPI && (
        <>
          {transactions && transactions.length > 0 && showKPI ? (
            <>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Card>
                    <Card.Body className="tag-grafit-init">
                      <TransactionListKPI />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <Row className="m-auto text-center">
                    <Card>
                      <Card.Body className="tag-grafit-init">
                        <div style={{ height: "100%", marginTop: "40px" }}>
                          <h2>Temperature</h2>
                          <br/>
                          <h1> { temperature }° </h1>
                        </div>
                      </Card.Body>
                    </Card>
                  </Row>
                </Col>
              </Row>
              <br />
            </>
          ) : (
            <>
              <TransactionKPIPlaceholder />
            </>
          )}
        </>
      )}
      <Card>
        <Card.Body>
          <Row xs="auto">
            <Col xl={2} lg={2} md={4} sm={4} className="p-4">
              <Button type="button" className="w-100" style={ { background: 'none', color:'black' }} onClick={ (e) => router.back() } >
                <Feather.FiArrowLeft
                  size={20}
                  className="align-middle me-1 text-success"
                /> Volver
              </Button>
            </Col>
            <Col xl={2} lg={2} md={3} sm={3} className="p-2">
              <Row bsPrefix='form-row'>    
                <Form.Label bsPrefix='label' htmlFor={"stardate"}>Desde:</Form.Label>
                <Calendar className="w-100" id={"stardate"} name={"stardate"} value={startdate} onChange={(e) => {if (e && e.value) setStartDate(e.value); setStartVisible(false); }} showTime={true} 
                hourFormat={"24"} required={true} visible={startVisible} onVisibleChange={ () => { setStartVisible(true); setEndVisible(false); } }/>
              </Row>   
              
            </Col>
            <Col xl={2} lg={2} md={3} sm={3} className="p-2">
              <Row bsPrefix='form-row'>    
                <Form.Label bsPrefix='label' htmlFor={"enddate"}>Hasta:</Form.Label>
                <Calendar className="w-100" id={"enddate"} name={"enddate"} value={enddate} onChange={(e) => {if (e && e.value) setEndDate(e.value); setEndVisible(false);}} showTime={true} 
                hourFormat={"24"} required={true} visible={endVisible} onVisibleChange={ () => { setStartVisible(false); setEndVisible(true); } }/>
              </Row>   
            </Col>
            <Col xl={2} lg={2} md={3} sm={3} className="p-4">
              <UIButton
                label="Consultar"
                type="button"
                onClick={handleRangeChange}
                disabled={!(startdate && enddate)}
              />
              <UIButton
                label="Limpiar"
                type="button"
                onClick={clearRangeChange}
                disabled={startdate === null && enddate === null}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {transactions ? (
        <>
          {transactions.length > 0 ? (
            <>
              <UIDataTableFilter
                columns={columns}
                items={transactions}
                hasActions={true}
                handleDetail={handleDetail}
                paginacion={5}
                dataKey="id"
                filterDisplay="menu"
                msg="No found"
                filterPlaceholder="Search"
                tableSize="small"
              ></UIDataTableFilter>
              {showGraphContainer ? (
                <Row>
                  <Col>
                    <Card>
                      <Card.Title>
                        <h3 style={{ padding: "15px" }}>Connector Variables</h3>
                        <div
                          className="full-center btnc border p-2 mx-auto mx-sm-1 custom-btn"
                          onClick={handleExport}
                        >
                          Exportar
                          <BiExport size={17} className="ms-2" />
                        </div>
                      </Card.Title>
                      <Card.Body>
                        <div className="mx-auto text-center">
                          <Chart
                            type="line"
                            data={chartData}
                            options={chartOptions}
                            height={"500px"}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <>No data found!</>
          )}
        </>
      ) : (
        <TablePlaceholder cols={6} rows={8} />
      )}
    </div>
  );
};

export default TransactionList;
