import { ReactNode } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
  
export interface ITabItem {
    title: string;
    eventKey: string;    
    content: () => ReactNode;
}

export type UITabsProps = {
    id: string;
    tabItems: ITabItem[];
}

export const UITabs: React.FC<UITabsProps> = ({ id, tabItems }) => {
    return (
        <>
        {tabItems.length ? (
            <Tabs className="ui-tabs" >
              {tabItems.map((tab, index) => (
                <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title} >
                   {tab.content()}
                </Tab>
              ))}
            </Tabs>
          ) : (
            <div>No hay elementos de pestaña para mostrar.</div>
          )}
        </>
    );
}