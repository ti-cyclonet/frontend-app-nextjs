import IUser from '@core/domain/IUser'
import ISessionUser from '@core/domain/ISessionUser'

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: ISessionUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends ISessionUser{
    }
}