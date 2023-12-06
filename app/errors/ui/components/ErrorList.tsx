import { useContext, useEffect, useState } from 'react';

import { IError } from '@errors/domain/IError';
import { UIDataTableFilter } from '@core/infrastructure/ui/components/UIDataTableFilter';
import { ErrorContext, ErrorContextType } from '@errors/ui/context/ErrorContext';

import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UICalendar } from "@core/infrastructure/ui/components/UICalendar";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TablePlaceholder } from '@core/ui/layout/components/TablePlaceholder';
import { Button } from 'react-bootstrap';

import { useRouter } from "next/navigation";
import * as Feather from "react-icons/fi";

export type ErrorListProps = {
    showKPI?: boolean
    setShowModal?: (show: boolean) => void;
    onSubmit?: () => void;
}


const ErrorList: React.FC<ErrorListProps> = ({ showKPI, setShowModal }) => {

    const { setQueryStartDate, setQueryEndDate, updateViewErrors, setUpdateViewErrors, errors, setErrors, setCurrentError } = useContext(ErrorContext) as ErrorContextType;
    const [showConfirmation, setShowConfirmation] = useState(false);
    let router = useRouter();

    const [startdate, setStartDate] = useState<string | Date | Date[] | null>(null);
    const [enddate, setEndDate] = useState<string | Date | Date[] | null>(null);
    const formatDate = (date: Date | undefined) => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (date) {
            //console.log(date);
            try {
                return date.toLocaleDateString("es-ES", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: timeZone // Utiliza el formato de 24 horas
                });
            } catch (e: any) {
                return "";
            }
        } else {
            return "";
        }
    };

    const dateFilterTemplate = (options: any) => {
        return (
            <UICalendar
                label=""
                name="filter-date"
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                maxDate={new Date()}
                placeholder="mm/dd/yyyy HH:mm"
                showTime={true}
            />
        );
    };

    const errorTimestampBodyTemplate = (error: IError) => {
        if (error && error.errorTimestamp) {
            return formatDate(error.errorTimestamp);
        } else {
            return "";
        }
    };

    const columns = [
        // { field: 'id', header: 'Id' },
        { field: 'errorTimestamp', header: 'DateAndTime', dataType: 'date', template: errorTimestampBodyTemplate, filterTemplate: dateFilterTemplate },
        { field: 'chargeboxAlias', header: 'ChargerId' },
        { field: 'connectorId', header: 'ConnectorId' },
        { field: 'transactionId', header: 'TransactionId' },
        { field: 'errorCode', header: 'OCPPErrorCode' },
        { field: 'errorDescription', header: 'ErrorDescription' },
        { field: 'chargeboxStatus', header: 'ChargerState' },
        { field: 'vendorId', header: 'VendorId' },
        { field: 'vendorErrorCode', header: 'VendorErrorCode' },
    ];


    function convertToDate(value: string | Date | Date[] | null): Date | null {
        if (value === null) {
            return null; // Si el valor es nulo, devuelve nulo
        } else if (value instanceof Date) {
            return value; // Si el valor ya es de tipo Date, devuelve el valor sin cambios
        } else if (typeof value === 'string') {
            const date = new Date(value); // Intenta convertir la cadena en un objeto Date
            if (!isNaN(date.getTime())) {
                return date; // La conversión fue exitosa, devuelve el objeto Date
            }
        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
            return value[0]; // Si es una matriz de fechas, devuelve la primera fecha
        }

        // Si no se puede convertir, devuelve nulo o maneja el caso según tu lógica
        return null;
    }

    // Se debe validar como hacer el refresco del componente
    const handleRangeChange = (event: any) => {
        if (startdate && enddate) {
            console.log("[startdate]" + startdate);
            console.log("[enddate]" + enddate);
            event.preventDefault();
            setQueryStartDate(convertToDate(startdate));
            setQueryEndDate(convertToDate(enddate));
            setErrors(null);
            setUpdateViewErrors(new Date());
        }
    };

    const clearRangeChange = (event: any) => {
        setStartDate(null);
        setEndDate(null);
        event.preventDefault();
        setQueryStartDate(null);
        setQueryEndDate(null);
        setErrors(null);
        setUpdateViewErrors(new Date());
    };



    return (
        <div>

            <Row xs="auto" md="auto">
                <Col xl={2} lg={2} md={3} sm={3} className="p-4">
                    <Button type="button" className="w-100" style={ { background: 'none', color:'black' }} onClick={ (e) => router.back() } >
                        <Feather.FiArrowLeft
                        size={20}
                        className="align-middle me-1 text-success"
                        /> Volver
                    </Button>
                </Col>
                <Col xl={2} lg={2} md={3} sm={3} className="p-2">
                    <UICalendar required={true} label="Desde: " name="startdate"
                        value={startdate} onChange={(e) => { if (e && e.value) setStartDate(e.value) }}
                        showTime={true} hourFormat="24" maxDate={new Date()}
                    />
                </Col>
                <Col xl={2} lg={2} md={3} sm={3} className="p-2">
                    <UICalendar required={true} label="Hasta: " name="enddate"
                        value={enddate} onChange={(e) => { if (e && e.value) setEndDate(e.value) }}
                        showTime={true} hourFormat="24" maxDate={new Date()}
                    />
                </Col>
                <Col xl={2} lg={2} md={3} sm={3} className="p-4">
                    <UIButton label="Consultar" type="button" onClick={handleRangeChange} disabled={!(startdate && enddate)} />
                    <UIButton label="Limpiar" type="button" onClick={clearRangeChange} disabled={(startdate === null && enddate === null)} />
                </Col>
            </Row>

            {errors ? (
                <>
                    {errors.length > 0 ? (
                        <>
                            <UIDataTableFilter columns={columns} items={errors}
                                hasActions={false}
                                paginacion={10}
                                dataKey="rownum"
                                msg='No found'
                                filterPlaceholder='Search'
                                tableSize='small'
                                filterDisplay="menu"
                            >
                            </UIDataTableFilter>
                        </>
                    ) : (
                        <>
                            No data found!
                        </>
                    )}
                </>
            ) : (
                <TablePlaceholder cols={6} rows={8} />
            )}
        </div>
    );

};

export default ErrorList;
