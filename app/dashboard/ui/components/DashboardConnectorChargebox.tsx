import { useContext, useEffect, useState } from "react";
import {
  DashboardContext,
  DashboardContextType,
} from "../context/DashboardContext";
import DashboardEnvelope from "./DashboardEnvelope";
import DashboardEnvelopeCustomButtons from "./DashboardEnvelopeCustomButtons";
import DashboardEnvelopeCharging from "./DashboardEnvelopeCharging";
import { Row } from "react-bootstrap";
import { BiExport } from "react-icons/bi";
import { UIModal } from "@/app/core/infrastructure/ui/components/UIModal";
import { UIDropdown } from "@/app/core/infrastructure/ui/components/UIDropdown";
import { UIButton } from "@/app/core/infrastructure/ui/components";
import { IChgrOpt, IEnv, IFuUnit } from "../../domain/IAllConnectorChargebox";
import { utils, writeFile } from "xlsx";

const DashboardConnectorChargebox = () => {
  const {
    dashboardDataAll,
    getDashboardDataAll,
    order,
    setOrder,
    env,
    setEnv,
    fuunit,
    setFuunit,
    chgr,
    setChgr,
    isNewData,
    setIsNewData,
    isCharging,
    filterBy,
    data,
    getDashboardData,
    isEmptyData,
  } = useContext(DashboardContext) as DashboardContextType;

  if (!dashboardDataAll || dashboardDataAll.chgr.length == 0) {
    getDashboardDataAll();
  }

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [unitsOptions, setUnitsOptions] = useState([
    { label: "Todas", value: "-" },
  ]);
  const [envelopeOptions, setEnvelopeOptions] = useState([
    { label: "Todos", value: "-" },
  ]);
  const [chargerOptions, setChargerOptions] = useState([
    { label: "Todos", value: "-" },
  ]);
  const _interval = 15;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const updateOptsFilter = (id: number) => {
    if (dashboardDataAll && dashboardDataAll.fuunit.length > 0) {
      let fuUnitOpt = [{ label: "Todas", value: "-" }];
      let envOpt = [{ label: "Todos", value: "-" }];
      let chgrOpt = [{ label: "Todos", value: "-" }];
      let exitId = dashboardDataAll.fuunit.find((e) => e.value === id);
      dashboardDataAll.fuunit.forEach((funit: IFuUnit) => {
        if (!fuUnitOpt.find((e) => e.value === funit.value.toString())) {
          fuUnitOpt.push({
            label: funit.name,
            value: funit.value.toString(),
          });
        }
        if (!exitId || (exitId && funit.value === id)) {
          funit.env.forEach((env: IEnv) => {
            if (!envOpt.find((e) => e.value === env.value)) {
              envOpt.push({ label: env.name, value: env.value });
            }
          });
          funit.chgr.forEach((chgr: IChgrOpt) => {
            if (!chgrOpt.find((e) => e.value === chgr.value)) {
              chgrOpt.push({ label: chgr.name, value: chgr.value });
            }
          });
        }
      });
      envOpt.sort((a, b) => (a.value > b.value ? 1 : -1));
      chgrOpt.sort((a, b) => (a.value > b.value ? 1 : -1));
      setUnitsOptions(fuUnitOpt);
      setEnvelopeOptions(envOpt);
      setChargerOptions(chgrOpt);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name == "env") {
      setEnv(value);
    }
    if (name == "fuunit") {
      updateOptsFilter(parseInt(value));
      setFuunit(value);
      setChgr("-");
      setEnv("-");
    }
    if (name == "chgr") {
      setChgr(value);
    }
  };

  const handleExport = () => {
    const headings = [
      [
        "Id Unidad",
        "Nombre de Unidad",
        "PK Cargador",
        "Id Cargador",
        "Nombre de Cargador",
        "PK Connector",
        "Id Connector",
        "Nombre de Connector",
        "Estatus",
        "Codigo de Error",
        "Error_Info",
        "vendor_error_code",
        "Fecha",
        "Soc",
        "Placa",
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    let dataExport: any[] = [];
    data.map((chargebox: any, i) => {
      chargebox.connectors.map((connector: any, i) => {
        if (connector.connector_id != "0") {
          dataExport.push(connector);
        }
      });
    });
    utils.sheet_add_json(ws, dataExport, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Patio");
    writeFile(wb, "ExportGreenMovil.xlsx");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await setIsNewData(true);
  };

  const btnFilter = () => {
    if (unitsOptions.length <= 1) {
      updateOptsFilter(-1);
    }
    setShowFilterModal(true);
  };

  const tidyUpPatio = async () => {
    if (order === "asc") {
      await setOrder("desc");
    } else if (order === "desc") {
      await setOrder("asc");
    } else {
      await setOrder("asc");
    }
    await setIsNewData(true);
  };

  useEffect(() => {
    if (!data || data.length == 0 || isNewData) {
      setIsNewData(false);
      getDashboardData();
    }
  }, [data, getDashboardData, isNewData, setIsNewData]);

  useEffect(() => {
    if (time === 0) {
      getDashboardData();
    }
  }, [getDashboardData, time]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setTime((t) => t - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (data) {
      setTime(_interval);
    }
  }, [data]);

  return (
    <>
      <div className="card shadow justify-content-center mb-0 p-2">
        <div className="card-body d-lg-flex justify-content-between p-0">
          <DashboardEnvelopeCustomButtons
            handleFilter={filterBy}
          ></DashboardEnvelopeCustomButtons>
          <div className="col-12 col-lg-4 d-sm-flex justify-content-end p-1">
            <div
              className="full-center btnc border p-2 mx-auto mx-sm-1"
              onClick={tidyUpPatio}
            >
              Ordenar
              <strong className="text-uppercase ms-1 text-active-focus">
                ({order})
              </strong>
            </div>
            <div
              className="full-center btnc border p-2 mx-auto mx-sm-1"
              onClick={btnFilter}
            >
              Filtrar
            </div>

            <div
              className="full-center btnc border p-2 mx-auto mx-sm-1"
              onClick={handleExport}
            >
              Exportar
              <BiExport size={17} className="ms-2" />
            </div>
          </div>
        </div>

        {!isEmptyData && (
          <div
            className="card-body row p-4 justify-content-start"
            style={{ rowGap: 20 }}
          >
            {data.map((chargebox: any, i) => {
              if (isCharging) {
                return (
                  <div
                    className="col-12 col-sm-5 col-md-2 col-lg-1 col-xl-1 m-1 min-width-charging"
                    key={chargebox.charge_box_id + i}
                  >
                    <DashboardEnvelopeCharging
                      chargebox={chargebox}
                    ></DashboardEnvelopeCharging>
                  </div>
                );
              } else {
                return (
                  <div
                    className="col-5 col-sm-3 col-md-2 col-lg-1 m-1 min-width-ch"
                    key={chargebox.charge_box_id + i}
                  >
                    <DashboardEnvelope
                      chargebox={chargebox}
                    ></DashboardEnvelope>
                  </div>
                );
              }
            })}
          </div>
        )}
        <UIModal
          closeButton={true}
          show={showFilterModal}
          key="vehicles-modal"
          title={"Filtrar Conectror"}
          onHide={() => setShowFilterModal(false)}
        >
          <form onSubmit={handleSubmit} method="post" className="mt-3">
            <UIDropdown
              label="Unidad: "
              name="fuunit"
              value={fuunit ? fuunit : "-"}
              onChange={handleChange}
              options={unitsOptions}
              required={true}
            />
            <UIDropdown
              label="Envolvente: "
              name="env"
              value={env ? env : "-"}
              onChange={handleChange}
              options={envelopeOptions}
              required={true}
            />
            <UIDropdown
              label="Cargador: "
              name="chgr"
              value={chgr ? chgr : "-"}
              onChange={handleChange}
              options={chargerOptions}
              required={true}
            />

            <Row>
              <div className="mx-auto text-center">
                <UIButton
                  className="bg-active-focus"
                  label="Cancelar"
                  type="button"
                  onClick={() => {
                    if (showFilterModal) {
                      setShowFilterModal(false);
                    }
                  }}
                />
                <UIButton
                  className="bg-active-focus ms-2"
                  label={"Buscar"}
                  onClick={(event) => {
                    if (showFilterModal) {
                      setShowFilterModal(false);
                    }
                  }}
                />
              </div>
            </Row>
          </form>
        </UIModal>
      </div>
    </>
  );
};

export default DashboardConnectorChargebox;
