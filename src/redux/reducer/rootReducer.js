import { combineReducers } from "@reduxjs/toolkit";
import extraSlice  from "./extra";
import parkingSlice from "./parking";
import timerSlice from './timer'

const rootReducer = combineReducers({
	parking: parkingSlice,
	extra : extraSlice,
	timer:timerSlice
})

export default rootReducer;