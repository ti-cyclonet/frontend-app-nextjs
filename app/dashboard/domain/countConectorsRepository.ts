import { ICountConectors } from "@dashboard/domain/ICountConectors";

export interface CountConectorsRepository {
    getCountConectors(): Promise<ICountConectors>;
}