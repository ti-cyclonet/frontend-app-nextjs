
import React from 'react'
import { ErrorProvider } from '@errors/ui/context/ErrorContext';
import { ErrorCrud } from '@errors/ui/components/ErrorCrud';


function ErrorsPage() {

  return (
    <ErrorProvider>
      <ErrorCrud  queryType='full'/>
    </ErrorProvider >
);
}

export default ErrorsPage