import { useContext, useEffect, useState } from "react";
import { IModule } from "@vehicles/domain/IModule";
import { UIDataTable } from "@core/infrastructure/ui/components/UIDataTable";
import {
  VehiclesContext,
  VehiclesContextType,
} from "../context/VehicleContext";
import { UIConfirmationDialog } from "@core/infrastructure/ui/components/UIConfirmationDialog";
import { useSession } from "next-auth/react";

export type ModuleListProps = {
  onSubmit?: () => void;
};

export const ModuleList: React.FC<ModuleListProps> = ({}) => {
  const {
    updateViewModules, setUpdateViewModules,
    loadVehicles,
    currentVehicle,
    setCurrentVehicle,
    setIsEdit,
    modules,
    setModules,
    currentModule,
    setCurrentModule,
    isEditModule,
    setIsEditModule,
    deleteModule,
    activateModule,
    inactivateModule,
  } = useContext(VehiclesContext) as VehiclesContextType;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {data} = useSession()
  const columns = [
    //{field: 'id', header: 'Id'},
    { field: "id", header: "Id" },
    { field: "module_sn", header: "ModuleId" },
    { field: "status", header: "State" },
  ];

  const handleEdit = (module: IModule) => {
    setCurrentModule(module);
    //console.log(JSON.stringify(vehicles));
    data?.user.roles.includes('VIEWER') || data?.user.roles.includes('OPERATOR') ? setIsEditModule(false) : setIsEditModule(true);
    
  };

  const handleDelete = (module: IModule) => {
    setCurrentModule(module);
    data?.user.roles.includes('VIEWER') || data?.user.roles.includes('OPERATOR') ? setShowConfirmation(false) : setShowConfirmation(true);
    
  };

  useEffect(() => {
    if (currentVehicle && currentVehicle.modules) {
      setModules(currentVehicle.modules);
    }
  }, [updateViewModules]);

  return (
    <div>
      {modules && modules.length > 0 ? (
        <>
          <UIDataTable
            columns={columns}
            items={modules}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></UIDataTable>
          <UIConfirmationDialog
            key='modules-confirmation'
            show={showConfirmation}
            title="Eliminar registro"
            message="Esta seguro de eliminar este registro?"
            onHide={() => {
              setShowConfirmation(false);
            }}
            onConfirm={() => {
              if (currentVehicle && currentVehicle.id && currentModule && currentModule.id){
                deleteModule(currentVehicle.id, currentModule.id);
              }
              setShowConfirmation(false);
            }}
            onCancel={() => setShowConfirmation(false)}
          />
        </>
      ) : (
        <p>No records found.</p>
      )}
      
    </div>
  );
};
