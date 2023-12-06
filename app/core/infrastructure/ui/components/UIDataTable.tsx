import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export type UIDataTableProps = {
  columns: { field: string; header: string; template?: (item: any) => any }[];
  items: any[];
  handleEdit?: (item: any) => void;
  handleDelete?: (item: any) => void;
  handleSelect?: (item: any) => void;
  minWidth?: string;
  maxWidth?: string;  
  children?: React.ReactNode;
};

export const UIDataTable: React.FC<UIDataTableProps> = ({
  columns,
  items,
  handleEdit,
  handleDelete,
  handleSelect,
  minWidth,
  maxWidth
}) => {
  const actionsTemplate = (item: any) => {
    return (
      <>
        <div className="" style={{minWidth:'6rem'}} >
          {handleEdit ? (
            <Button
              icon="pi pi-file-edit"
              rounded
              outlined
              severity="success"
              aria-label="Editar"
              className="m-1"
              onClick={() => {
                handleEdit(item);
              }}
            />
          ) : (
            ""
          )}

          {handleDelete ? (
            <Button
              icon="pi pi-times"
              rounded
              outlined
              severity="danger"
              aria-label="Eliminar"
              className="m-1"
              onClick={() => {
                handleDelete(item);
              }}
            />
          ) : (
            ""
          )}

          {handleSelect ? (
            <Button
              icon="pi pi-check"
              rounded
              outlined
              aria-label="Seleccionar"
              className="m-1"
              onClick={() => {
                handleSelect ? handleSelect(item) : "";
              }}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <DataTable value={items} 
        stripedRows
        tableStyle={{ 
          minWidth: minWidth?minWidth:'100%',
          maxWidth: maxWidth?maxWidth:'100%'
           }}>
        {columns.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            body={col.template}
            header={col.header}            
          />
        ))}
        <Column
          key="actions"
          field=""
          header=""
          body={actionsTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};
