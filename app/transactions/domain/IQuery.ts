export interface IQuery<T> {
    getAll(startdate?:Date, enddate?:Date): Promise<T[]>;
    getById(id: string): Promise<T | null>;
  }