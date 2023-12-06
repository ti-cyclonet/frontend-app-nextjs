"use client";
import React, { ReactNode } from "react";
import { TransactionProvider } from '@transactions/ui/context/TransactionContext';
import { TransactionCrud } from '@transactions/ui/components/TransactionCrud';

import { ErrorProvider } from '@errors/ui/context/ErrorContext';
import { ErrorCrud } from '@errors/ui/components/ErrorCrud';

import { UITabs } from "@core/infrastructure/ui/components/UITabs";

import { ChargeIdDetail } from "./ChargeIdDetail";


const ChargeIdCrud = ({ chargeboxId }: any) => {

  const contentTabTrxs = (): ReactNode => {
    return (
      <TransactionProvider>
        <TransactionCrud queryType="chargebox" id={chargeboxId} />
      </TransactionProvider >
    );
  }

  const contentTabErrors = (): ReactNode => {
    return (
      <ErrorProvider>
        <ErrorCrud queryType='chargebox' id={chargeboxId} />
      </ErrorProvider >
    );
  }

  const tabItems = [
    //{field: 'id', header: 'Id'},
    { title: "Transacciones", eventKey: "trxs", content: contentTabTrxs },
    { title: "Errores", eventKey: "errores", content: contentTabErrors },
  ];


  return (
    <>
      <div className="flex-fill">
        <ChargeIdDetail chargeboxId={chargeboxId} />

        <UITabs id={'modules-tab'} key={'modules-ta'} tabItems={tabItems}></UITabs>

      </div>
    </>
  );
};

export default ChargeIdCrud;
