import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../utilities";
import { LocalStorageTypes } from "../../models/localstorage";
import { createSlice } from '@reduxjs/toolkit';

const initialState = getLocalStorage(LocalStorageTypes.AUTHTOKEN) || null;

export const authTokenSlice = createSlice ({
    name: 'authToken',
    initialState,
    reducers: {
        addAuthToken: (state, action) => {
            setLocalStorage(LocalStorageTypes.AUTHTOKEN, action.payload);
            return action.payload;
        },
        removeAuthToken: (state) => {

            removeLocalStorage(LocalStorageTypes.AUTHTOKEN);
      
         
            return null;
          },
        },
      });
      
      export const { addAuthToken, removeAuthToken } = authTokenSlice.actions;
      export default authTokenSlice.reducer;

