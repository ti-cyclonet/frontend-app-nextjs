export interface IMeterValue {
	transactionId: string;
	connectorId: string;
	valueTimestamp?: Date;
	value?: string;
    readingContext?: string;
	format?: string;
	measurand?: string;
	location?: string;
	unit?: string;
    phase?: string;
};

export const emptyMeterValue: IMeterValue = {
	transactionId: "",
    connectorId: "",
};
