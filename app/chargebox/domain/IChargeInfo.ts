export interface IChargeboxInfo {
  functional_unit_pk: number;
  charge_box_pk: number;
  alias: string;
  charge_mavdelivpower: string;
  connectors: Array<IConnectorInfo>;
  status: string;
}

export interface IConnectorInfo {
  connector_pk: number;
  connector_id: number,
  connectoralias: string,
  connectorlocation: string;
}
