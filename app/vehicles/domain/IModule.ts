export interface IModule {
    id?: string;
    module_sn: string;
    status?: string;
  }
  
  export const emptyModule: IModule = {
    module_sn: "",
    status: "Active",
  };
