"use client";
import { createContext, useEffect, useState } from "react";

import { IChargeBox } from "@chargebox/domain/IChargebox";
import { ChargeBoxManagement } from "@chargebox/application/chargeboxManagement";
import { ChargeBoxService } from "@chargebox/infraestructure/chargerbox.service";
import { IFunctionalUnit } from "../../domain/IFunctionalUnit";

export type ChargeContextType = {
  current: IChargeBox;
  setCurrent: (charger: IChargeBox) => void;
  currentFunctionalUnits: IFunctionalUnit;
  setCurrentFunctionalUnits: (fUnit: IFunctionalUnit) => void;
  chargers: IChargeBox[] | null;
  loadChargers: () => void;
  getAllFunctionalUnits: () => void;
};

export const ChargeContext = createContext<ChargeContextType | null>(null);

export type ChargeProviderProps = {
  children?: React.ReactNode;
};

export const ChargeProvider: React.FC<ChargeProviderProps> = ({ children }) => {
  const [updateView, setUpdateView] = useState(new Date());
  const [current, setCurrent] = useState({});
  const [currentFunctionalUnits, setCurrentFunctionalUnits] = useState({ });
  const [chargers, setChargers] = useState<IChargeBox[] | null>(null);

  const manager = new ChargeBoxManagement(new ChargeBoxService());

  const loadChargers = () => {
    (async () => {
      //console.log('load Chargebox on Context (server)');
      const resp = await manager.getAllChargers();
      if (resp.chargerbox) {
        setChargers(resp.chargerbox as IChargeBox[]);
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

  if (!chargers) loadChargers();

  getAllFunctionalUnits();

  return (
    <ChargeContext.Provider
      value={{
        current,
        setCurrent,
        chargers,
        loadChargers,
        currentFunctionalUnits,
        setCurrentFunctionalUnits,
        getAllFunctionalUnits
      }}
    >
      {children}
    </ChargeContext.Provider>
  );
};
