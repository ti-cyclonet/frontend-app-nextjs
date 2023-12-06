import { FunctionalUnitManagement } from "@/app/dashboard/application/functionalUnitManagement";
import { IFunctionalUnit } from "@/app/dashboard/domain/IFunctionalUnit";
import { FunctionalUnitService } from "@/app/dashboard/infrastructure/functionalUnit.service";
import { FC, useContext, useEffect, useState } from "react";
import "../styles/f-unit.css";
import * as Feather from "react-icons/fi";
import { Col, Row, Table } from "react-bootstrap";
import { ChargePerfilContext, ChargePerfilType } from "../context/ChargeperfilContext";
import { IChargeGroup, IGroupConnector } from "../../domain/IChargeGroup";
import { Accordion } from "react-bootstrap";
import { UIButton } from "@/app/core/infrastructure/ui/components";
import { useRouter } from "next/navigation";
import { Skeleton } from "primereact/skeleton";
import { ToastEventManager } from "@/app/core/infrastructure/utilities/EventsManager";
import { UIConfirmationDialog } from "@/app/core/infrastructure/ui/components/UIConfirmationDialog";
import { useSession } from "next-auth/react";
const ListFunctionalUnit: FC = () => {
  const {data} = useSession();
  const [functionalUnits, setFunctionalUnits] = useState<IFunctionalUnit[]>();
  const managerFunctionalUnit = new FunctionalUnitManagement(
    new FunctionalUnitService()
  );

  const { limits, setLimits, chargeGroups, loadChargeGroups, setChargeGroups, currentGroup, setCurrentGroup } = useContext(ChargePerfilContext) as ChargePerfilType;
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {

  }, []);

  function redirectToAddGroup() {
    router.push(`chargeperfil/${null}`);
  }

  function editChargeGroup(chargeGroup: IChargeGroup) {
    router.push(`chargeperfil/${chargeGroup.fuun_id}`);
  }

  async function showDeletConfirmation(chargeGroup: IChargeGroup) {
    console.log("Delete", chargeGroup);
    setCurrentGroup(chargeGroup);
    setShowConfirmation(true);
  }

  async function deleteChargeGroup(chargeGroup: IChargeGroup) {
    console.log("Grupo a eliminar ", currentGroup);
    await managerFunctionalUnit.deleteFunctionaUnit(currentGroup!.fuun_id!).then((data) => {
      if (data.success) {
        setChargeGroups([] as IChargeGroup[]);
        loadChargeGroups();
        ToastEventManager.setSubject(
          {
            severity: "success",
            summary: "Se elimino correctamente la unidad funcional.",
            detail: ".",
            life: 4000
          }
        );
      }
    });
  }

  return (
    <>
      <Row style={{ alignItems: 'end' }}>
        { data?.user?.roles.includes('VIEWER') ? '' :
        <Col md={{ span: 4 }}>
          <UIButton label="Agregar Grupo" type="button" onClick={redirectToAddGroup}/>
        </Col>
        }
      </Row>
      <br></br>
      {chargeGroups ? (
          <>
            <UIConfirmationDialog
                key='vehicles-confirmation'
                show={showConfirmation}
                title="Eliminar registro"
                message="Esta seguro de eliminar este registro?"
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => {
                  deleteChargeGroup(currentGroup!);
                  setShowConfirmation(false);
                }}
                onCancel={() => setShowConfirmation(false)}
              />
            <Accordion>
              {chargeGroups.map(( chargeGroup: IChargeGroup, i ) =>{
                  return (
                    <Accordion.Item eventKey={ chargeGroup.fuun_id!.toString() } key={i}>
                      <Accordion.Header>
                        <Table borderless align="center" className="w-75" size="sm">
                          <thead>
                            <tr style={{ textAlign: 'center' }}>
                              <td></td>
                              <td><b>Smart status</b></td>
                              <td><b>Álgoritmo</b></td>
                              <td><b>Potencia asignada(kW)</b></td>
                              <td><b>Número de cargadores</b></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ textAlign: 'center' }}>
                              <td>
                                <b>
                                
                                  <a className="text-muted" onClick={ () => editChargeGroup(chargeGroup) }>
                                    { chargeGroup.fuun_name }
                                  </a>
                    
                                </b>
                              </td>
                              <td>{ chargeGroup.fuun_assigned_power > 0 ? "Active":"Inactive" } </td>
                              <td>{ chargeGroup.fuun_algorithm }</td>
                              <td>{ chargeGroup.fuun_assigned_power } / { chargeGroup.fuun_allocpower }</td>
                              <td>{ chargeGroup.fuun_connected_cars }</td>
                              <td>
                              { data?.user?.roles.includes('VIEWER') ? '' :
                                  <Feather.FiEdit2
                                    size={30}
                                    className="align-middle icon"
                                    onClick={ () => { editChargeGroup(chargeGroup) }} 
                                  />
                              }
                              </td>
                              <td>
                              { data?.user?.roles.includes('VIEWER') ? '' :
                                <Feather.FiTrash2 
                                    size={30} 
                                    className="align-middle icon"
                                    onClick={ () => { showDeletConfirmation(chargeGroup) }} 
                                  />
                              }
                              </td>
                       
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Table align="center" className="w-75 p-3" size="sm">
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'center' }}>Cargador</th>
                              <th style={{ textAlign: 'center' }}>Potencia máxima(kW)</th>
                              {/* <th>Tipo de cargador</th> */}
                              <th style={{ textAlign: 'left' }}>Estatus</th>
                              <th>Respuesta</th>
                              <th>Conexión</th>
                              {/* <th style={{ textAlign: 'center' }}># Conectores</th>                               */}
                            </tr>
                          </thead>
                          <tbody>
                            { chargeGroup.fuun_chargers.length !==0 ? (
                              <>
                                {chargeGroup.fuun_chargers.map(( connector: IGroupConnector, j ) =>{

                                    return (
                                      <tr key={j}>
                                        <th style={{ textAlign: 'center' }}>{connector.cargador}</th>
                                        <th style={{ textAlign: 'center' }}>{connector.potmax}</th>
                                        {/* <th>{connector.tipocargador}</th> */}
                                        <th style={{ textAlign: 'left' }}>{connector.status}</th>
                                        <th>{connector.respuesta}</th>
                                        <th>{connector.conexion}</th>
                                        {/* <th style={{ textAlign: 'center' }}>{ connector.noconectores}</th> */}
                                      </tr>
                                    )
                              
                                  })
                                }

                              </>
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
              }
            </Accordion>
          </>
        ) : (
          <>
          <div className="border-round border-1 surface-border p-4 surface-card">
            <div className="flex mb-3">
                <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                <div>
                    <Skeleton width="10rem" className="mb-2"></Skeleton>
                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                    <Skeleton height=".5rem"></Skeleton>
                </div>
            </div>
            <Skeleton width="100%" height="150px"></Skeleton>
            <div className="flex justify-content-between mt-3">
                <Skeleton width="4rem" height="2rem"></Skeleton>
                <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
          </div>
          </>
        )
      }
    </>
  );
};

export default ListFunctionalUnit;
