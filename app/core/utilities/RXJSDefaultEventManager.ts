import { Observable, Subject } from 'rxjs';
import { IEventManager } from '@core/domain/IEventManager';

export class RXJSDefaultEventManager<T> implements IEventManager<T,Observable<T>>{
    private subject$ = new Subject();
    
    getSubject = ():Observable<T> =>{
        return this.subject$.asObservable() as Observable<T>;
    }

    setSubject = (value:T):void =>{
        this.subject$.next(value);
    }
}
