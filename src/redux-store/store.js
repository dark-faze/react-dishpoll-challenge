import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import userDataReducer from "../redux/userDataSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  userName: userReducer,
  userData: userDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ reducer: persistedReducer, applyMiddleware });

const Persistor = persistStore(store);

export { Persistor };
export default store;
