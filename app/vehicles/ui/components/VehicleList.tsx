import { useContext, useEffect, useState } from "react";
import { IVehicle } from "@vehicles/domain/IVehicle";
import { UIDataTableFilter } from "@core/infrastructure/ui/components/UIDataTableFilter";
import { VehiclesContext, VehiclesContextType } from "@vehicles/ui/context/VehicleContext";
import { UIConfirmationDialog } from "@core/infrastructure/ui/components/UIConfirmationDialog";
import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";
import { useSession } from "next-auth/react";
export type VehiclesListProps = {
  setShowModal?: (show: boolean) => void;
  onSubmit?: () => void;
};

const VehicleList: React.FC<VehiclesListProps> = ({ setShowModal }) => {
  const {
    updateViewVehicles, 
    updateViewModules, 
    currentVehicle,
    vehicles,
    loadVehicles,
    setCurrentVehicle,
    setIsEdit,
    deleteVehicle,
    modules,
    setModules
  } = useContext(VehiclesContext) as VehiclesContextType;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {data} = useSession()
  const modulesBody = (vehicle: IVehicle) => {
    if (vehicle.modules && vehicle.modules.length > 0) {
      const actives = vehicle.modules.map((module => {
        if (module.status && module.status == 'Active') {
          return module.module_sn;
        }
      }));
      const inactives = vehicle.modules.map((module => {
        if (module.status && module.status == 'Inactive') {
          return module.module_sn;
        }
      }));

      return (
        <>
          <span style={{ color: "green" }}>{actives.filter(Boolean).join(',')}</span><br />
          <span style={{ color: "red" }}>{inactives.filter(Boolean).join(',')}</span>
        </>
      );

    } else {
      return "";
    }
  };

  const columns = [
    //{field: 'id', header: 'Id'},
    //{ field: "id", header: "Id" },
    { field: "alias", header: "IdVehiculo" },
    { field: "placa", header: "AssetNum" },
    { field: "batery_max_cap", header: "SOC", dataType: "numeric" },
    { field: "charge_max_cap", header: "MaxPower", dataType: "numeric" },
    { field: "modules", header: "ModuleId", template: modulesBody },
    { field: "status", header: "State" },
  ];

  const handleEdit = (vehicle: IVehicle) => {
    setCurrentVehicle(vehicle);  
    if (vehicle.modules) {
      setModules(vehicle.modules);
    }

    //console.log(JSON.stringify(vehicles));
    setIsEdit(true);
    if (setShowModal) {
      data?.user.roles.includes('VIEWER') || data?.user.roles.includes('OPERATOR') ? setShowModal(false) : setShowModal(true);
    }
  };

  const handleDelete = (vehicle: IVehicle) => {
    setCurrentVehicle(vehicle);
    data?.user.roles.includes('VIEWER') || data?.user.roles.includes('OPERATOR') ? setShowConfirmation(false) : setShowConfirmation(true);
    
  };

  useEffect(() => {
    loadVehicles();
  }, [updateViewVehicles, updateViewModules]);

  return (
    <div>
      {vehicles ? (
        <>
          {vehicles.length > 0 ? (
            <>
              {
              data?.user.roles.includes('ADMIN') ?
                <UIDataTableFilter
                  columns={columns}
                  items={vehicles}
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
                items={vehicles}
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
                key='vehicles-confirmation'
                show={showConfirmation}
                title="Eliminar registro"
                message="Esta seguro de eliminar este registro?"
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => {
                  deleteVehicle(currentVehicle);
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
        <TablePlaceholder cols={8} rows={8} />
      )}
    </div>
  );
};

export default VehicleList;