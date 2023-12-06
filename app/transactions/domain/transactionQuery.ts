import { IQuery } from "@transactions/domain/IQuery";
import { ITransaction } from "@transactions/domain/ITransaction";
import {IMeterValue} from '@transactions/domain/IMeterValue'

export interface TransactionQuery extends IQuery<ITransaction> {

    getTransactionMeterValues(id: string): Promise<IMeterValue[]>;
    getTransactionMeterValuesByType(id: string, type: string): Promise <IMeterValue[]>;
    getTransactionByConnectorByDate(connectorPk: string, date: string): Promise <ITransaction[]>;

    getAllByConnector(connector_id: string, startdate?:Date, enddate?:Date ): Promise<ITransaction[]>;
    getAllByChargebox(chargenboxId: string, startdate?:Date, enddate?:Date ): Promise<ITransaction[]>;

    getCurrentTransactionByConnector(connector_pk: string): Promise<ITransaction>;
    getTemperatureByConnectorId(connector_pk: string):Promise<string>;
}