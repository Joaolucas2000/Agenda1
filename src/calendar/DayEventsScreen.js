import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles';

const DayEventsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { events, selectedDay } = route.params || {};

  const handleAddEvent = () => {
    navigation.navigate('Events', { day: selectedDay }); // Passando o dia como parâmetro de navegação
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos do Dia {selectedDay}</Text>
      {events.length > 0 ? (
        <View style={styles.eventsContainer}>
          {events.map((event, index) => (
            <TouchableOpacity key={`${event.title}-${index}`} style={[styles.eventContainer, { backgroundColor: event.color }]}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventStartTime}>Hora de Início: {event.start_time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noEventsMessage}>Nenhum evento para este dia.</Text>
      )}
      <Button title="Adicionar Evento" onPress={handleAddEvent} />
    </View>
  );
};

export default DayEventsScreen;