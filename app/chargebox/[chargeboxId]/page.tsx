import ChargeIdCrud from "./ui/components/ChargeIdCrud";
import { ChargeIdProvider } from "./ui/context/ChargeboxIdContext";

const ChargeBoxId = ({ params }: any) => {
  const { chargeboxId } = params;
  
  return (
      <ChargeIdProvider>
        <ChargeIdCrud chargeboxId={chargeboxId}></ChargeIdCrud>
      </ChargeIdProvider>    
  );
};

export default ChargeBoxId;
