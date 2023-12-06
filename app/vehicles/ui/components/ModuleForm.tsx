import React from "react";
import { emptyModule } from "@vehicles/domain/IModule";
import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UIDropdown } from "@core/infrastructure/ui/components/UIDropdown";
import { UIInput } from "@core/infrastructure/ui/components/UIInput";
import {
  VehiclesContext,
  VehiclesContextType,
} from "../context/VehicleContext";
import { Form, Row } from "react-bootstrap";

export type ModuleFormProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
};

export const ModuleForm: React.FC<ModuleFormProps> = ({setShowModal}) => {
  const {
    currentModule,
    setCurrentModule,
    currentVehicle,
    isEditModule,
    setIsEditModule,
    updateModule,
    registerModule
  } = React.useContext(VehiclesContext) as VehiclesContextType;

  const statusOptions = [
    { label: "ACTIVE", value: "Active" },
    { label: "INACTIVE", value: "Inactive" },
  ];

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    //console.log(name);
    let _module = { ...currentModule, [name]: value };
    setCurrentModule(_module);
    //console.log(JSON.stringify(module));
    //console.log(JSON.stringify(currentModule));
  };

  // Se debe validar como hacer el refresco del componente
  const handleAdd = (event: any) => {
    //console.log(JSON.stringify(currentModule));
    event.preventDefault();
    setCurrentModule(emptyModule);
    setIsEditModule(false);
    //console.log(JSON.stringify(currentModule));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    //currentModule.roles = localRoles;
    //console.log(currentModule);
    if (currentVehicle && currentVehicle.id) {
      if (isEditModule) {
        updateModule(currentVehicle.id, currentModule);
        setCurrentModule(emptyModule);
        setIsEditModule(false);
      } else {
        registerModule(currentVehicle.id, currentModule);
        setCurrentModule(emptyModule);
      }
    }
    //console.log(JSON.stringify(currentModule));
  };

  return (
    <div className="mx-4 d-grid gap-3">
      <form onSubmit={handleSubmit} method="post" className="mt-3">
        <UIInput
          required={true}
          label="ModuleId: "
          name="module_sn"
          value={currentModule.module_sn}
          onChange={handleChange}
        />
        <UIDropdown
          label="State: "
          name="status"
          value={currentModule.status ? currentModule.status : ""}
          onChange={handleChange}
          options={statusOptions}
          required={true}
        />

        <Row>
          <div className="mx-auto text-center">
            <UIButton label="Nuevo" type="reset" onClick={handleAdd} />
            <UIButton label={isEditModule ? "Actualizar" : "Guardar"} />
            <UIButton label="Descartar" type="button" onClick={() => { 
              if(setShowModal)
            {setShowModal(false)} }} />
          </div>
        </Row>
      </form>
    </div>
  );
};
