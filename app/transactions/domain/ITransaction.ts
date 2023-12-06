export interface ITransaction {
	id: string;
	connectorId?: string;
	idTag?: string;
	startEventTimestamp?: Date;
    startTimestamp?: Date;
	startValue?: number;
	stopEventActor?: string;
	stopEventTimestamp?: Date;
	stopTimestamp?: Date;
    stopValue?: number;
    stopReason?: string;
	totalValue?:number;

};

export const emptyTransaction: ITransaction = {
	id: "",
};

