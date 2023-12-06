import React, { useContext, useState } from "react";
import { IUser } from "@core/domain/IUser";
import { UIDataTableFilter } from "@core/infrastructure/ui/components/UIDataTableFilter";
import { UserContext, UserContextType } from "@users/ui/context/UserContext";
import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";
import { UIConfirmationDialog } from "@core/infrastructure/ui/components/UIConfirmationDialog";
import { useSession } from 'next-auth/react';
import { ISessionUser } from "@/app/core/domain/ISessionUser";


export type UserListProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
};

const UserList: React.FC<UserListProps> = ({ setShowModal }) => {

  let {data} = useSession();

  const { currentUser, users, setCurrentUser, setIsEdit, deleteUser, loadUsers } =
    useContext(UserContext) as UserContextType;
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const rolesBody = (user: IUser) => {
    //console.log(user.roles)
    if (user && user.roles) {
      return user.roles.filter(Boolean).join(",");
    } else {
      return "";
    }
  };

  //console.log(users)
  const columns = [
    //{field: 'id', header: 'Id'},
    { field: "firstname", header: "Nombres" },
    { field: "lastname", header: "Apellidos" },
    { field: "email", header: "Email" },
    { field: "status", header: "Estado" },
    { field: "roles", header: "Roles", template: rolesBody },
  ];

  const handleEdit = (user: IUser) => {
    setCurrentUser(user);
    
    setIsEdit(true);
    if (setShowModal)
      data?.user?.roles.includes('VIEWER') || data?.user?.roles.includes('OPERATOR') ? setShowModal(false) : setShowModal(true);
  };

  const handleDelete = (user: IUser) => {
    setCurrentUser(user);
    data?.user?.roles.includes('VIEWER') || data?.user?.roles.includes('OPERATOR') ? setShowConfirmation(false) : setShowConfirmation(true);
  };

  return (
    <div>
      {users ? (
        <>
          {users.length > 0 ? (
            <>
              {
                data?.user.roles.includes('ADMIN') ?
                  <UIDataTableFilter
                    columns={columns}
                    items={users}
                    hasActions={true}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    paginacion={5}
                    dataKey="id"
                    filterDisplay="menu"
                    msg="No found"
                    filterPlaceholder="Search"
                    minW="12rem"
                    tableSize="normal"
                  ></UIDataTableFilter>
                :
                  <UIDataTableFilter
                    columns={columns}
                    items={users}
                    hasActions={true}
                    paginacion={5}
                    dataKey="id"
                    filterDisplay="menu"
                    msg="No found"
                    filterPlaceholder="Search"
                    minW="12rem"
                    tableSize="normal"
                  ></UIDataTableFilter>
              }
              <UIConfirmationDialog
                show={showConfirmation}
                title="Eliminar registro"
                message="Esta seguro de eliminar este registro?"
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => {
                  deleteUser(currentUser);
                  setShowConfirmation(false);
                }}
                onCancel={() => setShowConfirmation(false)}
              />

            </>
          ) : (
            <>
              No data found!
            </>
          )}
        </>
      ) : (
        <TablePlaceholder cols={6} rows={8} />
      )}
    </div>
  );
};

export default UserList;