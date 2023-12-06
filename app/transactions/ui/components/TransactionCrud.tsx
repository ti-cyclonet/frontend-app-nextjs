'use client'
import { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

import { emptyTransaction } from '@transactions/domain/ITransaction';
import { UIModal } from '@core/infrastructure/ui/components/UIModal';
import { TransactionContext, TransactionContextType } from '../context/TransactionContext';

import { Card, Col, Row } from 'react-bootstrap';

import { TablePlaceholder } from '@core/ui/layout/components/TablePlaceholder';

//theme
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";


const TransactionForm = dynamic(() => import('@transactions/ui/components/TransactionForm'), {
    loading: () => <p>Loading...</p>,
});
const TransactionList = dynamic(() => import('@transactions/ui/components/TransactionList'), {
    loading: () => <TablePlaceholder cols={6} rows={8} />,
});

export type TransactionCrudProps  = {    
    showKPI?: boolean
    queryType?: "full"|"chargebox"|"connector";
    id?: string;
  }

export const TransactionCrud : React.FC<TransactionCrudProps> = ({showKPI, queryType, id}) => {

    const { setCurrentTransaction, setIsEdit, setQueryType, setQueryId, currentTransaction } = useContext(TransactionContext) as TransactionContextType;
    const [show, setShow] = useState(false);

    const newTransaction = () => {
        setIsEdit(false);
        setCurrentTransaction(emptyTransaction);
        setShow(true);
    }

    useEffect(() => {
        setQueryType(""+queryType);
        setQueryId(""+id);
    }, [queryType]);

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-12 col-xxl-12 d-flex">

                    <Card className='flex-fill'>                        
                        <Card.Body><TransactionList showKPI={showKPI} setShowModal={setShow} /></Card.Body>
                    </Card>

                </div>
            </div>
        </>

    );

}

