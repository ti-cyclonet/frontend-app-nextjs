"use client";
import React, { Suspense, useContext } from "react";
import {
  DashboardContext,
  DashboardContextType,
} from "@/app/dashboard/ui/context/DashboardContext";
import DashboardConnectorChargebox from "./DashboardConnectorChargebox";
import UnitDashboard from "./UnitDashboard";
import LoadingButton from "@/app/core/infrastructure/ui/components/LoadingButton";

export const DashboardCrud = () => {
  const { unit01, unit02, getDashboardDataAll } = useContext(
    DashboardContext
  ) as DashboardContextType;

  if (!unit01 || !unit01.idUnit || !unit02 || !unit02.idUnit) {
    getDashboardDataAll();
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 py-2">
          {unit01 && unit01.idUnit && (
            <Suspense fallback={<LoadingButton />}>
              <UnitDashboard
                idUnit={unit01.idUnit}
                unitName={unit01.unitName}
                unitDescription={unit01.unitDescription}
                totalChargers={unit01.totalChargers}
                availableChargers={unit01.availableChargers}
                percentageChargers={unit01.percentageChargers}
                totalConnectors={unit01.totalConnectors}
                availableConnectors={unit01.availableConnectors}
                chargingConnectors={unit01.chargingConnectors}
                errorConnectors={unit01.errorConnectors}
                offlineConnectors={unit01.offlineConnectors}
                inactiveConnectors={unit01.inactiveConnectors}
                percentageConnectors={unit01.percentageConnectors}
                powerUsed={unit01.powerUsed}
                powerUsedString={unit01.powerUsedString}
                porcentageUsed={unit01.porcentageUsed}
                limite={unit01.limite}
                limiteString={unit01.limiteString}
                powerMax={unit01.powerMax}
                powerMaxString={unit01.powerMaxString}
              />
            </Suspense>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 py-2">
          {unit02 && unit02.idUnit && (
            <Suspense fallback={<LoadingButton />}>
              <UnitDashboard
                idUnit={unit02.idUnit}
                unitName={unit02.unitName}
                unitDescription={unit02.unitDescription}
                totalChargers={unit02.totalChargers}
                availableChargers={unit02.availableChargers}
                percentageChargers={unit02.percentageChargers}
                totalConnectors={unit02.totalConnectors}
                availableConnectors={unit02.availableConnectors}
                chargingConnectors={unit02.chargingConnectors}
                errorConnectors={unit02.errorConnectors}
                offlineConnectors={unit02.offlineConnectors}
                inactiveConnectors={unit02.inactiveConnectors}
                percentageConnectors={unit02.percentageConnectors}
                powerUsed={unit02.powerUsed}
                powerUsedString={unit02.powerUsedString}
                porcentageUsed={unit02.porcentageUsed}
                limite={unit02.limite}
                limiteString={unit02.limiteString}
                powerMax={unit02.powerMax}
                powerMaxString={unit02.powerMaxString}
              />
            </Suspense>
          )}
        </div>
      </div>
      <div className="py-2">
        <DashboardConnectorChargebox></DashboardConnectorChargebox>
      </div>
    </>
  );
};
