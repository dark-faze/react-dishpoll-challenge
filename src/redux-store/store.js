import { configureStore , combineReducers} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import userDataReducer from "../redux/userDataSlice"

export const rootReducer = combineReducers({
  userName : userReducer,
  userData : userDataReducer
})

const store = configureStore({
  reducer: rootReducer,
})
export default store;