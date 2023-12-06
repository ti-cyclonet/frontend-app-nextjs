'use client'
import { Form, Row } from 'react-bootstrap';
import { Calendar } from "primereact/calendar";

export type UICalendarProps = {
    label: string;
    name: string;
    placeholder?: string;
    value?:string | Date | Date[] | null;
    maxDate?:Date;
    showTime?:boolean;
    hourFormat?: "12" | "24" | undefined;
    required?:boolean;
    pattern?:string;
    disabled?:boolean;
    onChange?: (event: any) => void;
}

export const UICalendar: React.FC<UICalendarProps> = ({ label, name, placeholder, value, maxDate, required, pattern, onChange, disabled, showTime, hourFormat }) => {

    return (        
        <Row bsPrefix='form-row'>    
            <Form.Label bsPrefix='label' htmlFor={name}>{label}</Form.Label>
            <Calendar id={name} name={name} value={value} onChange={onChange} showTime={showTime??false} hourFormat={hourFormat??"24"} required={required} placeholder={placeholder} maxDate={maxDate} />
        </Row>      
    ); 
}