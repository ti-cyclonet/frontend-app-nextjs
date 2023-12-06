'use client'
import { IChargeGroup } from "@/app/chargeperfil/domain/IChargeGroup";
import { ChargeGroupService } from "@/app/chargeperfil/infraestructure/chargeGroup.service";
import { PowerLimitService } from "@/app/chargeperfil/infraestructure/powerLimit.service";
import { ToastEventManager } from "@/app/core/infrastructure/utilities/EventsManager";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import { ChargeGroupManagement } from "../../application/chargeGroupManagement";

export type ChargeGroupCalendarType = {
    chargeGroup: IChargeGroup | null;
    setChargeGroup: (chargeGroup: IChargeGroup) => void;
    getChargeGropuById: (id: string) => void;
};

export const ChargeGroupCalendarContext = createContext<ChargeGroupCalendarType | null>(null);

export type ChargeGroupCalendarProviderProps = {
    children?: React.ReactNode
}

export const ChargeGroupCalendarProvider: React.FC<ChargeGroupCalendarProviderProps> = ({ children }) => {

    const [chargeGroup, setChargeGroup ] = useState<IChargeGroup | null>(null);

    const chargeGrupManager = new ChargeGroupManagement(new ChargeGroupService(), new PowerLimitService());
    const router = useRouter()

    const getChargeGropuById = (id: string) => {
        if (id) {
            chargeGrupManager.getChargeGroupById(id).then((data) => {
                if (data.chargeGroup) {
                    setChargeGroup(data.chargeGroup);
                } else {
                    ToastEventManager.setSubject(
                        {
                        severity: "error",
                        summary: "No fue posible obtener la información del Grupo.",
                        detail: ".",
                        life: 5000
                        }
                    );
                }
          });
        }
    };

    return (
        <ChargeGroupCalendarContext.Provider
        value={{ chargeGroup, setChargeGroup, getChargeGropuById }}>
            { children }
        </ChargeGroupCalendarContext.Provider>
    );

};