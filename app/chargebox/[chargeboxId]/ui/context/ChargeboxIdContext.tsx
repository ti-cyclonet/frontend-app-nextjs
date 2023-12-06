"use client";

import { ChargeBoxManagement } from "@chargebox/application/chargeboxManagement";
import { IChargeBox } from "@chargebox/domain/IChargebox";
import { ChargeBoxService } from "@chargebox/infraestructure/chargerbox.service";
import { createContext, useState } from "react";

import { ConnectorManagement } from "@chargebox/[chargeboxId]/[connectorId]/application/connectorManagement";
import { ConnectorService } from "@chargebox/[chargeboxId]//[connectorId]/infraestructure/connector.service";

import { OCPPServerClientManagement } from "@ocppserver/application/ocppserverManagement";
import { OCPPServerClientService } from "@ocppserver/infrastructure/ocppserver.service";
import { IChargeboxResetMsg } from "@ocppserver/domain/IChargeboxResetMsg";

import { ToastEventManager } from "@core/infrastructure/utilities/EventsManager";
import { IToastEvent } from "@core/domain/IToastEvent";
import { Ms_Madi } from "next/font/google";
import { IChargeboxInfo } from "@/app/chargebox/domain/IChargeInfo";
import { FunctionalUnitManagement } from "@/app/dashboard/application/functionalUnitManagement";
import { FunctionalUnitService } from "@/app/dashboard/infrastructure/functionalUnit.service";
import { IFunctionalUnit } from "@/app/chargebox/domain/IFunctionalUnit";

export type ChargeIdContextType = {
  current: IChargeBox;
  setCurrent: (charger: IChargeBox) => void;
  currentInfo: IChargeboxInfo;
  setCurrentInfo: (charger: IChargeboxInfo) => void;
  currentFunctionalUnits: IFunctionalUnit[];
  setCurrentFunctionalUnits: (fUnit: IFunctionalUnit[]) => void;
  getChargerById: (id: string) => void;
  getChargerInfoById: (id: string) => void;
  updateCharger: (entity: IChargeboxInfo) => void;
  executeReset: (id: string, resettype: "Soft" | "Hard") => void;
  getAllFunctionalUnits: () => void;
  
};

export const ChargeIdContext = createContext<ChargeIdContextType | null>(null);

export type ChargeIdProviderProps = {
  children?: React.ReactNode;
};

export const ChargeIdProvider: React.FC<ChargeIdProviderProps> = ({
  children,
}) => {
  const [updateView, setUpdateView] = useState(new Date());
  const [current, setCurrent] = useState({});
  const [loadedInfo, setLoadedInfo] = useState<boolean>(false);
  const [currentInfo, setCurrentInfo] = useState<IChargeboxInfo>({
    alias: "",
    charge_box_pk: 0,
    charge_mavdelivpower: "",
    functional_unit_pk: 0,
    connectors: [],
    status: "",
  });
  const functionalUnitManager = new FunctionalUnitManagement(new FunctionalUnitService());
  const [functionalList, setFunctionalList] = useState<any[]>([]);

  const manager = new ChargeBoxManagement(new ChargeBoxService());
  const managerConnector = new ConnectorManagement(new ConnectorService());
  const managerOcpp = new OCPPServerClientManagement(
    new OCPPServerClientService()
  );
  const [currentFunctionalUnits, setCurrentFunctionalUnits] = useState<IFunctionalUnit[]>([]);

  const getChargerById = (id: string) => {
    (async () => {
      const resp = await manager.getChargerById(id);
      if (resp.chargerbox) {
        const respConnector = await managerConnector.getStatusConnector(id);
        resp.chargerbox.connectors = respConnector.status;
        setCurrent(resp.chargerbox ?? {});
      }
    })();
  };

  const getChargerInfoById = (id: string) => {
    (async () => {
      const resp = await manager.getChargerById(id);
      if (resp.chargerbox) {
        setCurrentInfo({
          alias: resp.chargerbox.alias || "",
          charge_box_pk: resp.chargerbox.charge_box_pk || 0,
          charge_mavdelivpower: resp.chargerbox.charge_maxdelivpower || "",
          functional_unit_pk: resp.chargerbox.functional_unit_pk || 0,
          connectors: (resp.chargerbox.connectors as any) || [],
          status: resp.chargerbox.status || ""
        });
        setLoadedInfo(true);
      }
    })();
  };

  const updateCharger = (entity: IChargeboxInfo) => {
    (async () => {
      console.log("Vamos a actualizar el cargador", entity);
      const resp = await manager.updateChargeboxInfo(entity);
      if (resp.success) {
        ToastEventManager.setSubject({
          severity: "success",
          summary: "Cargador actualizado correctamente.",
          life: 4000,
        });
      } else {
        ToastEventManager.setSubject({
          severity: "error",
          summary: "No fue posible actualizar el cargador.",
          detail: "Verifique la información ingresada e intente nuevamente.",
          life: 5000,
        });
      }
    })();
  };

  const executeReset = (id: string, resettype: "Soft" | "Hard") => {
    (async () => {
      const msg: IChargeboxResetMsg = {
        chargeboxID: id,
        resettype: resettype,
      };
      const resp = await managerOcpp.doReset(msg);
      if (resp) {
        ToastEventManager.setSubject({
          severity: "success",
          summary: "Solicitud de " + resettype + " reset enviada exitosamente.",
          life: 4000,
        });
      } else {
        ToastEventManager.setSubject({
          severity: "error",
          summary:
            "No fue posible enviar la solicitud de " + resettype + " reset.",
          life: 5000,
        });
      }
    })();
  };

  const getAllFunctionalUnits = () => {
    (async () => {
      //console.log('load Chargebox on Context (server)');
      const resp = await manager.getAllFunctionalUnits();
      if (resp.functionalUnit) {
        setCurrentFunctionalUnits(resp.functionalUnit);
      }
    })();
  };

  if (currentFunctionalUnits.length === 0) {
    getAllFunctionalUnits();
  }

  return (
    <ChargeIdContext.Provider
      value={{
        current,
        setCurrent,
        currentInfo,
        setCurrentInfo,
        currentFunctionalUnits,
        setCurrentFunctionalUnits,
        getChargerById,
        getChargerInfoById,
        updateCharger,
        executeReset,
        getAllFunctionalUnits
      }}
    >
      {children}
    </ChargeIdContext.Provider>
  );
};
