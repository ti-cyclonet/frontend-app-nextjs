"use client";
import { Card } from "react-bootstrap";
import GridCalendar from "./ui/components/GridCalendar";
import { ChargeGroupCalendarProvider } from "./ui/context/ChargeGroupCalendarContext";

function ChargeGroup({ params }: any) {

    const { chargegroupId } = params;

    return (
      <ChargeGroupCalendarProvider>
        <Card>
          <Card.Body>
            <GridCalendar chargegroupId={chargegroupId} />
          </Card.Body>
        </Card>
      </ChargeGroupCalendarProvider>
    );
  }
  
  export default ChargeGroup;