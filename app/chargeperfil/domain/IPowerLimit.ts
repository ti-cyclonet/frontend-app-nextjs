export interface IPowerLimit {
    id?: number;
    name: string;
    limits: ILimit[];
}

export interface ILimit {
    inihour: number;
    endhour: number;
    functionalStation: IFunctionalStation;
}

export interface IFunctionalStation {
    functionalStationId: number;
    limit: number;
}