"use client";
import "../chargeperfil/ui/styles/grid.css";
import { Card, Row } from "react-bootstrap";
import { ChargePerfilProvider } from "./ui/context/ChargeperfilContext";
import ListFunctionalUnit from "./ui/components/ListFunctionalUnit";

function ChargePerfil() {
  return (
    <ChargePerfilProvider>
      <Card className="w-100 card-min-content">
        <Card.Body>
          <ListFunctionalUnit />
        </Card.Body>
      </Card>
    </ChargePerfilProvider>
  );
}

export default ChargePerfil;
