"use client";
import { ToastEventManager } from "@core/infrastructure/utilities/EventsManager";

import { getSessionUser } from "@core/auth/utils";
import Login from "@core/ui/layout/components/Login";
import authOptions from "@pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AppProps {
  children: React.ReactNode;
}

export function toLogin() { }

export default function App({ children }: AppProps) {

  const pathname = usePathname();
  const isLoginPage = pathname?.includes('login');
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      if (!isLoginPage)
        router.push("/login?callbackUrl=" + pathname);
    }
  });

   

  const isLogged = session.status === "authenticated";

  if (session.status === "loading" && !isLoginPage) {
    return <><div>Loading ...</div></>; //TODO: [CZ] se debe mejorar
  } else {
    if (isLoginPage) {
      return (
        <>
          <div className="wrapper">
            <div className="flex p-50 vh-100 vw-100 row justify-content-center align-items-center">
              <div className="col-auto login rounded container-fluid p-6">
                <Login />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {children}          
        </>
      );
    }
  }
}
