import { IConnector } from "../domain/IConnector";
import { ConnectorRepository } from "../domain/connectorRepository";

export class ConnectorManagement {
    constructor(private readonly connectorRepository: ConnectorRepository) {
        this.connectorRepository = connectorRepository;
    }

    async getConnectorById(id: string): Promise<{success: boolean; connector: IConnector|null}> {
        const responseConnector = await this.connectorRepository.getById(id);
        return {success: true, connector: responseConnector};
    }

    async getStatusConnector(chargeboxId: string): Promise<{success: boolean; status: IConnector[]|null}> {
        const responseConnector = await this.connectorRepository.getStatusConnector(chargeboxId);
        return {success: true, status: responseConnector};
    }

    async getConnectorByIdByChargebox(connectorId: string, chargeboxId: string): Promise<{success: boolean; connector: IConnector|null}> {
        const responseConnector = await this.connectorRepository.getConnectorByIdByChargebox(connectorId, chargeboxId);
        return {success: true, connector: responseConnector};
    }
}