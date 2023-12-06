"use client";
import React, { createContext, useEffect, useState } from "react";
import { VehiclesManagement } from "@vehicles/application/vehiclesManagement";
import { IVehicle, emptyVehicle } from "@vehicles/domain/IVehicle";
import { IModule, emptyModule } from "@vehicles/domain/IModule";
import { VehiclesService } from "@vehicles/infrastructure/vehicles.service";
import { ModulesService } from "@vehicles/infrastructure/modules.service";

import { ToastEventManager } from '@core/infrastructure/utilities/EventsManager';

export type VehiclesContextType = {
  updateViewVehicles: any;
  setUpdateViewVehicles: (date: Date) => void;
  currentVehicle: IVehicle;
  setCurrentVehicle: (vehicle: IVehicle) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  isValidPlate: boolean;
  setIsValidPlate: (isEdit: boolean) => void;
  vehicles: IVehicle[] | null;
  loadVehicles: () => void;
  getVehicleById: (id: string) => void;
  registerVehicle: (vehicle: IVehicle) => void;
  updateVehicle: (vehicle: IVehicle) => void;
  deleteVehicle: (vehicle: IVehicle) => void;

  updateViewModules: any;
  setUpdateViewModules: (date: Date) => void;
  currentModule: IModule;
  setCurrentModule: (vehicle: IModule) => void;
  isEditModule: boolean;
  setIsEditModule: (isEdit: boolean) => void;
  modules: IModule[];
  setModules: (modules: IModule[]) => void;
  registerModule: (vehicleId: string, module: IModule) => void;
  updateModule: (vehicleId: string, module: IModule) => void;
  deleteModule: (vehicleId: string, id: string) => void;
  activateModule: (vehicleId: string, id: string) => void;
  inactivateModule: (vehicleId: string, id: string) => void;
};

// Creamos un contexto para manejar los productos
export const VehiclesContext = createContext<VehiclesContextType | null>(null);

export type VehiclesProviderProps = {
  children?: React.ReactNode;
};

export const VehiclesProvider: React.FC<VehiclesProviderProps> = ({
  children,
}) => {
  const [updateViewVehicles, setUpdateViewVehicles] = useState(new Date());
  const [updateViewModules, setUpdateViewModules] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [isValidPlate, setIsValidPlate] = useState(true);
  const [currentVehicle, setCurrentVehicle] = useState(emptyVehicle);
  const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);

  const [isEditModule, setIsEditModule] = useState(false);
  const [currentModule, setCurrentModule] = useState(emptyModule);
  const [modules, setModules] = useState<IModule[]>([]);

  const manager = new VehiclesManagement(
    new VehiclesService(),
    new ModulesService()
  );

  const loadVehicles = () => {
    console.log("load Vehicles on Context (server)");
    (async () => {
      const resp = await manager.getAllVehicles();
      if (resp.vehicles) {
        setVehicles(resp.vehicles as IVehicle[]);
      }
    })();
  };

  const registerVehicle = (vehicle: IVehicle) => {
    manager.registerVehicle(vehicle).then((data) => {
      console.log('Respuesta registra vehículo #############');
      console.log(data);
      if (data.success && data.vehicle) {
        loadVehicles();
        setUpdateViewVehicles(new Date());
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Vehículo registrado exitósamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible registrar el vehículo.",
            detail: data.error,//"Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const updateVehicle = (vehicle: IVehicle) => {
    //console.log(JSON.stringify(vehicle));
    manager.updateVehicle(vehicle).then((data) => {
      if (data.success && data.vehicle) {
        loadVehicles();
        setUpdateViewVehicles(new Date());
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Vehiculo actualizado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible actualizar el vehiculo.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const deleteVehicle = (vehicle: IVehicle) => {
    if (vehicle.id) {
      manager.deleteVehicle(vehicle.id).then((data) => {
        if (data.success) {
          loadVehicles();
          setUpdateViewVehicles(new Date());
          ToastEventManager.setSubject(
            {
              severity: "success",
              summary: "Vehiculo eliminado exitosamente.",
              life: 4000
            }
          );
        } else {
          ToastEventManager.setSubject(
            {
              severity: "error",
              summary: "No fue posible eliminar el vehiculo.",
              detail: "Verifique si posee los permisos suficientes para realizar esta acción.",
              life: 5000
            }
          );
        }
      });
    }
  };

  const getVehicleById = (id: string) => {
    if (id) {
      manager.geVehiclesByPlaca(id).then((data) => {
        if (data && data.success && data.vehicle && data.vehicle.modules) {
          setCurrentVehicle(data.vehicle);
          setModules(data.vehicle?.modules);
          setUpdateViewVehicles(new Date());
          setUpdateViewModules(new Date());
        } else {
          ToastEventManager.setSubject(
            {
              severity: "error",
              summary: "No fue posible obtener la información del vehiculo.",
              detail: "Verifique si la información e intente nuevamente.",
              life: 5000
            }
          );
        }
      });
    }
  };

  const registerModule = (vehicleId: string, module: IModule) => {
    manager.registerModule(vehicleId, module).then((data) => {
      if (data.success && data.module) {
        getVehicleById(vehicleId);
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Modulo de carga registrado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible registrar el modulo de carga.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const updateModule = (vehicleId: string, module: IModule) => {
    //console.log(JSON.stringify(vehicle));
    manager.updateModule(vehicleId, module).then((data) => {
      if (data.success && data.module) {
        getVehicleById(vehicleId);
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Modulo de carga actualizado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible actualizar el modulo de carga.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const deleteModule = (vehicleId: string, id: string) => {
    manager.deleteModule(vehicleId, id).then((data) => {
      if (data.success) {
        getVehicleById(vehicleId);
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Modulo de carga eliminado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible eliminar el modulo de carga.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const activateModule = (vehicleId: string, id: string) => {
    manager.activateModule(vehicleId, id).then((data) => {
      if (data.success) {
        getVehicleById(vehicleId);
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Modulo de carga activado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible activar el modulo de carga.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };

  const inactivateModule = (vehicleId: string, id: string) => {
    manager.inactivateModule(vehicleId, id).then((data) => {
      if (data.success) {
        getVehicleById(vehicleId);
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Modulo de carga inactivado exitosamente.",
            life: 4000
          }
        );
      } else {
        ToastEventManager.setSubject(
          {
            severity: "error",
            summary: "No fue posible inactivar el modulo de carga.",
            detail: "Verifique la información ingresada e intente nuevamente.",
            life: 5000
          }
        );
      }
    });
  };


  if (!vehicles)
    loadVehicles();


  return (
    <VehiclesContext.Provider
      value={{
        updateViewVehicles, setUpdateViewVehicles,
        currentVehicle, setCurrentVehicle,
        isEdit, setIsEdit,
        isValidPlate, setIsValidPlate,
        vehicles, loadVehicles,

        getVehicleById,
        registerVehicle,
        updateVehicle,
        deleteVehicle,

        updateViewModules, setUpdateViewModules,
        currentModule, setCurrentModule,
        isEditModule, setIsEditModule,
        modules, setModules,

        registerModule,
        updateModule,
        deleteModule,
        activateModule,
        inactivateModule,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};
