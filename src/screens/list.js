import React from 'react';
import {View,Text,FlatList,Button,Alert}from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
import {setSlots} from '../redux/reducer/parking';
export default function ListScreen({navigation}){


	const data=useSelector(state=>state.parking);
	const dispatch=useDispatch();


	function onremove(item,index){
		var newItem={...item,user:'',isEmpty:true,start:''};
		onExit(item.start,moment().format())
		var dupli=[...data.slots];
		dupli.splice(index,1,newItem);
		dispatch(setSlots(dupli))
		//navigation.goBack()
	}

	function onExit(start,end){
		var diff=moment(end).diff(start,'minutes');
		if(diff==2){
			Alert.alert(`usage is ${diff}hrs and price is $${10}`)
		}else if(diff>2){
			Alert.alert(`usage is ${diff}hrs and price is $${diff*10-10}`)
		}else{
			Alert.alert('usage is ${diff}hrs and its free')
		}
	}		

	return(
		<View>
				<FlatList
				data={data.slots}
				renderItem={({ item, index }) => (
					<View style={{marginTop:19,alignSelf:'center',height:80,borderWidth:1}}>
						<Text>{item.id}</Text>
						<Text>{item.user || ''}</Text>
						{item.end && <Text>{item.end}</Text>}
						{!item.isEmpty&&<Button
							title='remove'
							testID={`removebtn${index+1}`}
							onPress={()=>onremove(item,index)}
							/>}
					</View>
				)}
				keyExtractor={index => index.toString() + Math.random()}
			/>

		</View>
	)
}