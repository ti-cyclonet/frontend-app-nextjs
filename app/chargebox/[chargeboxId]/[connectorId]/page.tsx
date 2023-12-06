import { ConnectorIdProvider } from "@chargebox/[chargeboxId]/[connectorId]/ui/context/ConnectorIdContext";
import { ConnectorIdCrud } from '@chargebox/[chargeboxId]/[connectorId]/ui/components/ConnectorIdCrud';


export type ConnectorIdPageProps  = {
  params: any
}

function ConnectorIdPage({ params}:ConnectorIdPageProps) {

  const { chargeboxId, connectorId } = params;

  return (
    <>    
    <ConnectorIdProvider>      
      <ConnectorIdCrud connectorId={connectorId} chargeboxId={chargeboxId}/>
    </ConnectorIdProvider >
    </>
);
}

export default ConnectorIdPage