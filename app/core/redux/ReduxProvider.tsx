"use client";
import store from "@core/redux/appStore";
import { Provider } from "react-redux";

export interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}