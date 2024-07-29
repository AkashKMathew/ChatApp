import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import convReducer from "./slices/conv";

//slices

const rootPersistConfig = {
    key:'root',
    storage,
    keyPrefix:'redux-',

}

const rootReducer = combineReducers({
    app: appReducer, 
    auth: authReducer,
    conv: convReducer,
});

export {rootPersistConfig, rootReducer};