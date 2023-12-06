'use client'

import { useContext, useEffect, useState } from "react";
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";

export type TablePlaceholderProps = {
  rows: number  
  cols: number  
}

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({rows, cols}) => {

  return (
    <>
      <Row className="d-flex justify-content-end">
        <Placeholder style={{ width: '40px', height: '40px', backgroundColor: "#17a2b8" }} className="rounded-circle" />
        <Placeholder style={{ width: '40px', backgroundColor: "#28a745" }} className="rounded-circle me-2" />
      </Row>
      <Placeholder animation="wave">
        <Table responsive className="p-datatable-table">
          <thead className="p-datatable-thead">
            <tr style={{ height: '40px' }} >
              {Array.from({ length: cols }).map((col, index) => (
                <th key={index}><Row className="d-flex justify-content-between mx-2 col-11 border-2 placeholder-th"><Placeholder as={"strong"} xs={6} /><Placeholder xs={1} /></Row></th>
              ))}
            </tr>
          </thead>
          <tbody className="p-datatable.p-datatable-striped p-datatable-tbody">
            {Array.from({ length: rows }).map((col, index1) => (
              <tr key={index1} role="row" className={(index1 % 2 === 0) ? "" : "placeholder-row-odd"}>
                {Array.from({ length: cols }).map((col, index) => (
                  <td key={index} className="text-center"><Placeholder xs={11} size="lg" bg="dark" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Placeholder>

      <Placeholder className="d-flex justify-content-center" animation="wave">
        <Placeholder.Button variant="secondary" className="mx-1" style={{ minWidth: '0.5rem', maxWidth: '0.5rem' }} />
        <Placeholder.Button variant="secondary" className="mx-1" style={{ minWidth: '0.5rem', maxWidth: '0.5rem' }} />
        <Placeholder.Button variant="secondary" className="mx-1" xs={1} />
        <Placeholder.Button variant="secondary" className="mx-1" style={{ minWidth: '0.5rem', maxWidth: '0.5rem' }} />
        <Placeholder.Button variant="secondary" className="mx-1" style={{ minWidth: '0.5rem', maxWidth: '0.5rem' }} />
      </Placeholder>

    </>
  );
};

