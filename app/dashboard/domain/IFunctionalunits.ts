export interface IFunctionalunits {
  idUnit: number;
  unitName: string;
  unitDescription: string;
  totalChargers: number;
  availableChargers: number;
  percentageChargers: number;
  totalConnectors: number;
  availableConnectors: number;
  chargingConnectors: number;
  errorConnectors: number;
  offlineConnectors: number;
  inactiveConnectors: number;
  percentageConnectors: number;
  powerUsed: number;
  powerUsedString: string;
  porcentageUsed: string;
  limite: number;
  limiteString: string;
  powerMax: number;
  powerMaxString: string;
}
