'use client'
import React, { createContext, useEffect, useState } from "react";

import { ErrorManagement } from '@errors/application/errorManagement';
import { IError, emptyError } from '@errors/domain/IError'
import { ErrorService } from "@errors/infrastructure/error.service";

export type ErrorContextType = {

    updateViewErrors: any;
    setUpdateViewErrors: (date: Date) => void;

    queryStartDate: Date | null;
    setQueryStartDate: (queryStartDate: Date | null) => void;
    queryEndDate: Date | null;
    setQueryEndDate: (queryStartDate: Date | null) => void;

    queryType: string;
    setQueryType: (queryType: string) => void;
    queryId: string;
    setQueryId: (queryId: string) => void;
    currentError: IError;
    setCurrentError: (transaction: IError) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    errors: IError[] | null;
    setErrors: (transaction: IError[]|null) => void;
    loadErrors: () => void;
}


// Creamos un contexto para manejar los productos
export const ErrorContext = createContext<ErrorContextType | null>(null);

export type ErrorProviderProps = {
    children?: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {

    const [updateViewErrors, setUpdateViewErrors] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);
    const [currentError, setCurrentError] = useState(emptyError);
    const [errors, setErrors] = useState<IError[] | null>(null);
    const [queryType, setQueryType] = useState('');
    const [queryId, setQueryId] = useState('');

    const [queryStartDate, setQueryStartDate] = useState<Date | null>(null);
    const [queryEndDate, setQueryEndDate] = useState<Date | null>(null);

    const manager = new ErrorManagement(new ErrorService());

    const loadErrors = () => {
        console.log('load Error on Context (server)');
        (async () => {

            if (queryType.length > 0) {

                console.log("[" + queryId + "][" + queryType + "]");
                //console.log(typeof queryId);

                let resp;
                if (queryType === "full" || !queryId) {
                    //console.log("Consultando getAllErrors");
                    //console.log(queryStartDate, queryEndDate)
                    if (queryStartDate && queryEndDate) {
                        resp = await manager.getAllErrors(queryStartDate, queryEndDate);
                    } else {
                        resp = await manager.getAllErrors();
                    }
                }
                if (queryType === "chargebox" && queryId) {
                    //console.log("Consultando getAllByChargebox");
                    if (queryStartDate && queryEndDate) {
                        resp = await manager.getAllByChargebox(queryId, queryStartDate, queryEndDate);
                    } else {
                        resp = await manager.getAllByChargebox(queryId);
                    }
                }
                if (queryType === "connector" && queryId) {
                    //console.log("Consultando getAllByConnector");
                    if (queryStartDate && queryEndDate) {
                        resp = await manager.getAllByConnector(queryId, queryStartDate, queryEndDate);
                    } else {
                        resp = await manager.getAllByConnector(queryId);
                    }
                }
                if (queryType === "transaction" && queryId) {
                    //console.log("Consultando getAllByConnector");                    
                    resp = await manager.getAllByConnector(queryId);
                }

                if (resp) {
                    let _errorstmp = resp.errors ?? [];
                    //console.log(_errorstmp);
                    if (_errorstmp) {
                        setErrors(_errorstmp as IError[]);
                    }
                }
            }
        })();
    };

    if (!errors)
        loadErrors();

    return (
        <ErrorContext.Provider value={{ updateViewErrors, setUpdateViewErrors, queryStartDate, setQueryStartDate, queryEndDate, setQueryEndDate, queryId, setQueryId, queryType, setQueryType, currentError, setCurrentError, isEdit, setIsEdit, errors, setErrors, loadErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};
