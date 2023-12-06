"use client";
import React, { createContext, useState } from "react";
import { PowerManagement } from "../../application/powerManagement";
import { PowerService } from "../../infrastructure/power.service";
import { ConnectorStatus } from "@/app/chargebox/[chargeboxId]/[connectorId]/domain/Status.type";
import { IFunctionalunits } from "../../domain/IFunctionalunits";
import { IDashboardData } from "../../domain/IDashboardData";

export type DashboardContextType = {
  dashboardDataAll: IDashboardData | undefined;
  getDashboardDataAll: () => void;
  data: any[];
  getDashboardData: () => void;
  filterBy: (type: ConnectorStatus, all?: boolean) => void;
  unit01: IFunctionalunits | undefined;
  unit02: IFunctionalunits | undefined;
  order: string | undefined;
  setOrder: (order: string) => void;
  env: string | undefined;
  setEnv: (env: string) => void;
  fuunit: string | undefined;
  setFuunit: (fuunit: string) => void;
  chgr: string | undefined;
  setChgr: (chgr: string) => void;
  isNewData: boolean;
  setIsNewData: (isNewData: boolean) => void;
  isEmptyData: boolean;
  isCharging: boolean;
};

export const DashboardContext = createContext<DashboardContextType | null>(
  null
);

export type valueFilter = {
  status: ConnectorStatus;
  isAll?: boolean;
};

export type DashboardProviderProps = {
  children?: React.ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [unit01, setUnit01] = useState<IFunctionalunits>();
  const [unit02, setUnit02] = useState<IFunctionalunits>();
  const [dashboardDataAll, setDashboardDataAll] = useState<IDashboardData>();
  const [data, setData] = useState([]);
  const [dataQuery, setDataQuery] = useState(data);

  const [isNewData, setIsNewData] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [isEmptyData, setTsEmptyData] = useState(false);
  const [order, setOrder] = useState("asc");
  const [env, setEnv] = useState("-");
  const [fuunit, setFuunit] = useState("-");
  const [chgr, setChgr] = useState("-");
  const [valueFilter, setValueFilter] = useState<valueFilter>({
    status: ConnectorStatus.AVAILABLE,
    isAll: true,
  });

  const managerPower = new PowerManagement(new PowerService());

  const getDashboardDataAll = () => {
    (async () => {
      const { fuuns } = await managerPower.getDashboardData();
      if (fuuns) {
        if (fuuns.fuunkpis && fuuns.fuunkpis.fuunkpi1) {
          await setUnit01(fuuns.fuunkpis.fuunkpi1);
        }
        if (fuuns.fuunkpis && fuuns.fuunkpis.fuunkpi1) {
          await setUnit02(fuuns.fuunkpis.fuunkpi2);
        }
        await setDashboardDataAll(fuuns);
        if (fuuns.chgr && (!data || data.length == 0)) {
          await setData(fuuns.chgr);
        }
      }
    })();
  };

  const getDashboardData = () => {
    (async () => {
      const { fuuns } = await managerPower.getDashboardData(
        order,
        env,
        fuunit,
        chgr
      );
      if (fuuns) {
        if (fuuns.fuunkpis && fuuns.fuunkpis.fuunkpi1) {
          await setUnit01(fuuns.fuunkpis.fuunkpi1);
        }
        if (fuuns.fuunkpis && fuuns.fuunkpis.fuunkpi1) {
          await setUnit02(fuuns.fuunkpis.fuunkpi2);
        }
        if (fuuns.chgr) {
          await setDataQuery(fuuns.chgr);
          await setIsCharging(
            valueFilter.status === ConnectorStatus.CHARGING ||
              valueFilter.status === ConnectorStatus.FINISHING
          );
          if (valueFilter.isAll) {
            await setTsEmptyData(false);
            await setData(fuuns.chgr);
          } else {
            let aux: any = [];
            await fuuns.chgr.forEach((ch: any) => {
              let auxConnector = false;
              ch.connectors.forEach((con: any) => {
                if (con.connector_id != 0) {
                  if (con.status === valueFilter.status) {
                    auxConnector = true;
                  } else if (
                    valueFilter.status === ConnectorStatus.CHARGING &&
                    con.status === ConnectorStatus.FINISHING
                  ) {
                    auxConnector = true;
                  } else if (
                    valueFilter.status === ConnectorStatus.AVAILABLE &&
                    con.status === ConnectorStatus.PREPARING
                  ) {
                    auxConnector = true;
                  }
                }
              });
              if (auxConnector) {
                aux.push(ch);
              }
            });
            if (aux.length == 0) {
              await setTsEmptyData(true);
            } else {
              await setTsEmptyData(false);
              await setData(aux);
            }
          }
        }
      }
    })();
  };

  const filterBy = (type: ConnectorStatus, all?: boolean) => {
    setValueFilter({
      status: type,
      isAll: all ? all : false,
    });
    (async () => {
      await setIsCharging(
        type === ConnectorStatus.CHARGING || type === ConnectorStatus.FINISHING
      );
      if (dataQuery) {
        if (all) {
          await setTsEmptyData(false);
          await setData(dataQuery);
        } else {
          let aux: any = [];
          await dataQuery.forEach((ch: any) => {
            let auxConnector = false;
            ch.connectors.forEach((con: any) => {
              if (con.connector_id != 0) {
                if (con.status === type) {
                  auxConnector = true;
                } else if (
                  type === ConnectorStatus.CHARGING &&
                  con.status === ConnectorStatus.FINISHING
                ) {
                  auxConnector = true;
                } else if (
                  type === ConnectorStatus.AVAILABLE &&
                  con.status === ConnectorStatus.PREPARING
                ) {
                  auxConnector = true;
                }
              }
            });
            if (auxConnector) {
              aux.push(ch);
            }
          });
          if (aux.length == 0) {
            await setTsEmptyData(true);
          } else {
            await setTsEmptyData(false);
            await setData(aux);
          }
        }
      }
    })();
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardDataAll,
        getDashboardDataAll,
        data,
        getDashboardData,
        filterBy,
        unit01,
        unit02,
        order,
        setOrder,
        env,
        setEnv,
        fuunit,
        setFuunit,
        chgr,
        setChgr,
        isNewData,
        setIsNewData,
        isCharging,
        isEmptyData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
