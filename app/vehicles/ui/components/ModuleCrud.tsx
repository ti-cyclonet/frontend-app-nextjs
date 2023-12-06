import { ModuleList } from "@vehicles/ui/components/ModuleList";
import { ModuleForm } from "@vehicles/ui/components/ModuleForm";

//theme
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";


export type ModuleCrudProps = {
  setShowModal?: (show: boolean) => void;
};

const ModuleCrud: React.FC<ModuleCrudProps> = ({ setShowModal }) => {  

  return (
    <>
      <div className="d-grid gap-3">
        <ModuleForm setShowModal={setShowModal}/>
        <ModuleList />
      </div>
    </>
  );
};

export default ModuleCrud;