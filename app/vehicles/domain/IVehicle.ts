import {IModule} from "@vehicles/domain/IModule";

export interface IVehicle {
  id?: string;
  alias?: string;
  batery_max_cap?: number;
  charge_max_cap?: number;  
  placa: string;
  status?: string;
  modules?: IModule[]
}

export const emptyVehicle: IVehicle = {
  alias: '',
  placa: '',
  status: 'Active'
};
