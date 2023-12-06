export default interface ISessionStoreEntity<K,T>{
    readonly key:K;
    readonly entity:T;
    readonly expirationDateTime:Date;

    getKey() : K;
    setEntity(entity:T|null) : void;
    getEntity():T;
    getExpirationDateTime() : Date;
}