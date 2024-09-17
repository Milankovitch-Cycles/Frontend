import {configureStore} from '@reduxjs/toolkit'
import { authTokenSlice } from './states/authToken';



const store = configureStore({
    reducer: {
        authToken: authTokenSlice.reducer
    }
});

export default store;