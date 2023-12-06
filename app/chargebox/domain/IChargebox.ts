import { IConnector } from "../[chargeboxId]/[connectorId]/domain/IConnector";

export interface IChargeBox {  
  charge_box_pk?: number;
  charge_box_id?: string;
  alias?: string;
  status?: string;
  endpoint_address?: string;
  ocpp_protocol?: string;
  registration_status?: string;
  charge_point_vendor?: string;
  charge_point_model?: string;
  charge_maxdelivpower?: string;
  charge_point_serial_number?: string;
  charge_box_serial_number?: string;
  fw_version?: string;
  fw_update_status?: string;
  fw_update_timestamp?: string;
  iccid?: string;
  imsi?: string;
  meter_type?: string;
  meter_serial_number?: string;
  diagnostics_status?: string;
  diagnostics_timestamp?: string;
  last_heartbeat_timestamp?: string;
  description?: string;
  note?: string;
  location_latitude?: string;
  location_longitude?: string;
  address_pk?: string;
  admin_address?: string;
  insert_connector_status_after_transaction_msg?: number;
  connectors?: Array<IConnector> | null;
  functional_unit_pk?: number;
  fuun_name?: string;
}
