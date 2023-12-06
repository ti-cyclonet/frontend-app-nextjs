import { IConnector } from "../domain/IConnector";
import { ConnectorRepository } from "../domain/connectorRepository";

export class ConnectorService implements ConnectorRepository {
  private apiBasePath = process.env.BASEPATH_API_CONNECTOR;

  async getStatusConnector(chargeboxId: string): Promise<[] | null> {
    const resp = await fetch(
      `${this.apiBasePath}/connector-chargebox/${chargeboxId}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return Promise.resolve(await resp.json());
  }

  async getConnectorByIdByChargebox(connectorId: string, chargeboxId: string): Promise<IConnector | null> {
    const resp = await fetch(
      `${this.apiBasePath}/connector-status-pk/${connectorId}/${chargeboxId}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    let respJson = await resp.json();
    respJson = {
      connector_id: respJson.connector_id,
      connector_pk: respJson.connector_pk,
      connector_location: respJson.conn_location,
      chargebox_id: respJson.charge_box_id,
      status: respJson.status,
      alias: respJson.alias,
      status_timestamp: respJson.max_timestamp,
      current_trx: respJson.current_trx,
      soc: respJson.soc,
      placa: respJson.placa,
      fuun_name: respJson.fuun_name
    }
    
    return Promise.resolve(respJson);

  }

  getAll(): Promise<IConnector[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<IConnector | null> {
    const connector: IConnector = {
      connector_id: "001",
      connector_pk: "12",
    };
    return Promise.resolve(connector);
  }
  add(entity: IConnector): Promise<IConnector> {
    throw new Error("Method not implemented.");
  }
  update(entity: IConnector): Promise<IConnector> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
