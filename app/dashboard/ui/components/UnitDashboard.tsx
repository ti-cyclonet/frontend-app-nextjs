"use client";
import { Col, Row } from "react-bootstrap";
import { ChartLimitWatts } from "./ChartLimitWatts";
import { ChartAllConectors } from "./ChartAllConectors";
import { Color } from "@/app/constants/colors.enum";
import { IFunctionalunits } from "../../domain/IFunctionalunits";

export default function UnitDashboard(fuun: IFunctionalunits) {
  return (
    <>
      <div className="card shadow flex-md-row h-md-250 position-relative mb-1">
        <div className="card-body p-1 row">
          <h5 className="card-subtitle text-center my-2 fw-bold">
            {fuun.unitName} - {fuun.unitDescription}
          </h5>
          <Col className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            {fuun.powerMax && fuun.powerMax > 0 && (
              <ChartLimitWatts
                label={["Utilizado", "Disponible"]}
                labelLimite={["Limite", "Exceso", "Disponible"]}
                dataValue={[fuun.powerUsed, fuun.powerUsed - fuun.powerMax]}
                dataValueLimite={[
                  fuun.limite,
                  fuun.powerUsed - fuun.limite <= 0
                    ? 0
                    : fuun.powerUsed - fuun.limite,
                  fuun.powerUsed - fuun.limite < 0
                    ? 0
                    : fuun.powerMax -
                      (fuun.limite + (fuun.powerUsed - fuun.limite)),
                ]}
                backgroundColor={[Color.AVAILABLE, Color.OFFLINE]}
                porcentageUsed={fuun.porcentageUsed}
                powerUsed={fuun.powerUsedString}
                powerMax={fuun.powerMaxString}
              />
            )}
          </Col>
          <Col className="my-auto col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className="flex">
              <div className="d-flex justify-content-center my-auto">
                <p className="d-flex justify-content-center fs-6 my-0">
                  Cargadores
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <p className="d-flex justify-content-center fs-1 my-0">
                  {fuun.percentageChargers}%
                </p>
              </div>
              <Row className="d-flex justify-content-center">
                <p className="d-flex justify-content-center fs-6 my-0">
                  {fuun.availableChargers}&nbsp;/&nbsp;{fuun.totalChargers}
                </p>
              </Row>
            </div>
          </Col>
          <Col className="my-auto col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
            <div className="flex">
              <div className="d-flex justify-content-center my-auto">
                <p className="d-flex justify-content-center fs-6 my-0">
                  Conectores
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <p className="d-flex justify-content-center fs-1 my-0">
                  {fuun.percentageConnectors}%
                </p>
              </div>
              <Row className="d-flex justify-content-center">
                <p className="d-flex justify-content-center fs-6 my-0">
                  {fuun.availableConnectors}&nbsp;/&nbsp;{fuun.totalConnectors}
                </p>
              </Row>
            </div>
          </Col>
          <Col className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <ChartAllConectors
              label={[
                `Ocupados: ${fuun.chargingConnectors}`,
                `Disponibles: ${fuun.availableConnectors}`,
                `Con Falla: ${fuun.errorConnectors}`,
                `Desconectados: ${fuun.offlineConnectors}`,
              ]}
              dataValue={[
                Math.round(
                  (fuun.chargingConnectors / fuun.totalConnectors) * 100
                ),
                Math.round(
                  (fuun.availableConnectors / fuun.totalConnectors) * 100
                ),
                Math.round((fuun.errorConnectors / fuun.totalConnectors) * 100),
                Math.round(
                  (fuun.offlineConnectors / fuun.totalConnectors) * 100
                ),
              ]}
              backgroundColor={[
                Color.CHARGING,
                Color.AVAILABLE,
                Color.FAULTED,
                Color.OFFLINE,
              ]}
              totalConnectors={fuun.totalConnectors}
            />
          </Col>
        </div>
      </div>
    </>
  );
}
