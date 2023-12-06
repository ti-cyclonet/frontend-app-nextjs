'use client'
import { createContext, useEffect, useState } from "react";

import { TransactionManagement } from '@transactions/application/transactionManagement';
import { ITransaction, emptyTransaction } from '@transactions/domain/ITransaction'
import { TransactionService } from "@transactions/infrastructure/transaction.service";

export type TransactionContextType = {

    updateViewTransactions: any; 
    setUpdateViewTransactions: (date: Date) => void;

    queryStartDate: Date | null;
    setQueryStartDate: (queryStartDate: Date | null) => void;
    queryEndDate: Date | null;
    setQueryEndDate: (queryStartDate: Date | null) => void;

    queryType: string;
    setQueryType: (queryType: string) => void;
    queryId: string;
    setQueryId: (queryId: string) => void;

    currentTransaction: ITransaction;
    setCurrentTransaction: (transaction: ITransaction) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    transactions: ITransaction[]|null;
    setTransactions: (transaction: ITransaction[]|null) => void;
    loadTransactions: () => void;
    metervalues: string[]|null;
    getTransactionMeterValues: (transactionname: string) => string[];
    
    loadedTransactions: boolean;
    setLoadedTransactions: (load:boolean) => void;
}

// Creamos un contexto para manejar los productos
export const TransactionContext = createContext<TransactionContextType | null>(null);

export type TransactionProviderProps = {
    children?: React.ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {

    const [updateViewTransactions, setUpdateViewTransactions] = useState(new Date());
    const [isEdit, setIsEdit] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(emptyTransaction);
    const [transactions, setTransactions] = useState<ITransaction[]|null>(null);
    const [metervalues, setMetervalues] = useState<string[]|null>(null);
    const [queryType, setQueryType] = useState('');
    const [queryId, setQueryId] = useState('');
    const [loadedTransactions, setLoadedTransactions] = useState<boolean>(false);

    const [queryStartDate, setQueryStartDate] = useState<Date | null>(null);
    const [queryEndDate, setQueryEndDate] = useState<Date | null>(null);

    const manager = new TransactionManagement(new TransactionService());

    const loadTransactions = () => {
        //setLoadedTransactions(false);
        console.log('load Transaction on Context (server)');
        (async () => {            
            if (queryType.length > 0) {

                //console.log(queryId, queryType);
                //console.log(typeof queryId);

                let resp;
                if (queryType === "full" || !queryId) {
                    if (queryStartDate && queryEndDate){                        
                        resp = await manager.getAllTransactions(queryStartDate, queryEndDate);
                    }else{
                        resp = await manager.getAllTransactions();
                    }                    
                }
                if (queryType === "chargebox" && queryId) {
                    //console.log("Consultando getAllByChargebox");
                    if (queryStartDate && queryEndDate){
                        resp = await manager.getAllByChargebox(queryId, queryStartDate, queryEndDate);
                    }else{                        
                        resp = await manager.getAllByChargebox(queryId);
                    }                    
                }
                if (queryType === "connector" && queryId) {
                    //console.log("Consultando getAllByConnector");
                    if (queryStartDate && queryEndDate){
                        resp = await manager.getAllByConnector(queryId, queryStartDate, queryEndDate);
                    }else{                        
                        resp = await manager.getAllByConnector(queryId);
                    }
                }

                if (resp) {
                    let _transactionstmp = resp.transactions ?? [];
                    //console.log(_transactionstmp);
                    if (_transactionstmp) {
                        setTransactions(_transactionstmp as ITransaction[]);
                        setLoadedTransactions(true);
                    }
                }
            }
        })();
    };

    const getTransactionMeterValues = (transactionname: string): string[] => {
        let metervalues;
        manager.getTransactionMeterValues(transactionname).then(data => {
            if (data.success) {
                //console.log(data.roles);
                metervalues = data.metervalues;
            }
        });
        //console.log(roles);
        return (metervalues ? metervalues : []) as string[];
    };

    if (!transactions)
    loadTransactions();
    
    return (
        <TransactionContext.Provider value={{ updateViewTransactions, setUpdateViewTransactions, queryStartDate, setQueryStartDate, queryEndDate, setQueryEndDate, queryId, setQueryId, queryType, setQueryType, currentTransaction, setCurrentTransaction, isEdit, setIsEdit, transactions, setTransactions, loadTransactions, metervalues, getTransactionMeterValues, loadedTransactions, setLoadedTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};
