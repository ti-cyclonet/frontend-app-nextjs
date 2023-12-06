import { IChargeboxResetMsg } from '@ocppserver/domain/IChargeboxResetMsg'
import { IRemoteStopTrxMsg } from './IRemoteStopTrxMsg';
import { IRemoteStartTrxMsg } from './IRemoteStartTrxMsg';


export interface OCPPServerClient  {

    doReset(msg: IChargeboxResetMsg): Promise<boolean>;
    doRemoteStopTrx(msg: IRemoteStopTrxMsg): Promise<boolean>;
    doRemoteStartTrx(msg: IRemoteStartTrxMsg): Promise<boolean>;
    
}