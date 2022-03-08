import React from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSlots } from '../redux/reducer/parking';
import { store } from '../redux/store'
import moment from 'moment';

export default function HomeScreen({navigation}) {


	const [number, setNumber] = React.useState('');
	const [name, setName] = React.useState('');

	const data = useSelector(state=>state.parking)
	const exyta=useSelector(state=>state.extra);
	const dispatch = useDispatch()
	function addSlots() {
		if(parseInt(number)){
			var array=[]
			for(var i=0;i<number;i++){
				array.push({
					id: Math.random(),
					start:'',
					isEmpty:true,
					user:''
				})
			}
			dispatch(setSlots(array))
			setNumber('')
			setName('')
		}else{
			alert('enter number')
		}
	}

	function resetSlots() {
		dispatch(setSlots([]))
		setNumber('');
		setName('')
	}
	
	function checkingTillGetRandom(index){
		if(data.slots[index].isEmpty){
			return true;
		}else{
			return false;
		}
	}

	const [msg,setMsg]=React.useState('')
	async function addCar(){
		var remain=data.slots.filter(x=>x.isEmpty);
		if(remain.length>0){
		var items= data.slots;
		var ind = Math.floor(Math.random()*items.length);
		var checker=checkingTillGetRandom(ind);
		if(checker){
		var dupli=[...data.slots];
		let obj={
			...dupli[ind],
			start:moment().format(),
			user:name,
			isEmpty:false
		}
		dupli.splice(ind,1,obj)
		await dispatch(setSlots(dupli))
		setNumber('');
		setName('')
		navigation.navigate('list')
		setMsg('')
		}else{
		addCar()
		}
	}else{
		setMsg('all slots booked');
		}
	}
	
	return (
		<View>
		<Text>Hello</Text>
		<Text>{number==''&& 'enter slots'}</Text>
		<Text>{msg}</Text>
			<View>
				<TextInput
					value={number}
					onChangeText={data => setNumber(data)}
					style={{ height: 50, margin: 10, padding: 10, borderWidth: 1 }}
					placeholder='enter number for slots here'
					keyboardType="numeric"
					testID='textinput'
				/>
			</View>
			<View>
				<Button
					title='add slots'
					onPress={addSlots}
					disabled={number==''}
					testID='addslotbtn'
				/>
			</View>
			<View>
				<Button
					title='reset slots'
					onPress={resetSlots}
					testID='resetbtn'
				/>
			</View>
			<TextInput
					value={name}
					onChangeText={data => setName(data)}
					style={{ height: 50, margin: 10, padding: 10, borderWidth: 1 }}
					placeholder='enter car number'
				/>
				<Button
					title='add car'
					onPress={addCar}
					disabled={name==''}
					testID='addcarbtn'
				/>
		</View>
	)
}