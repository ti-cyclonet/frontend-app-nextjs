"use client";
import { useContext, useState } from "react";
import dynamic from 'next/dynamic'

import { emptyVehicle } from "@vehicles/domain/IVehicle";
import { UIButton } from "@core/infrastructure/ui/components/UIButton";
import { UIModal } from "@core/infrastructure/ui/components/UIModal";
import { VehiclesContext, VehiclesContextType, } from "@vehicles/ui/context/VehicleContext";
import { useSession } from "next-auth/react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import * as Feather from "react-icons/fi";
import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";

//theme
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

const VehicleForm = dynamic(() => import('@vehicles/ui/components/VehicleForm'), {
  loading: () => <p>Loading...</p>,
});
const VehicleList = dynamic(() => import('@vehicles/ui/components/VehicleList'), {
  loading: () => <TablePlaceholder cols={8} rows={8} />,
});


export const VehicleCrud = () => {
  const {data} = useSession()
  const { setCurrentVehicle, setIsEdit, isEdit } = useContext(
    VehiclesContext
  ) as VehiclesContextType;
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  let router = useRouter();

  const newVehicles = () => {
    setIsEdit(false);
    setCurrentVehicle(emptyVehicle);
    setShowVehicleModal(true);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-12 col-xxl-12 d-flex">

          <Card className="flex-fill">
            <Card.Header>
              <div className="col-12 col-lg-12 col-xxl-12 d-flex justify-content-between">
                <Card.Title>Gestión de Vehículos</Card.Title>            
              </div>
             </Card.Header>

            <Card.Body>
              <Row >
                <Col xl={2} lg={2} md={4} sm={4} className="p-4">
                    <Button type="button" className="w-100" style={ { background: 'none', color:'black' }} onClick={ (e) => router.back() } >
                        <Feather.FiArrowLeft
                        size={20}
                        className="align-middle me-1 text-success"
                        /> Volver
                    </Button>
                </Col>
                <Col xl={8} lg={8} md={2} sm={2}></Col>
                <Col xl={2} lg={2} md={4} sm={4} className="p-4" style={{ justifyContent: 'end'}}>
                  {data?.user?.roles?.includes('VIEWER') || data?.user?.roles?.includes('OPERATOR') ? '' : <UIButton label="Crear Vehículo" type="button" className="w-100" onClick={newVehicles} />}
                </Col>
              </Row>
              <VehicleList setShowModal={setShowVehicleModal} />
            </Card.Body>

          </Card>
        </div>
      </div>
      <UIModal closeButton={true} show={showVehicleModal}
        key='vehicles-modal'
        title={isEdit ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
        onHide={() => setShowVehicleModal(false)}>
        <VehicleForm setShowModal={setShowVehicleModal} />
      </UIModal>
    </>
  );
};
