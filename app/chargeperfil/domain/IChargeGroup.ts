import { IPowerLimit } from "./IPowerLimit";

export interface IChargeGroup {
    fuun_id?: number;
    fuun_name: string;
    fuun_algorithm: string;
    fuun_allocpower: number;
    fuun_consumption_power: number;
    fuun_connected_cars: number;
    fuun_assigned_power: number;
    fuun_chargers: IGroupConnector[];
    fuun_charge_profile: IPowerLimit[];
}

export interface IGroupConnector {
    charge_box_pk?: string;
    cargador: string;
    tipocargador: string;
    status: string;
    respuesta: string;
    conexion: string;
    potmax: number;
    idCar: string;
    idTransaction: string;
    noconectores: number;
}

export interface IChargeGroupRequest {
    fuun_id?: number;
    fuun_name: string;
    fuun_algorithm: string;
    fuun_allocpower: number;
    fuun_chargerpklist: string[]
}