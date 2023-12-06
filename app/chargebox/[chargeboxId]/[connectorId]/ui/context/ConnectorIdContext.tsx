"use client";
import { createContext, useState } from "react";

import { IConnector, emptyConnector } from "@chargebox/[chargeboxId]/[connectorId]/domain/IConnector";
import { ConnectorManagement } from "@chargebox/[chargeboxId]/[connectorId]/application/connectorManagement";
import { ConnectorService } from "@chargebox/[chargeboxId]/[connectorId]/infraestructure/connector.service";
import { OCPPServerClientManagement } from "@ocppserver/application/ocppserverManagement";
import { OCPPServerClientService } from "@ocppserver/infrastructure/ocppserver.service";
import { IRemoteStopTrxMsg } from "@ocppserver/domain/IRemoteStopTrxMsg";
import { IRemoteStartTrxMsg } from "@ocppserver/domain/IRemoteStartTrxMsg";
import { ToastEventManager } from "@core/infrastructure/utilities/EventsManager";
import { emptyTransaction, ITransaction } from "@transactions/domain/ITransaction";
import { TransactionManagement } from "@transactions/application/transactionManagement";
import { TransactionService } from "@transactions/infrastructure/transaction.service";




export type ConnectorIdContextType = {
  updateView: any;
  setUpdateView: (updateView: any) => void;
  current: IConnector;
  setCurrent: (charger: IConnector) => void;
  currentTransaction: ITransaction;
  setCurrentTransaction: (transaccion: ITransaction) => void;
  getConnectorById: (chargeboxId: string, connectorId: string) => void;
  executeRemoteStopTrx: (chargeboxId: string, transactionId: string) => void;
  executeRemoteStartTrx: (chargeboxId: string, connectorId: string) => void;
  getCurrentTransactionByConnector: (connectorPk: string)=> void;
};

export const ConnectorIdContext = createContext<ConnectorIdContextType | null>(null);

export type ConnectorIdProviderProps = {
  children?: React.ReactNode;
};



export const ConnectorIdProvider: React.FC<ConnectorIdProviderProps> = ({
  children,
}) => {
  const [updateView, setUpdateView] = useState(new Date());
  const [current, setCurrent] = useState(emptyConnector);
  const [currentTransaction, setCurrentTransaction] = useState(emptyTransaction);

  const manager = new ConnectorManagement(new ConnectorService());
  const managerOcpp = new OCPPServerClientManagement(new OCPPServerClientService());
  const managerTrx = new TransactionManagement(new TransactionService());

  const getCurrentTransactionByConnector = (connectorPk: string) => {
    (async () => {
      //console.log("Connector_PK:" + connectorPk);
      const resp = await managerTrx.getCurrentTransactionByConnector(connectorPk);
      //console.log(resp);
      if (resp.success && resp.transaction) {
        //console.log(resp);
        setCurrentTransaction(resp.transaction as ITransaction);
        setUpdateView(new Date());
      }else{
        console.log("No hay transacciones en curso en este connector.");
      }
    })();
  };

  const getConnectorById = (chargeboxId: string, connectorId: string) => {
    (async () => {
      const resp = await manager.getConnectorByIdByChargebox(connectorId, chargeboxId);
      if (resp.connector) {
        //console.log(resp);        
        setCurrent(resp.connector as IConnector);
        setUpdateView(new Date());
      }
    })();
  };

  const executeRemoteStopTrx = (chargeboxId: string, transactionId: string) => {
    if (chargeboxId.length > 0) {
      (async () => {
        const msg: IRemoteStopTrxMsg = {
          chargeboxID: chargeboxId,
          transactionId: transactionId
        }
        const resp = await managerOcpp.doRemoteStopTrx(msg);
        if (resp) {
          ToastEventManager.setSubject(
            {
              severity: "success",
              summary: "Solicitud de terminación de transacción enviada exitosamente.",
              life: 4000
            }
          );
        } else {
          ToastEventManager.setSubject(
            {
              severity: "error",
              summary: "No fue posible enviar la solicitud de terminación de transacción .",
              life: 5000
            }
          );
        }
      })()
    } else { 
      ToastEventManager.setSubject(
        {
          severity: "error",
          summary: "No fue posible enviar la solicitud de terminación de transacción .",
          detail: "No fue posible determinar el connector y/o la transaccion que se debe finalizar.",
          life: 5000
        }
      );
    }
  }

  const executeRemoteStartTrx = (chargeboxId: string, connectorId: string) => {
    //console.log("["+(chargeboxId)+"]["+(connectorId)+"]");    
    if (chargeboxId.length>0 && connectorId) {
      (async () => {
        const msg: IRemoteStartTrxMsg = {          
          chargeboxID: chargeboxId,
          connectorID: connectorId,
          tagID: "SiemensIDTAG"
        }
        const resp = await managerOcpp.doRemoteStartTrx(msg);
        if (resp) {
          ToastEventManager.setSubject(
            {
              severity: "success",
              summary: "Solicitud de inicio de transacción enviada exitosamente.",
              life: 4000
            }
          );
        } else {
          ToastEventManager.setSubject(
            {
              severity: "error",
              summary: "No fue posible enviar la solicitud de inicio de transacción .",
              life: 5000
            }
          );
        }
      })()
    } else { 
      ToastEventManager.setSubject(
        {
          severity: "error",
          summary: "No fue posible enviar la solicitud de inicio de transacción .",
          detail: "No fue posible determinar el cargador y/o el conector que se debe finalizar.",
          life: 5000
        }
      );
    }
  }

  return (
    <ConnectorIdContext.Provider value={{ 
        updateView, setUpdateView, 
        current, setCurrent, 
        currentTransaction, setCurrentTransaction, 
        getConnectorById, 
        executeRemoteStopTrx, executeRemoteStartTrx, 
        getCurrentTransactionByConnector }}>
      {children}
    </ConnectorIdContext.Provider>
  );
};
