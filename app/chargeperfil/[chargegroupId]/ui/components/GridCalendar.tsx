'use client'; 
import "../../../ui/styles/grid.css";
import "../styles/Calendar.css";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useContext, useEffect, useRef, useState } from "react";
import { UIButton, UIInput } from "@/app/core/infrastructure/ui/components";
import { Row, Col, Table, Card, Button } from "react-bootstrap";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { ChargeGroupManagement } from "../../application/chargeGroupManagement";
import { ChargeGroupService } from "@/app/chargeperfil/infraestructure/chargeGroup.service";
import { IChargeGroup, IGroupConnector } from "@/app/chargeperfil/domain/IChargeGroup";
import { ToastEventManager } from "@/app/core/infrastructure/utilities/EventsManager";
import { Skeleton } from 'primereact/skeleton';
import { IFunctionalStation, ILimit, IPowerLimit } from "@/app/chargeperfil/domain/IPowerLimit";
import * as Feather from "react-icons/fi";
import { UIModal } from "@/app/core/infrastructure/ui/components/UIModal";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/navigation";
import { PowerLimitService } from "@/app/chargeperfil/infraestructure/powerLimit.service";
import { classNames } from "primereact/utils";

const GridCalendar = ({ chargegroupId }: any): JSX.Element => {

  const chargeGrupManager = new ChargeGroupManagement(new ChargeGroupService(), new PowerLimitService());
  const router = useRouter();

  const [existentChargeGroup, setExistenChargeGroup] = useState<IChargeGroup | null>(null);
  const [chargeGroup, setChargeGroup ] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<string>("");
  const [maxPower, setMaxPower] = useState<number | null>(0);
  const [limitPower, setLimitPower] = useState<number>(0);
  const [conectedCars, setConectedCars] = useState<number>(0);
  const [assignedPower, setAssignedPower] = useState<number>(0);
  const [availableConnectors, setAvailableConnectors] = useState<IGroupConnector[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState<IGroupConnector[]>([]);

  const [validGroupName, setValidGroupName] = useState<boolean>(true);
  const [validAlgorithm, setValidAlgorithm] = useState<boolean>(true);
  const [validMaxPower, setValidMaxPower] = useState<boolean>(true);
  const [validLimitPower, setValidLimitPower] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [showAvailableConnectorsModal, setShowAvailableConnectorsModal] = useState<boolean>(false);

  const [selectedAlgorithm, setSelectedAlgorithm ] = useState<any>(null);
  const algorithms = [
        { name: 'FIFO', code: 'FIFO' },
  ];

  const daysOfWeek = [
    { day: "Domingo", dayNumber: 0 }, { day: "Lunes", dayNumber: 1 }, { day: "Martes", dayNumber: 2 },
    { day: "Miercoles", dayNumber: 3 }, { day: "Jueves", dayNumber: 4 }, { day: "Viernes", dayNumber: 5 },
    { day: "Sabado", dayNumber: 6 }
  ];

  const dt = useRef<DataTable<any>>(null);
  const columns = [
    { field: "charge_box_pk", header: "Connector ID" },
    { field: "cargador", header: "Nombre" },
    { field: "tipocargador", header: "Tipo Cargador" },
    { field: "respuesta", header: "Respuesta" },
    { field: "conexion", header: "Conexión" },
  ];
 
  
  const calendarRef:any = useRef();
  const [config, setConfig] = useState({
    viewType: "Week",
    startDate: "2024-07-22",
    locale: "es-es",
    headerDateFormat: "dddd",
    timeRangeSelectedHandling: "Enabled",
    durationBarVisible: false,
    dynamicLoading: true,
    onTimeRangeSelected:  async (args: { control: any; start: any; end: any; }) => {

      let form = [
        {name: "Potencia Máxima para rango seleccionado:", id: "power", type: 'number', onValidate: validatePowerField, cssClass: "max_width_modal_field"}
      ];
      var data = {
        power: ""
      }
      DayPilot.Modal.form(form, data, { theme: "modal_rounded" }).then(async (modal: { result: any; }) => {
        var dp = args.control;
        dp.clearSelection();
        if (!modal.result) { return; }

        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: populateEventText(modal.result.power, args),
          rightClickDisabled: true,
        }));
      });
    },
    eventMoveHandling: "Disabled",
    eventDeleteHandling: "Update",
    onEventDeleted: (args: { source: any; }) => {
      const dp = calendarRef.current.control;
      dp.events.remove(args.source);
    },
    onEventClicked: async (args: { e: { data: any; }; }) => {
      const form = [
        {name: "Potencia Máxima para rango seleccionado:", id: "power", type: 'number', onValidate: await validatePowerField }
      ];

      let text:string = args.e.data.text;
      let split:string[] = text.split("-");
      let maxPower:string = split[0];
      maxPower = maxPower.replace("KW", "");

      args.e.data.text = maxPower;

      const modal = await DayPilot.Modal.form(form, args.e.data, { theme: "modal_rounded" });

      if (modal.canceled) {
          return;
      }

      modal.result.text = populateEventText(modal.result.text, modal.result);

      const dp = calendarRef.current.control;
      dp.events.update(modal.result);
    },
    
  });

  async function validatePowerField(args:any) {
    var value = args.value || "";
    if (value.trim().length === 0) {
      args.valid = false;
      args.message = "Ingresa la potencia";
    }
    /*else if (value > maxPower!) {
      args.valid = false;
      args.message = "El valor supera la potencia maxima asignada.";
    }
    */else if (value === 0) {
      args.valid = false;
      args.message = "La potencia no puede ser 0.";
    }
  }

  const editEvent = async (e: { text: () => any; data: { text: any; }; }) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Potencia Máxima para rango seleccionado:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  function populateEventText(power:any, args:any):string {
    let startDate: Date = new Date(args.start);
    let endDate: Date = new Date(args.end);
    return power + " KW" + "-" + padTo2Digits(startDate.getHours()) + ":" + padTo2Digits(startDate.getMinutes()) 
                  + "-" + padTo2Digits(endDate.getHours()) + ":" + padTo2Digits(endDate.getMinutes());
  }

  function populateEventTextEdit(power:any, initHour: number, endHour: number):string {
    return power + " KW" + "-" + padTo2Digits(initHour) + ":" + padTo2Digits(0) 
                  + "-" + padTo2Digits(endHour) + ":" + padTo2Digits(0);
  }

  function padTo2Digits(num:number): string {
    return String(num).padStart(2, '0');
  }

  useEffect(() => {
    if (chargegroupId !== 'null') {
      getChargeGropuById(chargegroupId);
    } else {
      setLoading(false);
    }
    if (!loading && chargegroupId !== 'null' && existentChargeGroup) {
      populateEventsFromRequest(existentChargeGroup!);
    }
  }, [loading]);

  useEffect(() => {
    if (maxPower && maxPower > 0) {
      console.log("Next power", maxPower);
      setConfig({
        viewType: "Week",
        startDate: "2024-07-22",
        locale: "es-es",
        headerDateFormat: "dddd",
        timeRangeSelectedHandling: "Enabled",
        durationBarVisible: false,
        dynamicLoading: true,
        onTimeRangeSelected:  async (args: { control: any; start: any; end: any; }) => {
    
          let form = [
            {name: "Potencia Máxima para rango seleccionado:", id: "power", type: 'number', onValidate: validatePowerField, cssClass: "max_width_modal_field"}
          ];
          var data = {
            power: ""
          }
          DayPilot.Modal.form(form, data, { theme: "modal_rounded" }).then(async (modal: { result: any; }) => {
            var dp = args.control;
            dp.clearSelection();
            if (!modal.result) { return; }
    
            dp.events.add(new DayPilot.Event({
              start: args.start,
              end: args.end,
              id: DayPilot.guid(),
              text: populateEventText(modal.result.power, args),
              rightClickDisabled: true,
            }));
          });
        },
        eventMoveHandling: "Disabled",
        eventDeleteHandling: "Update",
        onEventDeleted: (args: { source: any; }) => {
          const dp = calendarRef.current.control;
          dp.events.remove(args.source);
        },
        onEventClicked: async (args: { e: { data: any; }; }) => {
          const form = [
            {name: "Potencia Máxima para rango seleccionado:", id: "power", type: 'number', onValidate: await validatePowerField }
          ];
    
          let text:string = args.e.data.text;
          let split:string[] = text.split("-");
          let maxPower:string = split[0];
          maxPower = maxPower.replace("KW", "");
    
          args.e.data.text = maxPower;
    
          const modal = await DayPilot.Modal.form(form, args.e.data, { theme: "modal_rounded" });
    
          if (modal.canceled) {
              return;
          }
    
          modal.result.text = populateEventText(modal.result.text, modal.result);
    
          const dp = calendarRef.current.control;
          dp.events.update(modal.result);
        },
        
      });
    }
  }, [maxPower]);

  const getChargeGropuById = (id: string) => {
    if (id) {
        chargeGrupManager.getChargeGroupById(id).then((data) => {
            if (data.chargeGroup) {
              setExistenChargeGroup(data.chargeGroup);
              setChargeGroup(data.chargeGroup.fuun_name);
              setMaxPower(data.chargeGroup.fuun_allocpower);
              setLimitPower(data.chargeGroup.fuun_consumption_power);
              setSelectedAlgorithm({ name: data.chargeGroup.fuun_algorithm, code: data.chargeGroup.fuun_algorithm } as any);
              setConectedCars(data.chargeGroup.fuun_connected_cars);
              setAssignedPower(data.chargeGroup.fuun_assigned_power);
              setSelectedConnectors(data.chargeGroup.fuun_chargers);
              setLoading(false);
              setEdit(true);
            } else {
              showMessage("error", "No fue posible obtener la información el grupo." , 4000);
            }
      });
    }
  };

  function populateEventsFromRequest(chargeGroup: IChargeGroup) {
    const dp = calendarRef!.current!.control!;
    chargeGroup.fuun_charge_profile.forEach(charger => {
      let dayNumber = getAddDays(charger.name);
      charger.limits.forEach(limit => {
        dp.events.add(new DayPilot.Event({
          start: DayPilot.Date("2024-07-22").addDays(dayNumber).addHours(limit.inihour),
          end: DayPilot.Date("2024-07-22").addDays(dayNumber).addHours(limit.endhour),
          id: DayPilot.guid(),
          text: populateEventTextEdit(limit.functionalStation.limit.toString(), limit.inihour, limit.endhour),
          rightClickDisabled: true,
        }));
      });
    });
  }

  function getAddDays(day: string): number {
    let res:number = 0;
    switch(day) {
      case "Monday":
        res= 0;
        break;
        case "Tuesday":
        res= 1;
        break;
        case "Wednesday":
        res= 2;
        break;
        case "Thursday":
        res= 3;
        break;
        case "Friday":
        res= 4;
        break;
        case "Saturday":
        res= 5;
        break;
        case "Sunday":
        res= 6;
        break;
      default:
        res = 0;
    }
    return res;
  }

  async function saveChargeGroup() {
    if (!validateNewGroup()) {
      showMessage("error", "Asegurate de llenar todos los campos.", 4000);
      return;
    }
    let group: IChargeGroup = {
      fuun_id: undefined,
      fuun_algorithm: selectedAlgorithm!.name ,
      fuun_allocpower: maxPower!,
      fuun_name: chargeGroup,
      fuun_charge_profile: initializeChargeProfileList(),
      fuun_chargers: selectedConnectors,
      fuun_connected_cars: conectedCars,
      fuun_assigned_power: assignedPower,
      fuun_consumption_power: limitPower
      
    }
    await chargeGrupManager.saveNewChargeGroup(group).then( async (data) => {
      if (data.success) {
        console.log("Data success", data);
        data.chargeGroup!.fuun_charge_profile = initializeChargeProfileList();
        populateEventList(data.chargeGroup!);
        await chargeGrupManager.savePowerLimits(data.chargeGroup!.fuun_charge_profile, data.chargeGroup!.fuun_id!).then((data) => {
          if (data.success) {
            showMessage("success", "La información se ha guardado exitosamente." , 4000);
            returnToFunctionalUnitList();
          } else {
            showMessage("error", "Ocurrio un error al guardar los perfiles de carga." , 4000);
          }
        });
      } else {
        showMessage("error", "Ocurrio un error al guardar el grupo." , 4000);
      }
    });
  }

  async function editChargeGroup() {
    if (!validateNewGroup()) {
      showMessage("error", "Asegurate de llenar todos los campos.", 4000);
      return;
    }
    if (existentChargeGroup) {
      existentChargeGroup.fuun_algorithm = selectedAlgorithm!.name;
      existentChargeGroup.fuun_allocpower = maxPower!;
      existentChargeGroup.fuun_name = chargeGroup;
      existentChargeGroup.fuun_consumption_power = limitPower;
      existentChargeGroup.fuun_chargers = selectedConnectors;
      existentChargeGroup.fuun_charge_profile = initializeChargeProfileList();
      await chargeGrupManager.editNewChargeGroup(existentChargeGroup).then( async (data) => {
        if (data.success) {
          populateEventList(existentChargeGroup);
          await chargeGrupManager.savePowerLimits(existentChargeGroup.fuun_charge_profile, existentChargeGroup.fuun_id!).then((data) => {
            if (data.success) {
              showMessage("success", "La información se ha guardado exitosamente." , 4000);
              returnToFunctionalUnitList();
              
            } else {
              showMessage("error", "Ocurrio un error al guardar los perfiles de carga." , 4000);
            }
          });
        } else {
          showMessage("error", "Ocurrio un error al editar el grupo." , 4000);
        }
      });
    }
  }

  function validateNewGroup(): boolean {
    let result: boolean = true;
    setValidGroupName(true);
    setValidAlgorithm(true);
    setValidMaxPower(true);
    setValidLimitPower(true);
    if (chargeGroup.length === 0) {
      setValidGroupName(false);
      result = false;
    }
    if (!selectedAlgorithm) {
      setValidAlgorithm(false);
      result = false;
    }
    if (!maxPower || maxPower === 0) {
      setValidMaxPower(false);
      result = false;
    }
    if (!limitPower || limitPower === 0) {
      setValidLimitPower(false);
      result = false;
    }
    return result;
  }

  function showMessage(severity: any, message: string, life:number) {
    ToastEventManager.setSubject(
      {
        severity: severity,
        summary: message,
        detail: ".",
        life: life
      }
    );
  }

  function populateEventList(group: IChargeGroup) {
    const dp = calendarRef.current.control;
    dp.events.list.forEach( (event:any) => {
      let dayNumber:number = new Date(event.start).getDay();
      let dayName:string = findWeekDayByNumber(dayNumber);
      let limitStart: ILimit = transformEventToLimit(event, group.fuun_id!);
      addLimitToPowerLimitList(limitStart, dayName, group);
    });
  }

  function addLimitToPowerLimitList(limit: ILimit, dayName:string, group: IChargeGroup) {
    group.fuun_charge_profile.forEach( profile => {
      if (profile.name === dayName) {
        profile.limits = [... profile.limits, limit];
      }
    });
  }

  function findWeekDayByNumber(dayNumber: number): string {
    let result: string = "";
    daysOfWeek.forEach(day => {
      if (day.dayNumber === dayNumber) {
        result = day.day;
      }
    });
    return result;
  }

  function initializeChargeProfileList(): IPowerLimit[] {
    let powerLimits:IPowerLimit[] = [];
    daysOfWeek.forEach( day => {
      powerLimits = [... powerLimits, initializePowerLimitArrays(day.day, day.dayNumber)]
    });
    return powerLimits;
  }

  function initializePowerLimitArrays(day: string, dayNumber: number): IPowerLimit {
    let powerLimit: IPowerLimit = {
      id: dayNumber,
      name: day,
      limits: []
    }
    return powerLimit;
  }

  function transformEventToLimit(event: any, functionalUnitId: number): ILimit {
    console.log("Texto", event.text.split("KW")[0]);
    let limit: ILimit = {
      inihour: new Date(event.start).getHours(),
      endhour: new Date(event.end).getHours() === 0 ? 24 : new Date(event.end).getHours(),
      functionalStation: {
        functionalStationId: functionalUnitId,
        limit: event.text.split("KW")[0].toString().trim()
      } 
    }
    return limit;
  }

  function openActiveGroups() {
    chargeGrupManager.getAvailableConnetors().then( (data) => {
      if (data.success) {
        setAvailableConnectors(data.availableConnectors);
        setShowAvailableConnectorsModal(true);
      } else {
        showMessage("error", "No hay conectores disponibles" , 4000);
        setShowAvailableConnectorsModal(false);
      }
    });
  }

  function closeModal() {
    setAvailableConnectors([]);
    setShowAvailableConnectorsModal(false);
  }

  function returnToFunctionalUnitList() {
    router.push('/chargeperfil');
  }

  function removeChargerAssignment() {

  }

  return (
    <>
      { loading ? (
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
        ) : (
          <>
            <div className="flex-fill">
              <Row className="p-4">
                <Col xl={2} lg={2} md={4} sm={4} className="p-4">
                  <Button type="button" className="w-100" style={ { background: 'none', color:'black' }} onClick={ (e) => { returnToFunctionalUnitList() } }>
                    <Feather.FiArrowLeft
                      size={20}
                      className="align-middle me-1 text-success"
                    /> Volver
                  </Button>
                </Col>
                <Col xl={2} lg={4} md={4} sm={4}>
                  <div className="flex-auto">
                    <label htmlFor="groupName" className="font-bold block mb-2 text-sm"><b>Grupo</b></label>
                    <InputText id="groupName" value={chargeGroup} 
                      onChange={(e:any) => setChargeGroup(e.target.value)} className={classNames({ 'p-invalid': !validGroupName, 'w-100': true })}/>
                    {!validGroupName ? (
                        <small className="p-error">Agrega el nombre del grupo</small>
                      ): (
                        <></>
                      )
                    }
                  </div>
                </Col>
                <Col xl={2} lg={4} md={4} sm={4}>
                  <div className="flex-auto">
                      <label htmlFor="algorithm" className="font-bold block mb-2 text-sm"><b>Álgoritmo</b></label>
                      <Dropdown value={selectedAlgorithm}  options={algorithms} optionLabel="name" name="algorithm"
                        placeholder="Selecciona..." className={classNames({ 'p-invalid': !validAlgorithm, 'w-100': true, 'w-full': true })}
                        onChange={(e:any) => setSelectedAlgorithm(e.value)} />
                      {!validAlgorithm ? (
                        <small className="p-error">Selecciona el Algoritmo</small>
                      ): (
                        <></>
                      )
                    }
                  </div>
                </Col>
                <Col xl={2} lg={4} md={4} sm={4}>
                  <div className="flex-auto">
                      <label htmlFor="maxpower" className="font-bold block mb-2 text-sm"><b>Potencia máxima por defecto</b></label>
                      <InputNumber inputId="maxpower" suffix=" KW" value={maxPower} 
                      onValueChange={(e:any) => { setMaxPower(e.value); console.log("Holas", e)} } className={classNames({ 'p-invalid': !validMaxPower, 'w-100': true })}/>
                      {!validMaxPower ? (
                        <small className="p-error">Ingresa la potencia máxima</small>
                      ): (
                        <></>
                      )
                    }
                  </div>
                </Col>
                <Col xl={2} lg={4} md={4} sm={4}>
                  <div className="flex-auto">
                      <label htmlFor="power" className="font-bold block mb-2 text-sm"><b>Potencia límite en cargadores offline</b></label>
                      <InputNumber inputId="power" suffix=" KW" className="w-100" value={limitPower} onValueChange={(e:any) => setLimitPower(e.value)}  disabled />
                  </div>
                </Col>
                <Col xl={2} lg={2} md={4} sm={4} className="p-4">
                  <UIButton label="Guardar" type="button" className="w-100 p-2" onClick={ (e) => { !edit ? saveChargeGroup() : editChargeGroup() } } />
                </Col>
              </Row>
            </div>
            
            <Row className="p-4">
              <div>
                  <DayPilotCalendar {...config} ref={calendarRef} />
              </div>
            </Row>
            <Row className="pb-2 pt-2">
              <Card>
                <Card.Body>
                  <Table align="center" className="w-100" size="sm">
                    <thead>
                      <tr style={{ textAlign: 'center' }}>
                        <th>Cargador</th>
                        <th>Potencia máxima(kW)</th>
                        {/* <th>Tipo de cargador</th> */}
                        <th>Estatus</th>
                        <th>Respuesta</th>
                        <th>Conexión</th>
                        <th style={{ textAlign: 'center' }}># Conectores</th>
                      </tr>
                    </thead>
                    <tbody>
                      { selectedConnectors && selectedConnectors.length !==0 ? (
                        <>
                          { selectedConnectors.map(( connector: IGroupConnector, j ) =>{
                              return (
                                <tr key={j} style={{ textAlign: 'center' }}>
                                  <th>{connector.cargador}</th>
                                  <th>{connector.potmax}</th>
                                  {/* <th>{connector.tipocargador}</th> */}
                                  <th>{connector.status}</th>
                                  <th>{connector.respuesta}</th>
                                  <th>{connector.conexion}</th>
                                  <th style={{ textAlign: 'center' }}>{ connector.noconectores}</th>
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
                </Card.Body>
              </Card>
            </Row>
            <UIModal size="xl" closeButton={true} show={showAvailableConnectorsModal} title={ 'Conectores Disponibles' } onHide={() => setShowAvailableConnectorsModal(false)}>
              <Row className="p-2">
                <DataTable
                  ref={dt}
                  value={availableConnectors}
                  showGridlines={true}
                  paginator
                  scrollable
                  scrollHeight="350px"
                  rows={5}
                  dataKey={"charge_box_pk"}
                  emptyMessage={'Sin resultados'}
                  columnResizeMode='fit'
                  responsiveLayout="stack"
                  size={'small'}
                  resizableColumns={true} 
                  selectionMode={'checkbox'}
                  selection={selectedConnectors} 
                  onSelectionChange={(e) => setSelectedConnectors(e.value)}
                  rowHover={false}
                >
                  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                  {columns.map((col, i) => (
                    <Column
                      key={col.field}
                      field={col.field}
                      header={col.header}
                      align="center"
                    />
                  ))}
                </DataTable>
              </Row>
              <Row className="p-2">
              <UIButton label={ 'Seleccionar'} onClick={() => { closeModal() }} />
              <UIButton label="Cerrar" type="button" onClick={() => { closeModal() }}/>
              </Row>
            </UIModal>
          </>
        )
      }
    </>
  );
};

export default GridCalendar;

