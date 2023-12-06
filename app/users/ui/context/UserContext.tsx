'use client'
import React, { createContext, useState } from "react";

import { UserManagement } from '@users/application/userManagement';
import { IUser, emptyUser } from '@core/domain/IUser'
import { LoginService } from "@core/infrastructure/services/Login.services";
import { LoginManagement } from "@core/application/LoginManagement";
import { UserService } from "@users/infrastructure/user.service";

import { ToastEventManager } from '@core/infrastructure/utilities/EventsManager';


export type UserContextType = {
    currentUser: IUser;
    setCurrentUser: (user: IUser) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    users: IUser[] | null;
    loadUsers: () => void;
    roles: string[] | null;
    getAllRoles: () => void;
    registerUser: (user: IUser) => void;
    updateUser: (user: IUser) => void;
    deleteUser: (user: IUser) => void;
    getUserRoles: (username: string) => string[];
}

// Creamos un contexto para manejar los productos
export const UserContext = createContext<UserContextType | null>(null);

export type UserProviderProps = {
    children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [updateView, setUpdateView] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [roles, setRoles] = useState<string[] | null>(null);

    const manager = new UserManagement(new UserService());
    const loginmanager = new LoginManagement(new LoginService());

    const loadUsers = () => {
        //console.log('load User on Context (server)');
        (async () => {
            const resp = await manager.getAllUsers();
            let _userstmp = resp.users ?? [];
            //console.log(_userstmp);
            let _users = await Promise.all(
                _userstmp.map(async (user) => {
                    //console.log(user);
                    if (user.id) {
                        let resp = await loginmanager.getUserRoles(user.email);
                        let _roles = resp.roles;
                        let _user: IUser = { ...user, roles: _roles } as IUser;
                        return _user;
                    };
                })
            );
            //console.log(_users);
            if (_users) {
                setUsers(_users as unknown as IUser[]);
            }
        })();
    };

    const registerUser = (user: IUser) => {
        manager.registerUser(user).then(data => {
            //console.log
            if (data.success && data.user) {
                loadUsers();
                setUpdateView(new Date());
                ToastEventManager.setSubject(
                    { severity: "success", summary: "Usuario registrado exitosamente.", life: 4000 }
                );
            } else {
                ToastEventManager.setSubject(
                    {
                        severity: "error",
                        summary: "No fue posible registrar el usuario.",
                        detail: "Verifique la información ingresada e intente nuevamente.",
                        life: 5000
                    }
                );
            }
        });
    };

    const updateUser = (user: IUser) => {
        //console.log(JSON.stringify(user));        
        manager.updateUser(user.email, user).then(data => {
            if (data.success && data.user) {
                loadUsers(); setUpdateView(new Date());
                ToastEventManager.setSubject(
                    { severity: "success", summary: "Usuario actualizado exitosamente.", life: 4000 }
                );
            } else {
                ToastEventManager.setSubject(
                    {
                        severity: "error",
                        summary: "No fue posible actualizae el usuario.",
                        detail: "Verifique la información ingresada e intente nuevamente.",
                        life: 5000
                    }
                );
            }
        });
    };

    const deleteUser = (user: IUser) => {
        manager.deleteUser(user.email).then(data => {
            if (data.success) {
                loadUsers();
                setUpdateView(new Date());
                ToastEventManager.setSubject(
                    { severity: "success", summary: "Usuario eliminado exitosamente.", life: 4000 }
                );
            } else {
                ToastEventManager.setSubject(
                    {
                        severity: "error",
                        summary: "No fue posible eliminar el usuario.",
                        detail: "Verifique la información ingresada e intente nuevamente.",
                        life: 5000
                    }
                );
            }
        });
    };

    const getAllRoles = () => {
        manager.getAllRoles().then(data => {
            if (data.success && data.roles) {
                console.log("Roles loaded!");
                setRoles(data.roles);
            }
        });
    };


    const getUserRoles = (username: string): string[] => {
        let roles;
        loginmanager.getUserRoles(username).then(data => {
            if (data.success) {
                //console.log(data.roles);
                roles = data.roles;
            }
        });
        //console.log(roles);        
        setUpdateView(new Date());
        return (roles ? roles : []) as string[];

    };

    if (!roles)
        getAllRoles();

    if (!users)
        loadUsers();

    return (
        <UserContext.Provider
            value={{
                currentUser, setCurrentUser,
                isEdit, setIsEdit,
                users, loadUsers,
                roles, getAllRoles,

                registerUser,
                updateUser,
                deleteUser,
                getUserRoles

            }}>
            {children}
        </UserContext.Provider>
    );
};
