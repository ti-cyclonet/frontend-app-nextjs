'use client'
import { Form, Row } from 'react-bootstrap';

export type UIPasswordProps = {
    label: string;
    name: string;
    placeholder?: string;
    value?:string;
    required:boolean;
    onChange?: (event: any) => void
}

export const UIPassword: React.FC<UIPasswordProps> = ({ label, name, placeholder, value, required, onChange }) => {

    return (
        <Row bsPrefix='form-row'>  
            <Form.Label bsPrefix='label' htmlFor={name}>{label}</Form.Label>
            <Form.Control className='value' required={required} type="password" id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} />
        </Row>
    );
}