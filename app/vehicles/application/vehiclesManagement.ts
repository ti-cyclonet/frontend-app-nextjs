import { IVehicle } from "@vehicles/domain/IVehicle";
import { IModule } from "@vehicles/domain/IModule";
import { VehiclesRepository } from "@vehicles/domain/vehiclesRepository";
import { ModulesRepository } from "@vehicles/domain/modulesRepository";

export class VehiclesManagement {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly modulesRepository: ModulesRepository) {
    this.vehiclesRepository = vehiclesRepository;
    this.modulesRepository = modulesRepository;
  }

  async getAllVehicles(): Promise<{ success: boolean; vehicles: IVehicle[] | null }> {
    try {
      const responseVehicles = await this.vehiclesRepository.getAll();
      return { success: true, vehicles: responseVehicles };
    } catch (e: any) {
      return { success: false, vehicles: null };
    }
  }

  async geVehiclesByPlaca(placa: string): Promise<{ success: boolean; vehicle: IVehicle | null }> {
    try {
      const responseVehicle = await this.vehiclesRepository.getById(placa);
      return { success: true, vehicle: responseVehicle };
    } catch (e: any) {
      return { success: false, vehicle: null };
    }
  }

  async registerVehicle(
    vehicle: IVehicle
  ): Promise<{ success: boolean; vehicle: IVehicle | null, error?: any }> {
    try {
      const responseVehicle = await this.vehiclesRepository.add(vehicle);
      return { success: true, vehicle: responseVehicle };
    } catch (e: any) {
      return { success: false, vehicle: null, error: "" + e };
    }
  }

  async updateVehicle(
    vehicle: IVehicle
  ): Promise<{ success: boolean; vehicle: IVehicle | null }> {
    try {
      const responseVehicle = await this.vehiclesRepository.update(vehicle);
      return { success: true, vehicle: responseVehicle };
    } catch (e: any) {
      return { success: false, vehicle: null };
    }
  }

  async inactivateVehicle(
    placa: string
  ): Promise<{ success: boolean; vehicles: IVehicle | null }> {
    try {
      let responseVehicles = await this.vehiclesRepository.getById(placa);
      if (responseVehicles) {
        responseVehicles.status = "INACTIVE";
        responseVehicles = await this.vehiclesRepository.update(responseVehicles);
        return { success: true, vehicles: responseVehicles };
      } else {
        return { success: false, vehicles: null };
      }
    } catch (e: any) {
      return { success: false, vehicles: null };
    }
  }

  async deleteVehicle(placa: string): Promise<{ success: boolean; vehicle: IVehicle | null }> {
    try {
      await this.vehiclesRepository.delete(placa);
      return { success: true, vehicle: null };
    } catch (e: any) {
      return { success: false, vehicle: null };
    }
  }

  async registerModule(vehicleId: string, module: IModule): Promise<{ success: boolean; module: IModule | null }> {
    try {
      const responseModule = await this.modulesRepository.add(vehicleId, module);
      return { success: true, module: responseModule };
    } catch (e: any) {
      return { success: false, module: null };
    }
  }

  async updateModule(vehicleId: string, module: IModule): Promise<{ success: boolean; module: IModule | null }> {
    try {
      const responseModule = await this.modulesRepository.update(vehicleId, module);
      return { success: true, module: responseModule };
    } catch (e: any) {
      return { success: false, module: null };
    }
  }

  async deleteModule(vehicleId: string, id: string): Promise<{ success: boolean }> {
    try {
      const responseModule = await this.modulesRepository.deleteModule(vehicleId, id);
      return { success: responseModule };
    } catch (e: any) {
      return { success: false };
    }
  }

  async activateModule(vehicleId: string, id: string): Promise<{ success: boolean }> {
    try {
      const responseModule = await this.modulesRepository.deleteModule(vehicleId, id);
      return { success: responseModule };
    } catch (e: any) {
      return { success: false };
    }
  }

  async inactivateModule(vehicleId: string, id: string): Promise<{ success: boolean }> {
    try {
      const responseModule = await this.modulesRepository.inactivateModule(vehicleId, id);
      return { success: responseModule };
    } catch (e: any) {
      return { success: false };
    }
  }

}
