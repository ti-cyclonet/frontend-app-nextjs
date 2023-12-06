'use client'
import React, { useContext, ReactNode } from "react";
import { ConnectorIdContext, ConnectorIdContextType } from "@chargebox/[chargeboxId]/[connectorId]/ui/context/ConnectorIdContext";

import ConnectorDetail from "@chargebox/[chargeboxId]/[connectorId]/ui/components/ConnectorDetail";

import { ErrorProvider } from '@errors/ui/context/ErrorContext';
import { ErrorCrud } from '@errors/ui/components/ErrorCrud';

import { TransactionProvider } from '@transactions/ui/context/TransactionContext';
import { TransactionCrud } from '@transactions/ui/components/TransactionCrud';

import {UITabs} from "@core/infrastructure/ui/components/UITabs";

export type ConnectorIdCrudProps = {
    chargeboxId?: string;
    connectorId?: string;
}

export const ConnectorIdCrud: React.FC<ConnectorIdCrudProps> = ({ connectorId, chargeboxId }) => {

    const { current } = useContext(ConnectorIdContext) as ConnectorIdContextType;



    const contentTabTrxs = (): ReactNode => {
        return (
            <TransactionProvider>
                <TransactionCrud showKPI={true} queryType="connector" id={current.connector_pk} />
            </TransactionProvider >
        );
    }

    const contentTabErrors = (): ReactNode => {
        return (
            <ErrorProvider>
                <ErrorCrud queryType="connector" id={current.connector_pk} />
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
            <ConnectorDetail chargeboxId={chargeboxId ?? ""} connectorId={connectorId ?? ""}></ConnectorDetail>

            {current && current.connector_pk && (
                <>
                    <UITabs id={'modules-tab'} key={'modules-ta'} tabItems={tabItems}></UITabs>
                </>
            )
            }
        </>
    );
};

export default ConnectorIdCrud;
