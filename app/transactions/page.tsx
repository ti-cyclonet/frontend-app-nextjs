
import React from 'react'
import { TransactionProvider } from '@transactions/ui/context/TransactionContext';
import { TransactionCrud } from '@transactions/ui/components/TransactionCrud';


function TransactionsPage() {

  return (
    <TransactionProvider>
      <TransactionCrud  queryType='full'/>
    </TransactionProvider >
);
}

export default TransactionsPage