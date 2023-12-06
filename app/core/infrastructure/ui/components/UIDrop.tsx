import { Checkbox } from "primereact/checkbox";

export type UICheckboxProps = {
    label: string;
    name?: string;
    value?: string;
    group: string;
    checked: boolean;
    key?: string;
    onChange?: (event: any) => void
}

export const UICheckbox: React.FC<UICheckboxProps> = ({ label, name, value, group, checked, key, onChange }) => {

    return (
        <>
            <label htmlFor={name}>{name}&nbsp;</label>
            <Checkbox id={name} inputId={name} name={group} value={value} onChange={onChange} checked={checked} />
        </>

    );
}