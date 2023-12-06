"use client";
import { useContext, useEffect, useState } from "react";
import ChargeIdList from "@chargebox/[chargeboxId]/ui/components/ChargeIdList";
import {
  ChargeIdContext,
  ChargeIdContextType,
} from "@chargebox/[chargeboxId]/ui/context/ChargeboxIdContext";

import { UIModal } from "@core/infrastructure/ui/components/UIModal";
import { Col, Row } from "react-bootstrap";

import { UIButton, UIInput } from "@core/infrastructure/ui/components";

import * as Feather from "react-icons/fi";
import Placeholder from "react-bootstrap/Placeholder";
import { ConnectorStatus } from "../../[connectorId]/domain/Status.type";
import { IChargeboxInfo } from "@/app/chargebox/domain/IChargeInfo";
import { useSession } from "next-auth/react";
import { UIDropdown } from "@/app/core/infrastructure/ui/components/UIDropdown";

export const ChargeIdDetail = ({ chargeboxId }: any) => { 
  const {
    current,
    setCurrent,
    currentInfo,
    setCurrentInfo,
    getChargerById,
    getChargerInfoById,
    updateCharger,
    executeReset,
    currentFunctionalUnits,
    getAllFunctionalUnits,
  } = useContext(ChargeIdContext) as ChargeIdContextType;
  const _interval = 15; // Mover a propiedad de sistema
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [show, setShow] = useState(false);
  const [classNames, setClassNames] = useState("");
  const [optionFUnits, setOptionFUnits] = useState([]);

  let {data} = useSession();

  useEffect(() => {
    let aux: any = [
      {
        label: "Sin Asignar",
        value: 0,
      },
    ];
    currentFunctionalUnits.forEach((funit) => {
      aux.push({
        label: funit.fuun_name || "",
        value: funit.functional_unit_pk || 0,
      });
    });
    setOptionFUnits(aux);
  }, [currentFunctionalUnits]);

  const disableActions = (status: string | undefined) => {
    if (!status || status === "" || status === "Offline") {
      return true;
    }
    return false;
  };

  const getClassStatus = (status: string) => {
    switch (status) {
      case ConnectorStatus.AVAILABLE:
        return "chargebox-available";
      case ConnectorStatus.CHARGING:
        return "connector-charging";
      default:
        return "chargebox-offline";
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getChargeboxStatusClass = () => {
    let available: number = 0;
    let charging: number = 0;
    let offline: number = 0;
    let error: number = 0;
    let inactive: number = 0;
    let chgr = current;
    if (current.connectors) {
      current.connectors.forEach((connector: any) => {
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
    }
    switch (true) {
      case error > 0:
        chgr.status= ConnectorStatus.FAULTED;
        setCurrent(chgr);
        return "bg-error text-white";
      case charging > 0:
        chgr.status= ConnectorStatus.CHARGING;
        setCurrent(chgr);
        return "bg-charging text-dark";
      case available > 0:
        chgr.status= ConnectorStatus.AVAILABLE;
        setCurrent(chgr);
        return "bg-available text-dark";
      case inactive > 0:
        chgr.status= ConnectorStatus.INACTIVE;
        setCurrent(chgr);
        return "bg-inactive text-dark";
      case offline > 0:
        chgr.status= ConnectorStatus.OFFLINE;
        setCurrent(chgr);
        return "bg-offline text-dark";
      default:
        chgr.status= ConnectorStatus.OFFLINE;
        setCurrent(chgr);
        return "bg-offline text-dark";
    }
  };

  const handleSoftReset = (event: any) => {
    if (current.charge_box_id) {
      event.preventDefault();
      executeReset(current.charge_box_id, "Soft");
    }
  };

  const handleHardReset = (event: any) => {
    if (current.charge_box_id) {
      event.preventDefault();
      executeReset(current.charge_box_id, "Hard");
    }
  };

  useEffect(() => {
    if (time === 0) {
      getChargerById(chargeboxId);
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
    if (current) {
      setTime(_interval);
    }
    setClassNames(`${getChargeboxStatusClass()}`);
  }, [current, getChargeboxStatusClass]);

  useEffect(() => {
    getChargerInfoById(chargeboxId);
  }, [chargeboxId]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateCharger(currentInfo);
    setShow(false);
  };

  const handleChange = (event: any, index?: number) => {
    let _currentInfo = { ...currentInfo };
    if (index !== undefined) {
      const { value } = event.target;
      (_currentInfo as IChargeboxInfo).connectors[index].connectorlocation =
        value;
    } else {
      const { name, value } = event.target;
      _currentInfo = { ...currentInfo, [name]: value };
    }
    setCurrentInfo(_currentInfo);
  };


  return (
    <>
      {current && current.charge_box_id  ? (
        <>
          <div className="flex-fill">
            <Row className={"mx-0 chargebox-header " + classNames}>
              <Col>
                <h2 className={classNames}>
                  {current.fuun_name ? current.fuun_name : ""} -
                  {current.alias ?? current.charge_box_id} -{" "}
                  {current.status ?? "Unknow"}
                </h2>
                <span>
                  {!current.status || current.status === "Offline"
                    ? "Offline"
                    : "Online"}
                </span>
                {data?.user?.roles.includes('OPERATOR') || data?.user?.roles.includes('VIEWER') ? '' :
                  <Feather.FiTool
                    size={18}
                    className="align-middle mx-3"
                    onClick={() => setShow(true)}
                  />
                }
              </Col>
              {data?.user?.roles.includes('VIEWER') ? '' :
                <Col md={12} xl={4} className="d-flex justify-content-end">
                  <UIButton
                    className="btn-reset col-xs-12"
                    disabled={disableActions(current.status ?? "")}
                    label="Soft Reset"
                    type="button"
                    onClick={handleSoftReset}
                  />
                  <UIButton
                    className="btn-reset col-xs-12"
                    disabled={disableActions(current.status ?? "")}
                    label="Hard Reset"
                    type="button"
                    onClick={handleHardReset}
                  />
                </Col>
              }
            </Row>
            <ChargeIdList></ChargeIdList>
          </div>
          <UIModal
            closeButton={true}
            size="xl"
            show={show}
            title="Información del cargador"
            onHide={() => setShow(false)}
          >
            <Row>
              <Col md={4}>
                <div>
                  <p>
                    <strong>CHARGE_BOX_PK: </strong>
                    {current.charge_box_pk}
                  </p>
                  <p>
                    <strong>CHARGE_BOX_ID: </strong>
                    {current.charge_box_id}
                  </p>
                  <p>
                    <strong>PROTOCOLO OCCP: </strong>
                    {current.ocpp_protocol}
                  </p>
                  <p>
                    <strong>ESTADO DE REGISTRO: </strong>
                    {current.registration_status}
                  </p>
                  <p>
                    <strong>PROVEEDOR DE PUNTO DE CARGA: </strong>
                    {current.charge_point_vendor}
                  </p>

                  <p>
                    <strong>MODELO DE PUNTO DE CARGA: </strong>
                    {current.charge_point_model}
                  </p>
                  <p>
                    <strong>FECHA DE ÚLTIMA SEÑAL: </strong>
                    {new Date(
                      current.last_heartbeat_timestamp || ""
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <p>
                    <strong>DESCRIPCION: </strong>
                    {current.description}
                  </p>
                  <p>
                    <strong>NOTA: </strong>
                    {current.note}
                  </p>
                  <p>
                    <strong>ALIAS: </strong>
                    {current.alias}
                  </p>
                  <p>
                    <strong>NUMERO SERIAL DE PUNTO DE CARGA: </strong>
                    {current.charge_point_serial_number}
                  </p>
                </div>
              </Col>
              <Col md={8}>
                <form onSubmit={handleSubmit} method="post" className="mt-3">
                  <Row>
                    <Col md={6} sm={6}>
                      <UIInput
                        required
                        label="Alias: "
                        name="alias"
                        value={currentInfo.alias}
                        onChange={handleChange}
                        labelOnTop={true}
                      />
                      <UIDropdown
                        required
                        label="Unidad funcional: "
                        name="functional_unit_pk"
                        value={currentInfo.functional_unit_pk?.toString()}
                        onChange={handleChange}
                        options={optionFUnits}
                        labelOnTop={true}
                      />
                      <UIInput
                        required
                        label="Potencia limite max (kW): "
                        name="charge_mavdelivpower"
                        value={currentInfo.charge_mavdelivpower}
                        onChange={handleChange}
                        labelOnTop={true}
                      />
                      <UIInput
                        required
                        label="Estatus: "
                        name="status"
                        value={currentInfo.status}
                        onChange={handleChange}
                        labelOnTop={true}
                        disabled={true}
                      />
                    </Col>
                    <Col md={6} sm={6}>
                      {currentInfo.connectors.map((connector, i) => (
                        <UIInput
                          key={`connector-${i}`}
                          required
                          label={`Connector ${connector.connector_id} ${
                            connector.connectoralias
                              ? ":" + connector.connectoralias
                              : ""
                          } Ubicacion:`}
                          name={`connector-${i}`}
                          value={connector.connectorlocation}
                          onChange={(e) => handleChange(e, i)}
                          labelOnTop={true}
                        />
                      ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} sm={12}>
                      <div className="mx-auto text-end p-2">
                        {
                          //<UIButton label="Nuevo" type='reset' onClick={handleAdd} />
                        }
                        <UIButton label={"Actualizar"} />
                        <UIButton
                          label="Descartar"
                          type="button"
                          onClick={() => {
                            if (setShow) {
                              setShow(false);
                            }
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </UIModal>
        </>
      ) : (
        <>
          <Row className="mx-0 chargebox-header chargebox-offline">
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
          <ChargeIdList></ChargeIdList>
        </>
      )}
    </>
  );
};
