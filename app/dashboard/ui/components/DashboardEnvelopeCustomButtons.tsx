import { ConnectorStatus } from "@/app/chargebox/[chargeboxId]/[connectorId]/domain/Status.type";
import "../styles/dashboard.css";
import { useState } from "react";

export type CustomButton = {
  handleFilter: (status: ConnectorStatus, all?: boolean) => void;
};

const DashboardEnvelopeCustomButtons: React.FC<CustomButton> = ({
  handleFilter,
}) => {
  const [availableStatus, setAvailableStatus] = useState(false);
  const [chargingStatus, setChargingStatus] = useState(false);
  const [faultedStatus, setFaultedeStatus] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState(false);
  const [inactiveStatus, setInactiveStatus] = useState(false);
  const [allStatus, setAllStatus] = useState(true);

  const handle = (type: ConnectorStatus, all?: boolean) => {
    setAvailableStatus(false);
    setChargingStatus(false);
    setFaultedeStatus(false);
    setOfflineStatus(false);
    setInactiveStatus(false);
    setAllStatus(false);

    switch (true) {
      case ConnectorStatus.AVAILABLE && all:
        setAllStatus(true);
        break;
      case type === ConnectorStatus.AVAILABLE:
        setAvailableStatus(true);
        break;
      case type === ConnectorStatus.CHARGING:
        setChargingStatus(true);
        break;
      case type === ConnectorStatus.FAULTED:
        setFaultedeStatus(true);
        break;
      case type === ConnectorStatus.OFFLINE:
        setOfflineStatus(true);
        break;
      case type === ConnectorStatus.INACTIVE:
        setInactiveStatus(true);
        break;
      default:
        break;
    }

    handleFilter(type, all);
  };

  return (
    <div className="col-12 col-lg-8 col-xl-7 col-xxl-6 d-md-flex bg-blue-030 p-1 rounded-3" style={{maxWidth: 650}}>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          allStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.AVAILABLE, true)}
      >
        Todos
      </div>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          availableStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.AVAILABLE)}
      >
        Disponibles
      </div>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          chargingStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.CHARGING)}
      >
        Cargando
      </div>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          faultedStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.FAULTED)}
        style={{minWidth: 80.89}}
      >
        Con falla
      </div>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          offlineStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.OFFLINE)}
      >
        Desconectados
      </div>
      <div
        className={`full-center btnc border p-2 px-md-auto mx-auto mx-sm-1 mx-lg-1 mx-xl-1 ${
          inactiveStatus ? "bg-active-focus text-light" : ""
        }`}
        onClick={() => handle(ConnectorStatus.INACTIVE)}
      >
        Inactivos
      </div>
    </div>
  );
};

export default DashboardEnvelopeCustomButtons;
