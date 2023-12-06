import React from "react";
import { VehiclesService } from "@vehicles/infrastructure/vehicles.service";
import { VehiclesManagement } from "@vehicles/application/vehiclesManagement";

import { LoginService } from "@core/infrastructure/services/Login.services";
import { LoginManagement } from "@core/application/LoginManagement";
import { VehiclesProvider } from "@/app/vehicles/ui/context/VehicleContext";
import { VehicleCrud } from "@vehicles/ui/components/VehicleCrud";

function VehiclesPage() {
  //const management: VehiclesManagement = new VehiclesManagement(new VehiclesService());

  return (   
    <VehiclesProvider >
      <VehicleCrud />
    </VehiclesProvider>
  );
}

export default VehiclesPage;
