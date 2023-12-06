'use client'
import { Button } from 'react-bootstrap';

export type UIButtonProps = {
    label: string;
    name?: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    className?: string;
    onClick?: (event: any) => void
}

export const UIButton: React.FC<UIButtonProps> = ({ label, name, type, disabled, className, onClick }) => {

    return (
        <Button className={className} id={name} name={name} type={type} onClick={onClick} disabled={disabled} >{label}</Button>
    );
    
}