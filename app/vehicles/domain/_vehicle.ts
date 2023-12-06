import { IVehicle } from "./IVehicle";
export class Vehicle implements IVehicle {
  id: string = "";
  alias: string = "";
  batery_max_cap: number = 0;
  charge_max_cap: number = 0;
  status: string = "";
  placa: string = "";

  constructor();
  constructor(
    alias: string,
    batery_max_cap: string,
    charge_max_cap: string,
    status: string,
    placa: string
  );
  constructor(
    id: string,
    alias: string,
    batery_max_cap: string,
    charge_max_cap: string,
    status: string,
    placa: string,
  );
  constructor(...params: any[]) {
    //console.log(params.length);
    //console.log(JSON.stringify(params));

    if (params.length === 0) {
      return;
    }

    if (params.length === 5) {
      this.alias = params[0];
      this.batery_max_cap = params[1];
      this.charge_max_cap = params[2];
      this.status = params[3];
      this.placa = params[4];
      return;
    }

    if (params.length === 6) {
      this.id = params[0];
      this.alias = params[1];
      this.batery_max_cap = params[2];
      this.charge_max_cap = params[3];
      this.status = params[4];
      this.placa = params[5];
      return;
    }
  }
}
