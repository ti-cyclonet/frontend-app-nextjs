'use client'
import { ISessionUser } from '@core/domain/ISessionUser';
import { configureStore } from '@reduxjs/toolkit';
/*import { IConfirmationDialog } from '../domain/IConfirmationDialog';
import { confirmationDialogSlice } from './states/confirmationDialogState';*/
import { userSlice } from './states/userState';

export interface AppStore{
    sessionUser: ISessionUser;
    /*confirmationDialog: IConfirmationDialog*/
}

export default configureStore<AppStore>({
    reducer: {
        sessionUser: userSlice.reducer,
        /*confirmationDialog: confirmationDialogSlice.reducer,*/
    },
  })