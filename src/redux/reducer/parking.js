import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  slots:[],
  loading: false
}

export const parkingSlice = createSlice({
  name: 'parking',
  initialState:{
    slots:[],
    loading: false
  },
  reducers: {
    setSlots(state,action){
      state.slots=action.payload;
    },
    setLoading(state,action){
      state.loading=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setSlots} = parkingSlice.actions;

export default parkingSlice.reducer;