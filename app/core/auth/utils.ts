import { useSession, getSession } from "next-auth/react";
import authOptions from "@pages/api/auth/[...nextauth]";
import { ISessionUser } from "@/app/core/domain/ISessionUser";


export const getSessionUser = async () => {

    const session = await getSession(authOptions)
    if (session) {
        let user = session.user as unknown as ISessionUser;
        return Promise.resolve(user);
    } else {
        Promise.resolve(null);
    };

}
