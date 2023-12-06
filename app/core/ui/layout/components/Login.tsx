'use client'

import {
  UIButton,
  UIInput,
  UIPassword,
} from "@app/core/infrastructure/ui/components";

import { useState } from "react";

import { ToastEventManager } from '@core/infrastructure/utilities/EventsManager';

import { signIn, getSession } from "next-auth/react";
import  authOptions from "@pages/api/auth/[...nextauth]"
import { ISessionUser } from "@/app/core/domain/ISessionUser";
import { useSearchParams } from 'next/navigation';

import ilustracion from "public/img/ilustracion-Login.png";
import title from "public/img/title-login.png";
import Image from "next/image";

import Cryptr from "cryptr";

export default function Login() {

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const searchParams = useSearchParams();
  let _callbackUrl = searchParams?.get('callbackUrl') ?? '/dashboard';
  if (_callbackUrl === "/"){
      _callbackUrl = '/dashboard';
  }

  const cryptr = new Cryptr(process.env.APP_CRYPT_PHRASE??'');

  const onSubmit = (event: any) => {
    event.preventDefault();
    setDisabled(true);
    const res = signIn("credentials", { username: email, password: cryptr.encrypt(password), callbackUrl: _callbackUrl })
      .then(async (data) => {        
        const session = getSession(authOptions).then((session)=>{
          
          if (session?.user){
            let _user = session.user as unknown as ISessionUser;
            //console.log(typeof(_user));
            //console.log(_user);
            //ToastEventManager.setSubject({ severity: 'success', summary: 'Hola de nuevo! ' + _user.user?.firstname + ' ' + _user.user?.lastname });
          }
          
        });
        //console.log(session);
        setDisabled(false);
      });
  };

  return (
    <>
      <div className="fondo">
        <div className="login-target">
          <section className="left">
            <div className="elements-login-l">
              <Image src={title} alt="" width={350}/>
              <Image src={ilustracion} alt="" width={570}/>
            </div>
          </section>
          <section className="right">
            <div className="mx-4 d-grid gap-3">
              <form onSubmit={onSubmit} method="POST">
                <div className="form-r">
                  <section className="elements-login-r">
                    <h2>Ingresar</h2>
                    <div>
                      <p><strong>al Centro de Control Energético</strong></p>
                    </div>
                  </section>
                  <UIInput
                    required
                    label="Usuario"
                    name="email"
                    value={email}
                    placeholder="Nombre del usuario"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <UIPassword
                    required
                    label="Contraseña"
                    name="password"
                    value={password}
                    placeholder="Ingresar contraseña"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="flex">
                    <div className="mx-auto text-center">
                      <UIButton label="Ingresar" type="submit" disabled={disabled} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
