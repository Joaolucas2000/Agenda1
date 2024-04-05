import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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
            title: event.title,
            start_time: event.start_time,
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

    // Atualizar os eventos do servidor a cada 5 minutos
    const intervalId = setInterval(fetchEventsFromServer, 5 * 60 * 1000);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  const handleAddEvent = () => {
    navigation.navigate('Events');
  };

  const handleDayPress = (day) => {
    const events = markedDates[day.dateString]?.title ? [markedDates[day.dateString]] : [];
    navigation.navigate('DayEvents', { events, selectedDay: day.dateString });
  };

  return (
    <View style={styles.container1}>
      <Calendar
        style={{
          borderWidth: 1,

          borderColor: '#ccc',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        markedDates={markedDates}
        onDayPress={(day) => handleDayPress(day)}
      />
    </View>
  );
};

export default CalendarScreen;