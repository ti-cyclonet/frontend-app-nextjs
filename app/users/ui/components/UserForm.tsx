import React, { ReactNode, useEffect, useState } from 'react';

import { emptyUser } from '@core/domain/IUser';
import { UIButton } from '@core/infrastructure/ui/components/UIButton';
import { UIDropdown } from '@core/infrastructure/ui/components/UIDropdown';
import { UIInput } from '@core/infrastructure/ui/components/UIInput';
import { UICheckbox } from '@core/infrastructure/ui/components/UICheckbox';
import { UserContext, UserContextType } from '@users/ui/context/UserContext';
import { Form, Row } from 'react-bootstrap';


export type UserFormProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ setShowModal }) => {

  const { currentUser, setCurrentUser, roles, isEdit, setIsEdit, updateUser, registerUser } = React.useContext(UserContext) as UserContextType;
  const [localRoles, setLocalRoles] = useState<string[]>([roles![0]]);
  const [reload, setReload] = useState(new Date());
  const [changePasword, setChangePasword] = useState(!isEdit);
  const handleToggleChangePasword = () => setChangePasword(!changePasword);

  const statusOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' }
  ];
  

  roles?.map((number) => ({
      label: number,
      value: number,
    }));

  const handleRolChange = (e: any) => {
    const { value } = e.target;
    console.log(value)
    //console.log(currentUser.roles)
    let _localRoles: string[] = [...currentUser.roles ?? []];

    if (e.target) {
      _localRoles = [value];
    } else {
      //console.log(localRoles.indexOf(value), 1)
      _localRoles.splice(localRoles.indexOf(value), 1);
    }
    currentUser.roles = _localRoles;
    setLocalRoles(_localRoles);
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    //console.log(name);
    let _user = { ...currentUser, [name]: value };
    setCurrentUser(_user);
    //console.log(JSON.stringify(_user));
    //console.log(JSON.stringify(currentUser));
  };

  const handleDropDownChange = (event: any) => {
    //console.log(JSON.stringify(event.target));
    const { name, value } = event.target;
    //console.log(value);
    let _user = { ...currentUser, [name]: value };
    setCurrentUser(_user);
    //console.log(JSON.stringify(_user));
    //console.log(JSON.stringify(currentUser));
  };

  // Se debe validar como hacer el refresco del componente
  const handleAdd = (event: any) => {
    if (setShowModal) setShowModal(true);
    //console.log(JSON.stringify(currentUser));
    event.preventDefault();
    setIsEdit(false);
    setCurrentUser(emptyUser);
    setReload(new Date());
    //console.log(JSON.stringify(currentUser));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    currentUser.roles = localRoles;
    //console.log(currentUser);
    (!isEdit) ? registerUser(currentUser) : updateUser(currentUser);
    if (setShowModal) setShowModal(false);
    setReload(new Date());
    //console.log(JSON.stringify(currentUser));
  };

  const tooltipContent: ReactNode = (
    <>
      <p>La contraseña debe ser de mínimo 8 caracteres</p>
      <p>Debe tener al menos una letra mayúscula</p>
      <p>Debe tener al menos un caracter numérico</p>
    </>
  );

  return (
    
    <div className="mx-4 d-grid gap-3">
      <form onSubmit={handleSubmit} method="post" className="mt-3">
        <UIInput required label="Email: " name="email" type='email' value={currentUser.email} onChange={handleChange} disabled={isEdit} autoComplete="off" />
        <UIInput required label="Nombres: " name="firstname" value={currentUser.firstname} onChange={handleChange} pattern='^[A-Za-z ]{3,50}$' />
        <UIInput required label="Apellidos: " name="lastname" value={currentUser.lastname} onChange={handleChange} pattern='^[A-Za-z ]{3,50}$' />
        <UIInput required label="Contraseña: " name="password" type="password" value={currentUser.password} onChange={handleChange}
          disabled={!changePasword} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'
          placeholder='al menos un numero y una mayuscula'
          overlayMsg={tooltipContent}
          autoComplete="new-password" />
        <UIDropdown label="Estado: " name="status" value={currentUser.status ? currentUser.status : ""} onChange={handleDropDownChange} options={statusOptions} required={true} />
        <UIDropdown label="Roles: " name="rol" value={currentUser.roles ? currentUser.roles[0] : ''} onChange={handleRolChange} options={roles!.map((number) => ({label: number, value: number}))} required={true} />
        
        {isEdit &&
          <Form.Check // prettier-ignore          
            type="switch"
            id="custom-switch"
            label="Cambiar Password"

            checked={changePasword}
            onChange={handleToggleChangePasword}
          />
        }

        {/* <Row bsPrefix='form-row' style={{ marginTop: '2rem' }}>
          <Form.Label className="label">Roles</Form.Label>
          <div className="value">
            <div className='flex'>
              <div className="mx-auto text-center">
                {roles && roles.map((rol, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <span className='ms-3' key={rol}>
                      <UIDropdown label="Seleccione el rol" name={rol} value={rol}  onChange={handleRolChange} required={true} options={rolesOptions}/>
                      <UICheckbox label={rol} name={rol} group='roles' value={rol} onChange={handleRolChange} checked={currentUser.roles ? currentUser.roles.some((item) => item === rol) : false} />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Row> */}

        <Row>
          <div className="mx-auto text-center" style={{ marginTop: '2rem' }}>
            {
              //<UIButton label="Nuevo" type='reset' onClick={handleAdd} />
            }
            <UIButton label={(isEdit) ? 'Actualizar' : 'Guardar'} />
            <UIButton label="Descartar" type="button" onClick={() => { 
              if(setShowModal)
            {setShowModal(false)}
          }}/>
          </div>
        </Row>
      </form>
    </div>
  );

} 

export default UserForm;