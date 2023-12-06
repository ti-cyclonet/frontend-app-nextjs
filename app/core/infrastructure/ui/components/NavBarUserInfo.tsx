"use client";
import { ISessionUser } from "@/app/core/domain/ISessionUser";
import { getSessionUser } from '@core/auth/utils';
import authOptions from "@pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import * as Feather from "react-icons/fi";

export interface NavBarUserInfoProps {
  children: React.ReactNode;
}

export default function NavBarUserInfo({ children }: NavBarUserInfoProps) {
  const [user, setUser] = useState<ISessionUser>();
  const session = useSession(authOptions);

  useEffect(() => {    
    getSessionUser().then((_user)=>{
      if (_user){
        setUser(_user);
      }  
    }).finally(()=>{
    });
  }, []);

  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="nav-icon dropdown-toggle d-inline-block d-sm-none"
          href="#"
          data-bs-toggle="dropdown"
        ></a>

        <a
          className="row nav-link p-0 dropdown-toggle d-none d-sm-inline-block"
          href="#"
          data-bs-toggle="dropdown"
        >
          <Feather.FiUser
            size={32}
            strokeWidth={2}
            className="align-middle col-2 rounded-circle rounded-circle bg-secondary p-1 mt-1 ms-3 "
            stroke="#FFF"
          />
          <span className="text-dark text-uppercase font-weight-bold">
            {user?.user.firstname + " " + user?.user.lastname}
          </span>
        </a>
        {children}
      </li>
    </>
  );
}
