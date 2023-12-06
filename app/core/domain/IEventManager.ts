
export interface IEventManager<T,O> {
    getSubject():O;
    setSubject(value:T):void;
}