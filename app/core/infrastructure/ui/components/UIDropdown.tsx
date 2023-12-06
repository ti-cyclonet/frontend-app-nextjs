import React, { useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';

export type UIDropdownProps = {    
    label: string;
    name: string;
    placeholder?: string;
    value:string;
    options: { label: string, value: string }[];
    onChange: (event: any) => void;
    required?:boolean;
    labelOnTop?: boolean;
}

export const UIDropdown: React.FC<UIDropdownProps> = ({ label, name, placeholder, value, options, onChange, required, labelOnTop }) => {


    const getOptionByText = (optionText: string) =>{
        return options.find(option => option.value === optionText);
    };

    /*useEffect(() => {       
        console.log(JSON.stringify(options));
        console.log(JSON.stringify(getOptionByText(value)));
      }, []);*/

    return (
        <>
        { labelOnTop ? (
            <>
            <Row bsPrefix="form-row">
                <Form.Group className="mb-1 w-100">
                    <Form.Label bsPrefix="label" htmlFor={name} key={"l" + name} className="w-100">
                        {label}
                    </Form.Label>
                    <Form.Select id={name} name={name} className="w-75"
                        onChange={onChange}
                        placeholder={placeholder} 
                        value={value}
                        required={required}
                        >
                        {options.map((option:any, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            </>
            ) : (
                <>
                <div className='form-row'>        
                    <div className="label"><label htmlFor={name}>{label}</label></div>
                    <div className="value">
                        <Form.Select id={name} name={name} 
                            onChange={onChange}
                            placeholder={placeholder} 
                            value={value}
                            required={required}
                            >
                            {options.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </div>            
                </div>  
                </> 
            )
        }   
        </>  
    );
}