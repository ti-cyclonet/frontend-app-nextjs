'use client'
import { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

import { emptyError } from '@errors/domain/IError';
import { UIModal } from '@core/infrastructure/ui/components/UIModal';
import { ErrorContext, ErrorContextType } from '@errors/ui/context/ErrorContext';

import { Card } from 'react-bootstrap';

import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";


//theme
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";


const ErrorList = dynamic(() => import('@errors/ui/components/ErrorList'), {
    loading: () => <TablePlaceholder cols={9} rows={8} />,
});


export type ErrorCrudProps  = {    
    showKPI?: boolean
    queryType?: "full"|"chargebox"|"connector";
    id?: string;
  }

export const ErrorCrud : React.FC<ErrorCrudProps> = ({showKPI, queryType, id}) => {

    const { setCurrentError, setIsEdit, setQueryType, setQueryId } = useContext(ErrorContext) as ErrorContextType;
    const [show, setShow] = useState(false);

    const newError = () => {
        setIsEdit(false);
        setCurrentError(emptyError);
        setShow(true);
    }

    useEffect(() => {
        setQueryType(""+queryType);
        setQueryId(""+id);
        //console.log("reload TrxCrud");
        //console.log(queryType);
        //console.log(id);
    }, [queryType]);

    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-12 col-xxl-12 d-flex">

                    <Card className='flex-fill'>                        
                        <Card.Body><ErrorList showKPI={showKPI} setShowModal={setShow} /></Card.Body>
                    </Card>

                </div>
            </div>
        </>

    );

}

