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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Events" component={EventScreen} options={{ headerShown: false }} />
        <Stack.Screen name='DayEvents' component={DayEventsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}