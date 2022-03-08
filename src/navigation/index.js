import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import ListScreen from '../screens/list';
import DemoScreen from '../screens/demo';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='demo' component={DemoScreen}/>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name='list' component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;