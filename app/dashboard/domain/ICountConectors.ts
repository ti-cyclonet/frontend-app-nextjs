import {IModule} from "@vehicles/domain/IModule";

export interface ICountConectors {
  count: number;
}

export const emptyCountConectors: ICountConectors = {
  count: 0,
};
