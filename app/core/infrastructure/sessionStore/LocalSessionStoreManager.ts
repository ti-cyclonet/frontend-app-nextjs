import ISessionStoreManager from "@core/domain/sessionStore/ISessionStoreManager";
import DefaultSessionStoreEntity from "./DefaultSessionStoreEntity";

import ISessionStoreEntity from "@core/domain/sessionStore/ISessionStoreEntity";
import secureLocalStorage from "react-secure-storage";

export default class DefaultLocalSessionStoreManager<K, T> implements ISessionStoreManager<K, ISessionStoreEntity<K, T>>{

    private entity: ISessionStoreEntity<K, T> | null;
    private key: K;

    constructor(key: K, entity: ISessionStoreEntity<K, T>) {
        this.key = key;
        this.entity = entity;
    }

    getKey = (): K => {
        return this.key;
    }


    getItem = (key: K): ISessionStoreEntity<K, T> | null => {

        const _parse:string = (secureLocalStorage.getItem('' + this.key) as string);
        const storeEntity: ISessionStoreEntity<K, T> = (JSON.parse(_parse)) as ISessionStoreEntity<K, T>;
        if (storeEntity) {
            let now = new Date();
            let expireDate = new Date(storeEntity.expirationDateTime);
            //console.log(JSON.stringify(storeEntity));
            //console.log(JSON.stringify(now));
            //console.log(JSON.stringify(expireDate.getTime()));
            if (now > expireDate) {
                this.entity = null;
                secureLocalStorage.removeItem('' + this.key);
                return null;
            }else{
                this.entity = storeEntity;
            }
            
        }
        return this.entity;
    };

    setItem = (entity: ISessionStoreEntity<K, T>): void => {
        this.entity = entity;
        secureLocalStorage.setItem('' + this.entity.getKey(), JSON.stringify(entity));
    };

    clear = (): void => {
        secureLocalStorage.clear();
        this.entity = null;
    };
}