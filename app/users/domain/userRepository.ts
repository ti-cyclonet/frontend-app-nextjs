import { IRepository } from "@core/domain/IRepository";
import { IUser } from "@core/domain/IUser";

export interface UserRepository extends IRepository<IUser> {
    
    getAllRoles(): Promise<string[]>;

}