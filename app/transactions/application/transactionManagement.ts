import { ITransaction } from '@transactions/domain/ITransaction'
import { IMeterValue } from '@transactions/domain/IMeterValue'
import { TransactionQuery } from "@transactions/domain/transactionQuery";

export class TransactionManagement {

    constructor(private readonly transactionQuery: TransactionQuery) {
        this.transactionQuery = transactionQuery;
    }

    async getAllTransactions(startdate?: Date, enddate?: Date): Promise<{ success: boolean; transactions: ITransaction[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getAll(startdate, enddate);
            return { success: true, transactions: responseTransaction };
        } catch (e: any) {
            return { success: false, transactions: null };
        }
    }

    async getTransactionMeterValues(id: string): Promise<{ success: boolean; metervalues: IMeterValue[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getTransactionMeterValues(id);
            return { success: true, metervalues: responseTransaction };
        } catch (e: any) {
            return { success: false, metervalues: null };
        }
    }

    async getTransactionMeterValuesByType(id: string, type: string): Promise<{ success: boolean; metervalues: IMeterValue[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getTransactionMeterValuesByType(id, type);
            return { success: true, metervalues: responseTransaction };
        } catch (e: any) {
            return { success: false, metervalues: null };
        }
    }

    async getTransactionByConnectorByDate(connectorPk: string, date: string): Promise<{ success: boolean; transaction: ITransaction[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getTransactionByConnectorByDate(connectorPk, date);
            return { success: true, transaction: responseTransaction };
        } catch (e: any) {
            return { success: false, transaction: null };
        }
    }

    async getAllByConnector(connectorPk: string, startdate?: Date, enddate?: Date): Promise<{ success: boolean; transactions: ITransaction[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getAllByConnector(connectorPk, startdate, enddate);
            return { success: true, transactions: responseTransaction };
        } catch (e: any) {
            return { success: false, transactions: null };
        }
    }

    async getAllByChargebox(chargenboxId: string, startdate?: Date, enddate?: Date): Promise<{ success: boolean; transactions: ITransaction[] | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getAllByChargebox(chargenboxId, startdate, enddate);
            return { success: true, transactions: responseTransaction };
        } catch (e: any) {
            return { success: false, transactions: null };
        }
    }

    async getCurrentTransactionByConnector(connectorPk: string): Promise<{ success: boolean; transaction: ITransaction | null }> {
        try {
            const responseTransaction = await this.transactionQuery.getCurrentTransactionByConnector(connectorPk);
            return { success: responseTransaction.id.length > 0, transaction: responseTransaction };
        } catch (error) {
            return { success: false, transaction: null };
        }
    }
    

    async getTemperatureByConnectorId(connectorPk: string): Promise<{ success: boolean; temperature: string }> {
        const response = await this.transactionQuery.getTemperatureByConnectorId(connectorPk);
        if (response) {
            return { success: true, temperature: response };
        } else {
            return { success: false, temperature: "0" };
        }
    }

}