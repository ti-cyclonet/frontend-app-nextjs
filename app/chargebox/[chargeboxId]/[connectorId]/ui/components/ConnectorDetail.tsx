"use client";
import { useEffect, useState, useContext } from "react";
import {
  ConnectorIdContext,
  ConnectorIdContextType,
} from "@chargebox/[chargeboxId]/[connectorId]/ui/context/ConnectorIdContext";
import { ConnectorStatus } from "@chargebox/[chargeboxId]/[connectorId]/domain/Status.type";
import "@chargebox/ui/styles/status.css";
import "@chargebox/[chargeboxId]/ui/styles/ChargeId.css";
import { Row } from "react-bootstrap";

import * as Feather from "react-icons/fi";
import { Col } from "react-bootstrap";
import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UIModal } from "@core/infrastructure/ui/components/UIModal";
import Placeholder from "react-bootstrap/Placeholder";
import { useSession } from "next-auth/react";

export type ConnectorParam = {
  chargeboxId: string;
  connectorId: string;
};

const ConnectorDetail: React.FC<ConnectorParam> = ({
  chargeboxId,
  connectorId,
}) => {
  const {
    current,
    getConnectorById,
    getCurrentTransactionByConnector,
    currentTransaction,
    executeRemoteStartTrx,
    executeRemoteStopTrx,
    updateView,
  } = useContext(ConnectorIdContext) as ConnectorIdContextType;
  const _interval = 15; // Mover a propiedad de sistema
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const [classNames, setClassNames] = useState("");
  const [classTextColor, setClassTextColor] = useState("text-dark");
  const [show, setShow] = useState(false);
  let {data} = useSession();

  const getSoc = (soc: string) => {
    if (soc && soc !== "0" && soc !== "N/A") {
      return "" + soc + "%";
    } else {
      return "";
    }
  };

  const disableRemoteStopAction = (currentStatus: string | undefined) => {
    if (
      !currentStatus ||
      currentStatus === ConnectorStatus.OFFLINE ||
      currentStatus === ConnectorStatus.AVAILABLE
    ) {
      return true;
    }
    return false;
  };

  const disableRemoteStartAction = (currentStatus: string | undefined) => {
    if (
      !currentStatus ||
      currentStatus === ConnectorStatus.OFFLINE ||
      currentStatus === ConnectorStatus.CHARGING ||
      currentStatus === ConnectorStatus.FINISHING ||
      currentStatus === ConnectorStatus.PREPARING
    ) {
      return true;
    }
    return false;
  };

  const getClassStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case ConnectorStatus.AVAILABLE:
        setClassTextColor("text-dark");
        return "bg-available";
      case ConnectorStatus.PREPARING:
        setClassTextColor("text-dark");
        return "bg-available int";
      case ConnectorStatus.CHARGING:
        setClassTextColor("text-dark");
        return "bg-charging int";
      case ConnectorStatus.FINISHING:
        setClassTextColor("text-dark");
        return "bg-charging";
      case ConnectorStatus.FAULTED:
        setClassTextColor("text-white");
        return "bg-faulted";
      case ConnectorStatus.OFFLINE:
        setClassTextColor("text-dark");
        return "bg-offline";
      case ConnectorStatus.INACTIVE:
        setClassTextColor("text-dark");
        return "bg-inactive";
      case ConnectorStatus.RESERVED:
        setClassTextColor("text-dark");
        return "bg-inactive";
      default:
        setClassTextColor("text-dark");
        return "bg-offline";
    }
  };

  const handleRemoteStop = (event: any) => {
    event.preventDefault();
    executeRemoteStopTrx(current.chargebox_id ?? "", current.current_trx ?? "");
  };

  const handleRemoteStart = (event: any) => {
    event.preventDefault();
    executeRemoteStartTrx(
      current.chargebox_id ?? "",
      current.connector_id ?? ""
    );
  };

  const getConnectorById2 = () => {
    if (chargeboxId && connectorId) {
      getConnectorById(chargeboxId, connectorId);
    }
  };

  useEffect(() => {
    if (time === 0) {
      //setIsRunning(false);
      //setTime(_interval);
      getConnectorById2();
    }
  }, [time]);

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
    if (current.connector_pk && current.status === "Charging") {
      getCurrentTransactionByConnector(current.connector_pk);
    }

    if (current) {
      setTime(_interval);
    }

    setClassNames(`${getClassStatus(current.status ?? "")}`);
  }, [current]);

  //disabled={(!currentTransaction || !(currentTransaction.id.length > 0) )}

  return (
    <>
      {current && current.connector_pk ? (
        <>
          <Row className={"mx-0 connector-header " + classNames}>
            <Col>
              <h2 className={classTextColor}>
                {current.fuun_name ? current.fuun_name + "-" : ""}
                {current.alias ?? current.connector_pk} - Conector{" "}
                {current.connector_id ?? ""}
                {current.placa ? `(${current.placa})` : ""}{" - "}
                {current.status ?? "Unknow"}{" "}
                {getSoc(current.soc ?? "0")}
              </h2>
              <strong className={classTextColor}>
                {current.status ?? "Unknow"}
              </strong>
              {data?.user?.roles.includes('OPERATOR') || data?.user?.roles.includes('VIEWER') ? '' :
                <Feather.FiTool
                  size={18}
                  className={`align-middle mx-3 ${classTextColor}`}
                  onClick={() => setShow(true)}
                />
              }
            </Col>
            {data?.user?.roles.includes('VIEWER') ? '' :
              <Col md={12} xl={4} className="d-flex justify-content-end">
                <UIButton
                  className="btn-reset col-xs-12"
                  disabled={disableRemoteStartAction(current.status)}
                  label="Remote Start"
                  type="button"
                  onClick={handleRemoteStart}
                />
                <UIButton
                  className="btn-reset col-xs-12"
                  disabled={disableRemoteStopAction(current.status)}
                  label="Remote Stop"
                  type="button"
                  onClick={handleRemoteStop}
                />
              </Col>
            }
          </Row>

          <UIModal
            closeButton={true}
            size="xl"
            show={show}
            title="Información del conector"
            onHide={() => setShow(false)}
          >
            <Row>
              <Col md={3}>
                <strong>Id: {current.connector_id}</strong>
              </Col>
              <Col md={9}>
                <strong>
                  Ubicacion: {current.connector_location || "Sin asignar"}
                </strong>
              </Col>
            </Row>
          </UIModal>
        </>
      ) : (
        <Row className="mx-0 connector-header connector-offline">
          <Col>
            <h2>
              <Placeholder as="h1" bg="ligth" xs={3} />
            </h2>
            <span>
              <Placeholder as="p" xs={2} />
            </span>
          </Col>
          <Col md={12} xl={4} className="d-flex justify-content-end">
            <Placeholder.Button
              variant="secondary"
              sx={6}
              className="placeholder-btn"
            />
            <Placeholder.Button
              variant="secondary"
              sx={6}
              className="placeholder-btn"
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ConnectorDetail;
