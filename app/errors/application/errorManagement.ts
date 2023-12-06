import { IError } from '@errors/domain/IError'
import { ErrorQuery } from "@errors/domain/errorQuery";

export class ErrorManagement {

    constructor(private readonly transactionQuery: ErrorQuery) {
        this.transactionQuery = transactionQuery;
    }

    async getAllErrors(startdate?: Date, enddate?: Date): Promise<{ success: boolean; errors: IError[] | null }> {
        try {
            const responseError = await this.transactionQuery.getAll(startdate, enddate);
            return { success: true, errors: responseError };
        } catch (e: any) {
            return { success: false, errors: null };
        }
    }
    
    async getAllByConnector(connectorPk: string, startdate?: Date, enddate?: Date): Promise<{ success: boolean; errors: IError[] | null }> {
        try {
            const responseError = await this.transactionQuery.getAllByConnector(connectorPk, startdate, enddate);
            return { success: true, errors: responseError };
        } catch (e: any) {
            return { success: false, errors: null };
        }
    }

    async getAllByChargebox(chargenboxId: string, startdate?: Date, enddate?: Date): Promise<{ success: boolean; errors: IError[] | null }> {
        try {
            const responseError = await this.transactionQuery.getAllByChargebox(chargenboxId, startdate, enddate);
            return { success: true, errors: responseError };
        } catch (e: any) {
            return { success: false, errors: null };
        }
    }

    async getAllByTransaction(transactionId: string): Promise<{ success: boolean; errors: IError[] | null }> {
        try {
            const responseError = await this.transactionQuery.getAllByTransaction(transactionId);
            return { success: true, errors: responseError };
        } catch (e: any) {
            return { success: false, errors: null };
        }
    }


}