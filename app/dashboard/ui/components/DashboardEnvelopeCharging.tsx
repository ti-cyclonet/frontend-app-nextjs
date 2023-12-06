import { Envelope } from "./DashboardEnvelope";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { ConnectorStatus } from "@/app/chargebox/[chargeboxId]/[connectorId]/domain/Status.type";
import { useRouter } from "next/navigation";

const DashboardEnvelopeCharging: React.FC<Envelope> = ({ chargebox }) => {
  const router = useRouter();
  const handleRedirect = (id: string, idConnector?: string) => {
    return idConnector
      ? router.push(`chargebox/${id}/${idConnector}`)
      : router.push(`chargebox/${id}`);
  };

  const getConnStatusClass = (status: string) => {
    switch (status) {
      case ConnectorStatus.AVAILABLE:
        return "bg-available";
      case ConnectorStatus.PREPARING:
        return "bg-available progress-bar-striped";
      case ConnectorStatus.CHARGING:
        return "bg-charging progress-bar-striped";
      case ConnectorStatus.FINISHING:
        return "bg-charging";
      case ConnectorStatus.FAULTED:
        return "bg-faulted";
      case ConnectorStatus.OFFLINE:
        return "bg-offline";
      case ConnectorStatus.INACTIVE:
        return "bg-inactive";
      case ConnectorStatus.RESERVED:
        return "bg-inactive";
      default:
        return "";
    }
  };

  const getWProgress = (status: string) => {
    switch (status) {
      case ConnectorStatus.AVAILABLE:
      case ConnectorStatus.PREPARING:
      case ConnectorStatus.FAULTED:
      case ConnectorStatus.OFFLINE:
      case ConnectorStatus.INACTIVE:
      case ConnectorStatus.RESERVED:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <>
      <div
        className="card rounded-3 bg-blue-030 shadow px-auto my-2 m-0"
        onClick={() => handleRedirect(chargebox.charge_box_id)}
      >
        <div className="card-body btnhov p-2">
          <h5 className="text-center fw-bold">{chargebox.fuun_name}</h5>
          <h5 className="d-flex my-2 fw-bold">
            <strong>
              <RiCheckboxBlankCircleFill
                size={20}
                className="text-charging shadow rounded-pill mx-2"
              />
            </strong>
            <strong className="text-uppercase">
              {chargebox.charge_box_alias ?? chargebox.charge_box_id}
              <br />
              <small className="text-secondary text-capitalize">
                Cargando...
              </small>
            </strong>
          </h5>

          {chargebox.connectors.map((connector: any, i) => {
            if (connector.connector_id !== 0) {
              return (
                <div
                  className="Card bg-white rounded-3 shadow mb-2"
                  key={connector.connector_pk}
                  onClick={() =>
                    handleRedirect(
                      chargebox.charge_box_id,
                      connector.connector_id
                    )
                  }
                >
                  <div className="card-body btnhov p-2">
                    <div className="text-secondary text-end">
                      <small>Conector {i + 1}</small>
                    </div>
                    <h5 className="fw-bold">{connector.placa}</h5>
                    <div className="d-flex fs-6 align-items-center">
                      <div className="progress w-75">
                        <div
                          className={`progress-bar ${getConnStatusClass(
                            connector.status
                          )} w-progress`}
                        >
                          <style jsx>{`
                            .w-progress {
                              width: ${connector.soc !== "N/A"
                                ? +connector.soc
                                : getWProgress(connector.status)}%;
                            }
                            .progress-bar-striped {
                              background-image: linear-gradient(
                                90deg,
                                rgba(255, 255, 255, 0.4) 25%,
                                transparent 25%,
                                transparent 50%,
                                rgba(255, 255, 255, 0.4) 50%,
                                rgba(255, 255, 255, 0.4) 75%,
                                transparent 75%,
                                transparent
                              );
                            }
                          `}</style>
                        </div>
                      </div>
                      <AiTwotoneThunderbolt
                        size={10}
                        className="align-middle"
                      />
                      <strong className="fs-6">
                        {`${connector.soc !== "N/A" ? +connector.soc : 0}%`}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default DashboardEnvelopeCharging;
