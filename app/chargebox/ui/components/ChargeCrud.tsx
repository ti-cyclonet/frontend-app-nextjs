"use client";
import dynamic from 'next/dynamic'

import { Card } from "react-bootstrap";

import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";

const ChargeList = dynamic(() => import('@chargebox/ui/components/ChargeList'), {
  loading: () => <TablePlaceholder cols={6} rows={8} />,
});

const ChargeCrud = () => {
  return (
    <div className="row">
      <div className="col-12 col-lg-12 col-xxl-12 d-flex">

        <Card className="flex-fill">
          <Card.Header>
            <div className="col-12 col-lg-12 col-xxl-12 d-flex justify-content-between">
              <Card.Title>Gestión de Cargadores</Card.Title>
            </div>
          </Card.Header>

          <Card.Body>
            <ChargeList/>
          </Card.Body>

        </Card>
      </div>
    </div>
  );
};

export default ChargeCrud;
