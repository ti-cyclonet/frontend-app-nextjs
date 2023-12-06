
//redux
import { useSelector } from "react-redux";
import { AppStore } from "@core/redux/appStore";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Login from "@app/core/ui/layout/components/Login";

export interface LoginValidatorProps {
  children: React.ReactNode;
}

function LoginValidator({ children }: LoginValidatorProps) {
  const { data: session } = useSession();

  //const isLogged = useSelector((state: AppStore) => state.sessionUser.loged);
  //console.log(session);
  const isLogged = session ? session.user : false;
  const router = useRouter();
  //console.log(isLogged);

  if (!isLogged) signIn();

  return (
    <>
    </>
  );
}

export default LoginValidator;
