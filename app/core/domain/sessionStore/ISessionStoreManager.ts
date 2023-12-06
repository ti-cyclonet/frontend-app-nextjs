import ISessionStoreEntity from "./ISessionStoreEntity";

export default interface ISessionStoreManager<K, ISessionStoreEntity> {
  getItem(key: K): ISessionStoreEntity | null;
  setItem(entity: ISessionStoreEntity): void;
  clear(): void;
}