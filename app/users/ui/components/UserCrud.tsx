'use client'
import { useContext, useState } from 'react';
import dynamic from 'next/dynamic'
import { emptyUser } from '@core/domain/IUser';
import { UIButton } from '@core/infrastructure/ui/components/UIButton';
import { UIModal } from '@core/infrastructure/ui/components/UIModal';
import { UserContext, UserContextType } from '@users/ui/context/UserContext';
import { useSession } from 'next-auth/react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";
import { useRouter } from "next/navigation";
import * as Feather from "react-icons/fi";

//theme
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";


const UserForm = dynamic(() => import('@users/ui/components/UserForm'), {
    loading: () => <p>Loading...</p>,
});
const UserList = dynamic(() => import('@users/ui/components/UserList'), {
    loading: () => <TablePlaceholder cols={6} rows={8} />,
});



export const UserCrud = () => {
    // Check if data, user, and user.roles exist before accessing roles
    // const {data} = useSession();
    // const [userRole, setUserRole] = useState([])
    // Logging roles to console or further operations
    const { setCurrentUser, setIsEdit, isEdit} = useContext(UserContext) as UserContextType;
    const [show, setShow] = useState(false);
    let {data} = useSession();
    let router = useRouter();
    
    const newUser = () => {
        setIsEdit(false);
        setCurrentUser(emptyUser);
        setShow(true);
    }


    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-12 col-xxl-12 d-flex">

                    <Card className='flex-fill'>
                        <Card.Header>
                        <div className="col-12 col-lg-12 col-xxl-12 d-flex justify-content-between">
                            <Card.Title>Gestión de Usuarios</Card.Title>                                              
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
                                    { data?.user?.roles?.includes('VIEWER') || data?.user?.roles?.includes('OPERATOR') ? '' : <UIButton label="Crear Usuario" type='button' className='w-100' onClick={newUser} />}
                                </Col>
                            </Row>
                            <UserList setShowModal={setShow} />
                        </Card.Body>

                    </Card>

                </div>
            </div>

            <UIModal closeButton={true} show={show}
                title={isEdit ? 'Actualizar Usuario' : 'Registrar Usuario'}
                onHide={() => setShow(false)}>
                <UserForm setShowModal={setShow} />
            </UIModal>
        </>

    );

}

