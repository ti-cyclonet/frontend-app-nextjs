
import { ISessionUser } from '@core/domain/ISessionUser'
import { LoginManagement } from "@core/application/LoginManagement";
import { LoginService } from "@core/infrastructure/services/Login.services";
import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from '@core/domain/IUser';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "email", placeholder: "dummy@domain.ok" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)        
        const { username, password } = credentials as any;

        //console.log("username: " + username);
        //console.log("password: " + password);
        const management = new LoginManagement(new LoginService());
        const res = await management.logIn(username, password);
        //const rol = await management.getUserRoles(username)
        /* await fetch("http://localhost:3010/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          mode: 'cors',
          body: JSON.stringify({ username, password }),
        })
        const user = await res.json()*/
        //console.log("------------------------------------");
        //console.log("------------------------------------");
        const user = res.sessionUser;
        //user.user.roles.push(rol.roles[0]);
        // console.log("------------------------------------");
        // console.log("------------------------------------");
        //console.log(user);
        // console.log("------------------------------------");
        // console.log("------------------------------------");

        // If no error and we have user data, return it
        if (res.success && user) {
          return await user;
        }

        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  events: {
    async signOut(message) {
      //console.log(JSON.stringify(message));
      const management = new LoginManagement(new LoginService());
      const user: ISessionUser = message.token.user as ISessionUser;
      const token: string = user.sessionInfo?.AccessToken;
      const res = await management.logOut(token);

    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //token = user;
        // token = user;
        token.user = user;
      }
      /*console.log("**************");
      console.log("JWT");
      console.log("**************");
      console.log(token);
      console.log("**************");*/
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      /*console.log("session: "+JSON.stringify(session));
      console.log("token:" +JSON.stringify(token));
      console.log("user: "+user);*/
      // session callback is called whenever a session for that particular user is checked
      // in above function we created token.user=user
      if (session) session.user = (token.user as User);
      // you might return this in new version
      /*console.log("**************");
      console.log("SESSION");
      console.log("**************");
      console.log(session);
      console.log("**************");*/
      return Promise.resolve(session)
    },
  },
  pages: {
    signIn: "/login",
    //TODO: [CZ] Ajusgtar paginas de error y otras.
  }


})
