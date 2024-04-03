import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [markedDates, setMarkedDates] = useState({});

  const fetchEventsFromServer = async () => {
    try {
      const response = await fetch('http://localhost:6060/get_events');
      if (response.ok) {
        const eventsData = await response.json();
        const updatedMarkedDates = {};
        eventsData.forEach((event) => {
          updatedMarkedDates[event.day] = {
            marked: true,
            dotColor: event.color,
            selected: true,
            selectedColor: event.color,
            title: event.title, // Adicionando o título do evento ao objeto markedDates
          };
        });
        setMarkedDates(updatedMarkedDates);
      } else {
        console.error('Failed to fetch events from server');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEventsFromServer();
  }, []);

  const handleAddEvent = () => {
    navigation.navigate('Events');
  };

  const handleDayPress = (day) => {
    const events = markedDates[day.dateString]?.title ? [markedDates[day.dateString]] : [];
    navigation.navigate('DayEvents', { events, selectedDay: day.dateString });
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar Evento" onPress={handleAddEvent} />
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => handleDayPress(day)}
      />
    </View>
  );
};

export default CalendarScreen;
