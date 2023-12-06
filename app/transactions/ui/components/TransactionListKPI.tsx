import { useContext, useEffect, useState } from 'react';
import { ITransaction } from '@transactions/domain/ITransaction';
import { UIDataTableFilter } from '@core/infrastructure/ui/components/UIDataTableFilter';
import { TransactionContext, TransactionContextType } from '@transactions/ui/context/TransactionContext';
import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UICalendar } from "@core/infrastructure/ui/components/UICalendar";
import { UIRoundChart } from "@core/infrastructure/ui/components/UIRoundChart";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Placeholder } from 'react-bootstrap';

export type TransactionListKPIProps = {
}


export const TransactionListKPI: React.FC<TransactionListKPIProps> = ({ }) => {

    const { updateViewTransactions, setUpdateViewTransactions, transactions, setTransactions } = useContext(TransactionContext) as TransactionContextType;
    const [labels, setLabels] = useState<string[]>();
    const [values, setValues] = useState<number[]>();


    useEffect(() => {
        if (transactions && transactions.length > 0) {

            const stopReasons: string[] = [];
            const counters: number[] = [];

            transactions.forEach((transaction) => {
                const { stopReason } = transaction;

                // Busca la posición de stopReason en el arreglo de stopReasons
                if (stopReason) {
                    const index = stopReasons.indexOf(stopReason);

                    if (index === -1) {
                        // Si no se encontró, agrega stopReason a stopReasons y establece el contador en 1
                        stopReasons.push(stopReason);
                        counters.push(1);
                    } else {
                        // Si se encontró, incrementa el contador correspondiente
                        counters[index]++;
                    }
                }
            });

            setLabels(stopReasons);
            setValues(counters);
            //console.log('Stop Reasons:', stopReasons);
            //console.log('Counters:', counters);

        }
    }, []);

    return (
        <div>
            { (transactions && transactions.length > 0) && (labels && labels.length > 0) && (values && values.length>0) ? (
                <>
                    <UIRoundChart label={labels} dataValue={values} backgroundColor={[
                        '#2F81C1',
                        '#0EB1C1',
                        '#AAB1C1',
                    ]} />
                </>
            ) : (
                <Placeholder style={{ width: '5rem', backgroundColor: "#28a745" }} className="rounded-circle me-2" />
            )
            }
        </div>
    );

}
