import { FC, createContext, useState } from "react";
import { IPowerLimit } from "../../domain/IPowerLimit";
import { PowerLimitManagement } from "../../application/powerLimitManagement";
import { PowerLimitService } from "../../infraestructure/powerLimit.service";
import { ToastEventManager } from "@/app/core/infrastructure/utilities/EventsManager";
import { ChargeGroupService } from "../../infraestructure/chargeGroup.service";
import { IChargeGroup } from "../../domain/IChargeGroup";

export type ChargePerfilType = {
  limits: Array<IPowerLimit>;
  setLimits: (limits: Array<IPowerLimit>) => void;
  chargeGroups: Array<IChargeGroup> | null;
  setChargeGroups: (chargeGroups: Array<IChargeGroup>) => void;
  loadChargeGroups: () => void;
  currentGroup: (IChargeGroup | null);
  setCurrentGroup: (chargeGroup: (IChargeGroup | null)) => void;
};

export const ChargePerfilContext = createContext<ChargePerfilType | null>(null);

export type ChargePerfilProviderProps = {
  children?: React.ReactNode;
};

export const ChargePerfilProvider: FC<ChargePerfilProviderProps> = ({
  children,
}) => {

  const [limits, setLimits] = useState<Array<IPowerLimit>>([]);
  const [chargeGroups, setChargeGroups] = useState<Array<IChargeGroup> | null>(null);
  const [currentGroup, setCurrentGroup] = useState<IChargeGroup | null>(null);

  const manager = new PowerLimitManagement(new PowerLimitService(), new ChargeGroupService());

  const loadChargeGroups = () => {
    (async () => {
      const resp = await manager.getAllChargeGroups();
      if (resp.chargeGroups) {
        setChargeGroups(resp.chargeGroups);
      } else {
        setChargeGroups([] as IChargeGroup[]);
      }
    })();
  }

  if (!chargeGroups) {
    loadChargeGroups();
  }

  return (
    <ChargePerfilContext.Provider
      value={{ limits, setLimits , chargeGroups, setChargeGroups, loadChargeGroups, currentGroup, setCurrentGroup }}
    >
      {children}
    </ChargePerfilContext.Provider>
  );
};
