export interface IAllConnectorChargebox {
  fuunit: IFuUnit[];
  chgr: [];
}

export interface IFuUnit {
  name: string;
  description: string;
  value: number;
  env: IEnv[];
  chgr: IChgrOpt[];
}

export interface IEnv {
  name: string;
  value: string;
}

export interface IChgrOpt {
  charge_box_pk: number;
  charge_box_id: string;
  name: string;
  value: string;
}

export interface IChgr {
  charge_box_id: string;
  charge_box_alias: string;
  connectors: [];
}
