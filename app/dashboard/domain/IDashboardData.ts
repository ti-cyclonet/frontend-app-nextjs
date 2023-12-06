import { IFunctionalunits } from "./IFunctionalunits";

export interface IDashboardData {
  fuunit: IFuUnit[];
  chgr: [];
  fuunkpis: IFuunkpis;
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

export interface IFuunkpis {
  fuunkpi1: IFunctionalunits;
  fuunkpi2: IFunctionalunits;
}
