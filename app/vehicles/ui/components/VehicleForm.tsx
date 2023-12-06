import React, { useState, ReactNode } from "react";
import dynamic from 'next/dynamic'

import { emptyVehicle } from '@vehicles/domain/IVehicle';
import { UIButton } from '@core/infrastructure/ui/components/UIButton';
import { UIDropdown } from '@core/infrastructure/ui/components/UIDropdown';
import { UIInput } from '@core/infrastructure/ui/components/UIInput';
import { UITabs } from "@core/infrastructure/ui/components/UITabs";
import { VehiclesContext, VehiclesContextType } from '@vehicles/ui/context/VehicleContext';

import { Row } from 'react-bootstrap';


const ModuleCrud = dynamic(() => import('@vehicles/ui/components/ModuleCrud'), {
  loading: () => <p>Loading...</p>,
});

export type VehicleFormProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ setShowModal }) => {

  const {
    currentVehicle,
    setCurrentVehicle,
    isEdit,
    setIsEdit,
    updateVehicle,
    registerVehicle,
    vehicles,
    isValidPlate,
    setIsValidPlate
  } = React.useContext(VehiclesContext) as VehiclesContextType;
  
  const statusOptions = [
    { label: 'ACTIVE', value: 'Active' },
    { label: 'INACTIVE', value: 'Inactive' }
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    //console.log(name);
    let _vehicle = { ...currentVehicle, [name]: value };
    setCurrentVehicle(_vehicle);
    if (vehicles && name == "placa") {
      if (isEdit) {
        if(vehicles?.find((v) => v.placa === value && v.id !== _vehicle.id)) {
          setIsValidPlate(false);
        } else {
          setIsValidPlate(true);
        }
      } else {
        if(vehicles?.find((v) => v.placa === value)) {
          setIsValidPlate(false);
        } else {
          setIsValidPlate(true);
        }
      }
    }
    //console.log(JSON.stringify(user));
    //console.log(JSON.stringify(currentVehicle));
  };

  // Se debe validar como hacer el refresco del componente
  const handleAdd = (event: any) => {
    if (setShowModal) setShowModal(true);
    //console.log(JSON.stringify(currentVehicle));
    event.preventDefault();
    setIsEdit(false);
    
    
    //console.log(JSON.stringify(currentVehicle));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    //currentVehicle.roles = localRoles;
    //console.log(currentVehicle);
    (!isEdit) ? registerVehicle(currentVehicle) : updateVehicle(currentVehicle);
    if (setShowModal) setShowModal(false);
    //console.log(JSON.stringify(currentVehicle));
  };


  const contentTabForm = (): ReactNode => {
    return (

      <form onSubmit={handleSubmit} method="post" className="mt-3">

        <UIInput required label="Nombre: " name="alias" value={currentVehicle.alias} onChange={handleChange} pattern="^[a-zA-Z]*\d{1,6}$"/>
        <UIInput required label="Carga máxima: " name="batery_max_cap" value={currentVehicle.batery_max_cap ?? ""} pattern="^(?:100|[1-9][0-9]?)$" onChange={handleChange} placeholder="Min 1%, Max 100 %" />
        <UIInput required label="Energía máxima: " name="charge_max_cap" value={currentVehicle.charge_max_cap ?? ""} pattern="^(?:1000|[1-9][0-9]?[0-9]?)$" onChange={handleChange} placeholder="Min 1 kW, Max 1000 kW" />
        <UIInput
          required
          label="Placa: "
          name="placa"
          value={currentVehicle.placa}
          onChange={handleChange}
          isInvalid={!isValidPlate}
          pattern="^([a-zA-Z]{3}[0-9]{3})$"
          msgInvalid="Este número de placa ya exite."
        />
        <UIDropdown label="Estado: " name="status" value={currentVehicle.status ? currentVehicle.status : ''}
          onChange={handleChange} options={statusOptions}
          required={true} />

        <Row>
          <div className="mx-auto text-center">
            <UIButton label={(isEdit) ? 'Actualizar' : 'Guardar'} disabled={(isEdit) ? false : !isValidPlate} />
            <UIButton label="Descartar" type="button" onClick={() => { 
              if(setShowModal)
            {setShowModal(false)}
          }}/>
          </div>
        </Row>
      </form>
    );
  }

  const contentTabList = (): ReactNode => {
    return (isEdit) ? <ModuleCrud setShowModal={setShowModal}/> : <></>;
  }

  const tabItems = [
    //{field: 'id', header: 'Id'},
    { title: "Vehículo", eventKey: "vehiculo", content: contentTabForm },
    { title: "Módulos de Carga", eventKey: "modulos", content: contentTabList },
  ];

  return (
    <>
      {isEdit ? (
        <UITabs id={'modules-tab'} key={'modules-ta'} tabItems={tabItems}></UITabs>
      ) : (
        <>
          {contentTabForm()}
        </>
      )}
    </>
  );

};

export default VehicleForm;