import { IToastEvent } from "@core/domain/IToastEvent";
import { RXJSDefaultEventManager } from "../../utilities/RXJSDefaultEventManager";

export const ToastEventManager = new RXJSDefaultEventManager<IToastEvent>();
export const SideBarEventManager = new RXJSDefaultEventManager<boolean>();