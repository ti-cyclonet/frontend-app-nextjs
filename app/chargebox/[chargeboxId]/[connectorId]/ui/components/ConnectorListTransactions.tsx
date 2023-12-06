import { UIInput } from "@/app/core/infrastructure/ui/components";
import { UIDataTableFilter } from "@/app/core/infrastructure/ui/components/UIDataTableFilter";
import { TransactionManagement } from "@/app/transactions/application/transactionManagement";
import { ITransaction } from "@/app/transactions/domain/ITransaction";
import { TransactionService } from "@/app/transactions/infrastructure/transaction.service";
import React, { useEffect, useState } from "react";
import RoundChart from "./ConnectorChart";

export type ConnectorProps = {
  connectorPk: string;
};

const ConnectorListTransactions: React.FC<ConnectorProps> = ({
  connectorPk,
}) => {
  //console.log(connectorPk, "dsjdsd");

  const manager = new TransactionManagement(new TransactionService());
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const columns = [
    { field: "id", header: "Id" },
    { field: "idTag", header: "idTag" },
    { field: "startEventTimestamp", header: "startEventTimestamp" },
    { field: "startTimestamp", header: "startTimestamp" },
    { field: "startValue", header: "startValue" },
    { field: "stopEventActor", header: "stopEventActor" },
    { field: "stopEventTimestamp", header: "stopEventTimestamp" },
    { field: "stopTimestamp", header: "stopTimestamp" },
    { field: "stopValue", header: "stopValue" },
    { field: "stopReason", header: "stopReason" },
  ];

  const getTransactionByConnector = (date: any) => {
    (async () => {
      const resp = await manager.getTransactionByConnectorByDate(
        connectorPk,
        date
      );
      if (resp.transaction) {
        setTransactions(resp.transaction);
      }
    })();
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    getTransactionByConnector(today);
  }, []);

  const handleChange = (event: any) => {
    const { value } = event.target;
    getTransactionByConnector(value);
  };

  const documentStyle = getComputedStyle(document.documentElement);

  return (
    <div>
      <br />
      <UIInput
        required
        label="Fecha: "
        name="transactionDate"
        type="date"
        onChange={handleChange}
      />
      <br />

      {transactions && transactions.length > 0 ? (
        <>
          <RoundChart label={["A", "B", "C"]} dataValue={[540, 325, 702]} backgroundColor={[
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ]} hoverBackgroundColor={[
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ]}></RoundChart>
          <UIDataTableFilter
            columns={columns}
            items={transactions}
            paginacion={10}
            dataKey="id"
            filterDisplay="row"
            msg="No found"
            filterPlaceholder="Search"
            minW="12rem"
            tableSize="normal"
          ></UIDataTableFilter>
        </>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
};

export default ConnectorListTransactions;
