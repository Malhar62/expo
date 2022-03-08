import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:'mvp',
  tag:'123'
}

export const extraSlice = createSlice({
  name: 'extra',
  initialState:{
    slots:[],
    loading: false
  },
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {} = extraSlice.actions;

export default extraSlice.reducer;