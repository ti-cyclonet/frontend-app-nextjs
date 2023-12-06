
import React from 'react'
import { UserService } from '@users/infrastructure/user.service';
import { UserManagement } from '@users/application/userManagement';

import { LoginService } from '@core/infrastructure/services/Login.services';
import { LoginManagement } from '@core/application/LoginManagement';
import { UserProvider } from '@users/ui/context/UserContext';
import { UserCrud } from '@users/ui/components/UserCrud';


const UsersPage = async () => {

  // const management: UserManagement = new UserManagement(new UserService());
  // const management: LoginManagement = new LoginManagement(new LoginService());

 //try {
  //   const _roles = management.getUserRoles("cesar.zambrano1@aossas.com")
  //     console.log("********************************Roles: " + JSON.stringify(_roles));    
  // } catch (e) {
  //   console.log("******************************");
  //   console.log(e);
  //   console.log("***********************");
  // }

  return (
    <UserProvider>
      <UserCrud />
    </UserProvider >
  );
}

export default UsersPage