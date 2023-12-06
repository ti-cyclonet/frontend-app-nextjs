import { IQuery } from "@errors/domain/IQuery";
import { IError } from "@errors/domain/IError";

export interface ErrorQuery extends IQuery<IError> {

    getAllByConnector(connector_id: string, startdate?:Date, enddate?:Date ): Promise<IError[]>;
    getAllByChargebox(chargenboxId: string, startdate?:Date, enddate?:Date ): Promise<IError[]>;
    getAllByTransaction(transactionId: string): Promise<IError[]>;
}