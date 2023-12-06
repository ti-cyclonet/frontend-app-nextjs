import {IModule} from "@vehicles/domain/IModule";

export interface ICountVehicle {
  count: number;
}

export const emptyCountVehicle: ICountVehicle = {
  count: 0,
};
