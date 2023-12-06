export interface IFunctionalUnitData {
  idUnit: number;
  unitName: string;
  unitDescription: string;
  percentageUsed: string;
  limite: string;
  powerUsed: string;
  powerMax: string;
  totalChargers: number;
  percentageChargers: number;
  availableChargers: number;
  totalConnectors: number;
  percentageConnectors: number;
  availableConnectors: number;
  chargingConnectors: number;
  errorConnectors: number;
  offlineConnectors: number;
  inactiveConnectors: number;
}
