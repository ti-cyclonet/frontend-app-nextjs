import { ISessionUser } from "@core/domain/ISessionUser";
import ISessionStoreEntity from "@core/domain/sessionStore/ISessionStoreEntity";

export default class DefaultSessionStoreEntity<K,T> implements ISessionStoreEntity<K, T>{

    key:K;
    entity:T;
    expirationDateTime:Date;

    constructor(key:K, entity:T, expirationDateTime:Date){
        this.key = key;
        this.entity = entity;
        this.expirationDateTime = expirationDateTime;
    }

    getKey = ():K => {
        return this.key;
    }

    setEntity = (entity:T) : void => {
        this.entity = entity;
    }

    getEntity = () : T => {
        return this.entity
    }

    getExpirationDateTime = () : Date => {
        return this.expirationDateTime;
    }

}