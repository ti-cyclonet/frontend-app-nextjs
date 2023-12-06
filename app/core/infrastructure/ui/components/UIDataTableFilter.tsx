import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect, useRef } from "react";
import * as xlsx from "xlsx"
import * as FileSaver from "file-saver";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Card, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

//declare var jsPDF: any;

export type UIDataTableFilterProps = {
  columns: { field: string; header: string; dataType?: string; template?: (item: any) => any; filterTemplate?: (options:any)=> any }[];
  items: any[];
  hasActions?: boolean;
  handleEdit?: (item: any) => void;
  handleDelete?: (item: any) => void;
  handleDetail?: (item: any) => void;
  handleSelect?: (item: any) => void;  
  children?: React.ReactNode;
  paginacion?: number;
  dataKey?: string;
  filterDisplay?: "row" | "menu";
  msg?: string;
  filterPlaceholder?: string;
  minW?: string;
  tableSize: string;
};

export const UIDataTableFilter: React.FC<UIDataTableFilterProps> = ({
  columns,
  items,
  hasActions,
  handleDetail,
  handleEdit,
  handleDelete,  
  handleSelect,
  paginacion,
  filterDisplay,
  dataKey,
  msg,
  minW,
  filterPlaceholder,
  tableSize
}) => {
  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const dt = useRef<DataTable<any>>(null);
  const [filteredInfo, setFilteredInfo] = useState<any[]>([]); 

  const transactionTableExcel:string[] = ["chargeBox",]

  const exportCSV = (selectionOnly:any) => {
    if (dt.current!)
        dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = (): void => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: exportColumns,
      body: items
    })
  
    doc.save('table.pdf')
    //console.log('./table.pdf generated')
  };


  const exportExcel = (): void => {
      const worksheet = xlsx.utils.json_to_sheet(generateExcelRecords());
      console.log("items", items[0], columns);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "items");
    
  };

  function generateExcelRecords():any[] {
    let records:any[] = [];
    if (filteredInfo.length !== 0) {
      filteredInfo.forEach( item => {
        let record:any = {};
        columns.forEach(column => {
          if (column.header === "Roles") {
            record[column.header] = item[column.field][0];
          } else {
            record[column.header] = item[column.field];
          }
        });
        records = [... records,  record]
      });
    } else {
      items.forEach( item => {
        let record:any = {};
        columns.forEach(column => {
          if (column.header === "Roles") {
            record[column.header] = item[column.field][0];
          } else {
            record[column.header] = item[column.field];
          }
        });
        records = [... records,  record]
      });
    }
    return records;
  }

  const saveAsExcelFile = (buffer: ArrayBuffer, fileName: string): void => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data = new Blob([buffer], {
      type: EXCEL_TYPE,
    });

    FileSaver.saveAs(
      data,
      `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
    );
  };

  const actionsTemplate = (item: any) => {
    return (
      <>
        <div className="" style={{minWidth:'6rem'}} >
          {handleDetail ? (
            <Button
              icon="pi pi-chart-bar"
              rounded
              outlined
              severity="info"
              aria-label="Detalle"
              className="m-1"
              onClick={() => {
                if (handleDetail)
                  handleDetail(item);
              }}
            />
            ) : (
              ""
            )}
          {handleEdit ? (
            <Button
              icon="pi pi-file-edit"
              rounded
              outlined
              severity="success"
              aria-label="Editar"
              className="m-1"
              onClick={() => {
                if (handleEdit)
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
                if (handleDelete)
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
                if (handleSelect)
                handleSelect(item);
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
    <>      
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="float-end">
                <Button
                  type="button"
                  icon="pi pi-file"
                  severity="info"
                  rounded
                  onClick={() => exportCSV(false)}
                  data-pr-tooltip="CSV"
                />
                <Button
                  type="button"
                  icon="pi pi-file-excel"
                  severity="success"
                  rounded
                  onClick={exportExcel}
                  data-pr-tooltip="XLS"
                />
                {/*
                <Button
                  type="button"
                  icon="pi pi-file-pdf"
                  severity="warning"
                  rounded
                  onClick={exportPdf}
                  data-pr-tooltip="PDF"
                />
                */}
              </div>
              <br /><br />
              <DataTable
                ref={dt}
                value={items}
                paginator
                scrollable
                scrollHeight="350px"
                rowsPerPageOptions={[5, 10, 25, 50]}
                rows={paginacion}
                dataKey={dataKey}
                filterDisplay={filterDisplay}
                emptyMessage={msg}
                columnResizeMode='fit'
                responsiveLayout="stack"
                size={tableSize === 'small' ? 'small' : 'normal'}
                resizableColumns={true}
                onValueChange={ (values) => setFilteredInfo(values) }
              >
                {columns.map((col, i) => (
                  <Column
                    key={col.field}
                    field={col.field}
                    body={col.template}
                    header={col.header}
                    dataType={col.dataType}
                    filter
                    filterPlaceholder={filterPlaceholder}
                    filterElement={col.filterTemplate}
                    style={{ minWidth: minW }}
                    align="center"
                  />
                ))}
                {hasActions && (
                  <Column
                    key="actions"
                    field=""
                    header=""
                    body={actionsTemplate}
                    resizeable={false}
                  ></Column>
                )}
              </DataTable>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
