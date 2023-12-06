import {IModule} from "@vehicles/domain/IModule";

export interface ICountChargerBox {
  count: number;
}

export const emptyCountChargerBox: ICountChargerBox = {
  count: 0,
};
