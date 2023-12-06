import { IPowerLimit } from "./IPowerLimit";
import { IPowerLimitRepository } from "@/app/core/domain/IPowerLimitRepository";

export interface PowerLimitRepository extends IPowerLimitRepository<IPowerLimit> {
    
}