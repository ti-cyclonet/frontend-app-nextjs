'use client'
import { Toast } from 'primereact/toast';
import { useRef, useEffect} from 'react';
import { ToastEventManager } from '../../utilities/EventsManager';
import {IToastEvent} from '../../../domain/IToastEvent';

function UIToast() {
    
    const toast = useRef<Toast>(null);
    const subscription$ = ToastEventManager.getSubject();


    const displayToast = (message:IToastEvent):void =>{
        toast.current?.clear();
        toast.current?.show({severity: message.severity, summary: message.summary, detail:message.detail, life: message.life});
    }

    useEffect(()=>{
        subscription$.subscribe(event =>{
            displayToast(event);
        });
    });
    

    return (
        <Toast ref={toast} />
    )
}

export default UIToast