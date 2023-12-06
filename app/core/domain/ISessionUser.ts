import {IUser} from '@core/domain/IUser'
import { DefaultSession, DefaultUser } from "next-auth";

export interface ISessionUser extends DefaultUser{
    user: IUser,
    roles?: string[]
    loged?: boolean,
    sessionInfo?: any
}

export const emptySessionUser: ISessionUser = {
    id:"",
    user: {
        id: "",
        email: "",
        phonenumber: "",
        firstname: "",
        lastname: "",
    }
};

