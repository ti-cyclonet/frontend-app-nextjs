import { ISessionUser } from '@core/domain/ISessionUser';
import DefaultLocalSessionStoreManager from "./LocalSessionStoreManager";


export default class UserSessionStoreManager extends DefaultLocalSessionStoreManager<string,ISessionUser>{

}
