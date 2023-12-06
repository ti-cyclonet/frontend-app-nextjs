export interface IConnector {
    connector_id: string|null;
    connector_pk?: string;
    connector_location?: string;
    chargebox_id?: string;
    status?: string;
    alias?: string;
    status_timestamp?: string;
    current_trx?: string;
    soc?: string;
    placa?: string;
    fuun_name?: string;
};

export const emptyConnector: IConnector = {
	connector_id: null
};