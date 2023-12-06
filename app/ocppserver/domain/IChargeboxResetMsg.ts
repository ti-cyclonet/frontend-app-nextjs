export interface IChargeboxResetMsg {
	chargeboxID: string;
	resettype: "Soft"|"Hard";
};
