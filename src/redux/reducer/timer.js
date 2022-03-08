import {createSlice} from '@reduxjs/toolkit';
import {callApi} from '../../services/api';
import {store} from '../store'
export const timerSlice=createSlice({
	name:'timer',
	initialState:{
		hits:[],
		page:1,
		loading:false
	},
reducers: {
    setHits(state,action){
    	var merge=[...state.hits,...action.payload];
      	state.hits= merge
      	state.page= state.page+1;
      	state.loading=false;
    },
    setLoad(state,action){
    	state.loading=true;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setHits,setLoad} = timerSlice.actions;

export default timerSlice.reducer;

export const getHits=(page)=>async (dispatch)=>{
	try{
		dispatch(setLoad())
		console.log('page: ',page)
		const result= await callApi(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
		dispatch(setHits(result.hits))
	}catch(e){

	}
}