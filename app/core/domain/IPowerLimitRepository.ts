export interface IPowerLimitRepository<IPowerLimit> {

    getAll(): Promise<Array<IPowerLimit>>;
    setPowerLimits(days: Array<IPowerLimit>, functionalUnitId: number): Promise<IPowerLimit[]>;
    deletePowerLimits(functionalUnitId: number): Promise<string>;
}