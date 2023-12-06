import { UIDataTableFilter } from "@core/infrastructure/ui/components/UIDataTableFilter";
import { useContext } from "react";
import { ChargeContext, ChargeContextType } from "@chargebox/ui/context/ChargeboxContext";
import { IChargeBox } from "@chargebox/domain/IChargebox";
import { useRouter } from "next/navigation";
import { TablePlaceholder } from "@core/ui/layout/components/TablePlaceholder";

const ChargeList = () => {
  const router = useRouter();

  const { chargers, setCurrent } = useContext(ChargeContext) as ChargeContextType;

  const columns = [
    { field: "charge_box_id", header: "Charge_box_id" },
    { field: "endpoint_address", header: "Endpoint_address" },
    { field: "ocpp_protocol", header: "Ocpp_protocol" },
    { field: "registration_status", header: "Registration_status" },
    { field: "diagnostics_status", header: "Diagnostics_status" },
  ];

  const handleSelect = (Charger: IChargeBox) => {
    setCurrent(Charger);
    router.push(`chargebox/${Charger.charge_box_id}`);
  };

  return (
    <div>
      {chargers ? (
        <>
          {chargers.length > 0 ? (
            <>
              <UIDataTableFilter
                columns={columns}
                items={chargers}
                hasActions={true}
                handleSelect={handleSelect}
                paginacion={15}
                dataKey="id"
                filterDisplay="menu"
                msg="No found"
                filterPlaceholder="Search"
                minW="12rem"
                tableSize="small"
              ></UIDataTableFilter>

            </>
          ) : (
            <>
              No data found!
            </>
          )}
        </>
      ) : (
        <TablePlaceholder cols={6} rows={8} />
      )}
    </div>
  );
};

export default ChargeList;
