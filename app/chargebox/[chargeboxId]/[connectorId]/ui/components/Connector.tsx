import ProgressBar from "react-bootstrap/ProgressBar";
import { ConnectorStatus } from "../../domain/Status.type";
import '../../../../../chargebox/ui/styles/status.css';
import '../../../../[chargeboxId]/ui/styles/ChargeId.css';

export type ConnectorType = {
  label: string;
  connectorId: string;
  status: string;
  soc?: string;
};

const Connector: React.FC<ConnectorType> = ({
  label,
  connectorId,
  status,
  soc,
}) => {
  const getClassStatus = (connectorStatus: string) => {
    switch (connectorStatus) {
      case ConnectorStatus.AVAILABLE:
        return "success-state";
      case ConnectorStatus.CHARGING:
        return "info-state";
      case ConnectorStatus.OFFLINE:
        return "offline-state";
      default:
        return "";
    }
  };
  const classNames = `connector-block ${getClassStatus(status ?? "")}`;
  return (
    <div className={classNames}>
      <small>DC Plug-in - CCS2</small>
      <br />
      <strong>{connectorId}</strong>
      {soc && soc?.toString() !== "N/A" ? <ProgressBar now={+soc} label={`${soc}%`} /> : null}
    </div>
  );
};

export default Connector;
