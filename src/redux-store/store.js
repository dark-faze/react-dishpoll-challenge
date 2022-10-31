import { configureStore , combineReducers} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

export const rootReducer = combineReducers({
  userName : userReducer
})

const store = configureStore({
  reducer: rootReducer,
})
export default store;