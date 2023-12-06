import React from "react";
import {DashboardProvider} from "@dashboard/ui/context/DashboardContext";
import {DashboardCrud} from "@dashboard/ui/components/DashboardCrud";

function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardCrud />
    </DashboardProvider>
  );
}

export default DashboardPage;
