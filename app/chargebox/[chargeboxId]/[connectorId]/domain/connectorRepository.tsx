import { IRepository } from "@/app/core/domain/IRepository";
import { IConnector } from "./IConnector";

export interface ConnectorRepository extends IRepository<IConnector> {
    getStatusConnector(chargeboxId: string): Promise<IConnector[] | null>;
    getConnectorByIdByChargebox(connectorId: string, chargeboxId: string): Promise<IConnector | null>;
}