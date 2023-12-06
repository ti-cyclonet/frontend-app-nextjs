import { ConnectorStatus } from "@/app/chargebox/[chargeboxId]/[connectorId]/domain/Status.type";
import "../styles/dashboard.css";
import { useRouter } from "next/navigation";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

export type Envelope = {
  chargebox: {
    charge_box_id: string;
    charge_box_alias: string;
    fuun_name: string;
    connectors: [];
  };
};

const DashboardEnvelope: React.FC<Envelope> = ({ chargebox }) => {
  const router = useRouter();
  const handleRedirect = (id: string, idConnector?: string) => {
    return idConnector
      ? router.push(`chargebox/${id}/${idConnector}`)
      : router.push(`chargebox/${id}`);
  };

  const getChargeboxStatusClass = () => {
    let available: number = 0;
    let charging: number = 0;
    let offline: number = 0;
    let error: number = 0;
    let inactive: number = 0;
    chargebox.connectors.forEach((connector: any) => {
      if (connector.connector_id != 0) {
        switch (connector.status) {
          case ConnectorStatus.AVAILABLE:
          case ConnectorStatus.PREPARING:
            available++;
            break;
          case ConnectorStatus.CHARGING:
          case ConnectorStatus.FINISHING:
            charging++;
            break;
          case ConnectorStatus.OFFLINE:
            offline++;
            break;
          case ConnectorStatus.FAULTED:
            error++;
            break;
          case ConnectorStatus.INACTIVE:
          case ConnectorStatus.RESERVED:
            inactive++;
            break;
          default:
            break;
        }
      }
    });
    switch (true) {
      case error > 0:
        return "border-error";
      case charging > 0:
        return "border-charging";
      case available > 0:
        return "border-available";
      case inactive > 0:
        return "border-inactive";
      case offline > 0:
        return "border-offline";
      default:
        return "border-offline";
    }
  };

  const getConnectorStatusClass = (connector: any) => {
    switch (connector.status) {
      case ConnectorStatus.AVAILABLE:
        return "text-available";
      case ConnectorStatus.PREPARING:
        return "text-available-int";
      case ConnectorStatus.CHARGING:
        return "text-charging-int";
      case ConnectorStatus.FINISHING:
        return "text-charging";
      case ConnectorStatus.FAULTED:
        return "text-faulted";
      case ConnectorStatus.OFFLINE:
        return "text-offline";
      case ConnectorStatus.INACTIVE:
        return "text-inactive";
      case ConnectorStatus.RESERVED:
        return "text-inactive";
      default:
        return "text-error";
    }
  };

  return (
    <>
      <div
        className={`row btnc chargebox ${getChargeboxStatusClass()} shadow px-auto py-2 justify-content-evenly`}
        onClick={() => handleRedirect(chargebox.charge_box_id)}
      >
        <small className="text-center text-uppercase text-secondary p-0">
        {chargebox.fuun_name ?? '-'}
        </small>
        <small className="text-center text-uppercase fw-bold p-0">
          {chargebox.charge_box_alias ?? chargebox.charge_box_id}
        </small>
        {chargebox.connectors.map((connector: any, i) => {
          if (connector.connector_id != 0) {
            return (
              <div
                className="col-3 p-0 text-center justify-content-center"
                key={connector.connector_pk}
              >
                <RiCheckboxBlankCircleFill
                  size={20}
                  className={`btnhov ${getConnectorStatusClass(
                    connector
                  )} shadow rounded-pill`}
                  onClick={() =>
                    handleRedirect(
                      chargebox.charge_box_id,
                      connector.connector_id
                    )
                  }
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default DashboardEnvelope;
