import { fireEvent, render ,waitFor} from "@testing-library/react-native";
import * as React from "react";
import { store } from '../src/redux/store';
import HomeScreen from '../src/screens/home';
import { Provider } from 'react-redux';
import {setSlots} from '../src/redux/reducer/parking';
import ListScreen from '../src/screens/list';
const mockData=[
{
	id:0.434,
	user:'GJ33',
	start:'',
	isEmpty:false
},
{
	id:0.43443,
	user:'GJ33',
	start:'',
	isEmpty:true
}]
const allbooked=[
{
	id:0.434,
	user:'GJ33',
	start:'',
	isEmpty:false
},
{
	id:0.43443,
	user:'GJ33',
	start:'',
	isEmpty:false
}]

describe('render home screen', () => {



	test('text input change', async () => {
		
		const { getByPlaceholderText, getByTestId, getByText } = render(
			<Provider store={store}>
				<HomeScreen navigation={undefined} />
			</Provider>
		)
		expect(getByText('Hello')).not.toBeNull()
		expect(getByPlaceholderText('enter number for slots here')).not.toBeNull()
		expect(getByTestId('textinput')).not.toBeNull();
		expect(getByTestId('addslotbtn')).not.toBeNull();
		expect(getByTestId('addcarbtn')).not.toBeNull();
		expect(getByTestId('resetbtn')).not.toBeNull();
		 await waitFor(() => {
            fireEvent.changeText(getByTestId('textinput'), "right");
        })
		 expect(getByTestId('textinput').props.value).toBe('right')
	})


	test('text input change', async () => {
		store.dispatch(setSlots(mockData))
		const { getByPlaceholderText, getByTestId, getByText } = render(
			<Provider store={store}>
				<ListScreen navigation={undefined} />
			</Provider>
		)
		expect(store.getState().parking.slots.length).toBe(2)
		expect(getByTestId('removebtn1')).not.toBeNull();
		fireEvent.press(getByTestId('removebtn1'))
	})
	test('all booked',async()=>{
		store.dispatch(setSlots(allbooked))

		const { getByPlaceholderText, getByTestId, getByText } = render(
			<Provider store={store}>
				<HomeScreen navigation={undefined} />
			</Provider>
		)
		fireEvent.changeText(getByPlaceholderText('enter car number'),'GJWU')
		fireEvent.press(getByTestId('addcarbtn'))
		expect(getByText('all slots booked')).not.toBeNull();
	})
	test('slot num',()=>{
		const { getByPlaceholderText, getByTestId, queryByText } = render(
			<Provider store={store}>
				<HomeScreen navigation={undefined} />
			</Provider>
		)
		fireEvent.changeText(getByPlaceholderText('enter number for slots here'),'22')
		expect(queryByText('enter slots')).toBeNull()
	})
})

