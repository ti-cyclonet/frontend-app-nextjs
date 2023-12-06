'use client'
import { createSlice } from '@reduxjs/toolkit';
import { emptySessionUser, ISessionUser } from '@core/domain/ISessionUser';
import DefaultSessionStoreEntity from '@core/infrastructure/sessionStore/DefaultSessionStoreEntity';
import UserSessionStoreManager from '@core/infrastructure/sessionStore/UserSessionStoreManager';

export const userSessionStoreManagerKey = "UserInfo";
const userSessionStoreManager = new UserSessionStoreManager(userSessionStoreManagerKey, new DefaultSessionStoreEntity('UserInfo', emptySessionUser, new Date()));

const getInitialState = (): ISessionUser => {
    const _userInfo = userSessionStoreManager.getItem(userSessionStoreManagerKey);
    if (_userInfo){
        return _userInfo.entity;
    }
    return emptySessionUser;
};

export const userSlice = createSlice({
    name: 'sessionUser',
    initialState: getInitialState(),
    reducers: {
        setSessionUser: (state, action) => {
            let expiryDate:Date = new Date();
            if (action.payload && action.payload.sessionInfo && action.payload.sessionInfo?.ExpiresIn){
                expiryDate.setSeconds(expiryDate.getSeconds() + action.payload.sessionInfo?.ExpiresIn);
            }
            userSessionStoreManager.setItem(new DefaultSessionStoreEntity('UserInfo', action.payload, expiryDate));
            return action.payload;
        },
        clearSessionUser: () => {
            userSessionStoreManager.clear();
            return emptySessionUser;
        },
    }
})

// Action creators are generated for each case reducer function
export const { setSessionUser, clearSessionUser } = userSlice.actions

export default userSlice.reducer