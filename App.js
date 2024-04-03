import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login/LoginScreen';
import CalendarScreen from './src/calendar/CalendarScreen';
import EventScreen from './src/events/EventScreen';
import DayEventsScreen from './src/calendar/DayEventsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Events" component={EventScreen} />
        <Stack.Screen name='DayEvents' component={DayEventsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
