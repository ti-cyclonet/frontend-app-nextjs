import { ILoginService } from "@core/domain/ILoginService";
import { ISessionUser } from "@core/domain/ISessionUser";

export class LoginManagement {
    
    constructor(private readonly service: ILoginService<ISessionUser>){        
        this.service = service;
    }

    async getUserRoles(username:string):Promise<{success: boolean, roles: string[]}>{
        const resp = await this.service.getUserRoles(username);      
        return {success: true, roles: resp};
    }

    async logIn(username: string, password: string): Promise<{success: boolean, sessionUser: ISessionUser | null}>{
        const resp = await this.service.logIn(username, password);
        if (resp){
           resp.roles = await this.service.getUserRoles(username);     
        } 

        if (resp && resp.user){
            resp.user.roles = await this.service.getUserRoles(username); 
        }
        
        return {success: true, sessionUser: resp};
    }

    async logOut(token:string): Promise<void>{
        const resp = await this.service.logOut(token);
    }
}