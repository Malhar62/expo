import React from 'react';
import {View,Text,FlatList} from 'react-native';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {getHits} from '../redux/reducer/timer';

export default function DemoScreen(){


	const [list,setList]=React.useState([]);
	const dispatch = useDispatch()
	const {hits,page,loading} =useSelector(state=>state.timer);
	React.useEffect(()=>{
		dispatch(getHits(page))
	},[])
	React.useEffect(()=>{
		const inter=setInterval(async()=>{
		await dispatch(getHits(page));
		},10000)
		return()=>{
			clearInterval(inter)
		}
	},[page])
	async function onEnd(){
		if(!loading){
		console.log('ending...')
		await dispatch(getHits(page));
		}
	}

	return(
<View style={{flex:1,marginTop:10}}>
	<Text>{hits.length}={page-1}</Text>
		<FlatList
		data={hits}
		renderItem={({item,index})=>(
		<View style={{borderWidth:1,margin:10}}>
			<Text>{index}</Text>
			<Text>{item.title}</Text>
		</View>
		)}
		keyExtractor={index=>index.toString()+Math.random()}
		onEndReached={onEnd}
		onEndReachedThreshold={0.1}
		/>
	</View>
		)
}