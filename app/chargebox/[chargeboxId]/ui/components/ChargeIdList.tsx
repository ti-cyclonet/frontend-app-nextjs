"use client";

import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  ChargeIdContext,
  ChargeIdContextType,
} from "../context/ChargeboxIdContext";
import { IConnector } from "../../[connectorId]/domain/IConnector";
import "../styles/ChargeId.css";
import "../../../ui/styles/status.css";
import { ConnectorStatus } from "../../[connectorId]/domain/Status.type";
import { Row } from "react-bootstrap";
import Link from "next/link";
import Placeholder from 'react-bootstrap/Placeholder';

const ChargeIdList = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { current } = useContext(ChargeIdContext) as ChargeIdContextType;

  const _interval = 15;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [reloadInfo, setReloadInfo] = useState(false);

  const getSoc = (soc: string) => {
    if (soc && soc !== '0' && soc !== 'N/A') {
      return '' + soc + '%'
    } else {
      return ''
    }
  }

  const getClassStatus = (connectorStatus: string) => {
    switch (connectorStatus) {
      case ConnectorStatus.AVAILABLE:
        return "bg-available text-dark";
      case ConnectorStatus.PREPARING:
        return "bg-available int text-dark";
      case ConnectorStatus.CHARGING:
        return "bg-charging int text-dark";
      case ConnectorStatus.FINISHING:
        return "bg-charging text-dark";
      case ConnectorStatus.FAULTED:
        return "bg-faulted text-white";
      case ConnectorStatus.OFFLINE:
        return "bg-offline text-dark";
      case ConnectorStatus.INACTIVE:
        return "bg-inactive text-dark";
      case ConnectorStatus.RESERVED:
        return "bg-inactive text-dark";
      default:
        return "bg-offline text-dark";
    }
  };

  useEffect(() => {
    if (time === 0) {
      console.log("Cargando Info", current, reloadInfo);
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
 
  return (
    <>
    {current && current.connectors && current.connectors.length>0 ? (
      <Row>
            {current.connectors?.map && current.connectors?.map((connector, i) => {
              if (connector.connector_id != '0') { // se omiten el connector_id 0 ya que no es un conector real
                const classNames = `connector-header ${getClassStatus(
                  connector.status ?? ""
                )}`;
                return (
                  <Link href={`${pathName}/${connector.connector_id}`}
                    className="col-12 col-sm-6 col-md-3"
                    style={{ textDecoration: 'none' }}
                    key={i}
                  >
                    <div className={`${classNames} h-75`}>
                      <small>{current.fuun_name}-{current.alias}</small>
                      <br />
                      <strong>Conector {connector.connector_id ?? ''}{connector.placa ? `(${connector.placa})` : ''} - {connector.status} {getSoc(connector.soc ?? '0')}</strong>
                    </div>
                  </Link>
                );
              }
            })}
          </Row>
        ) : (
          <Row>
            {Array.from({ length: 3 }).map((col, index) => (
              <div className="col-4" key={index} >
                <div className="px-5 connector-header connector-offline" style={{minHeight: '5rem'}}>
                  <Row><Placeholder as="p" xs={3} /></Row>
                  <Row><Placeholder as="strong" xs={2} /></Row>
                </div>
              </div>              
            ))}
          </Row>
        )}
    </>
  );
};

export default ChargeIdList;
