import React, { useState } from 'react';
import { View, TextInput, Button, Picker, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const EventScreen = () => {
  const navigation = useNavigation();
  const [eventDayValue, setEventDayValue] = useState('');
  const [eventMonthValue, setEventMonthValue] = useState('');
  const [eventYearValue, setEventYearValue] = useState('');
  const [repeatType, setRepeatType] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventColor, setEventColor] = useState('#00FF00');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDuration, setEventDuration] = useState('');

  const handleColorChange = (color) => {
    setEventColor(color);
  };

  const handleAddEvent = async () => {
    const day = eventYearValue + '-' + eventMonthValue + '-' + eventDayValue;
    const eventData = {
      day,
      repeatType,
      startTime: eventStartTime,
      endTime: eventEndTime,
      duration: calculateDuration(eventStartTime, eventEndTime),
      color: eventColor,
      title: eventTitle,
    };

    try {
      const response = await fetch('http://localhost:6060/add_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        navigation.navigate('Calendar');
        alert('Event added successfully');
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event');
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);

    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = endHour * 60 + endMinute;

    const durationMinutes = totalEndMinutes - totalStartMinutes;

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours} horas e ${minutes} minutos`;
  };

  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hours = Math.floor(index / 2);
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Dia:</Text>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Dia"
          onChangeText={setEventDayValue}
          value={eventDayValue}
        />
        <Text style={styles.inputLabel}>Mês:</Text>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Mês"
          onChangeText={setEventMonthValue}
          value={eventMonthValue}
        />
        <Text style={styles.inputLabel}>Ano:</Text>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Ano"
          onChangeText={setEventYearValue}
          value={eventYearValue}
        />
      </View>
      <Text style={styles.inputLabel}>Tipo de Repetição:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de Repetição"
        onChangeText={setRepeatType}
        value={repeatType}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hora de Início:</Text>
        <Picker
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          selectedValue={eventStartTime}
          onValueChange={(value) => setEventStartTime(value)}
        >
          {timeOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Text style={styles.inputLabel}>Hora de Término:</Text>
        <Picker
          style={[styles.input, { flex: 1 }]}
          selectedValue={eventEndTime}
          onValueChange={(value) => setEventEndTime(value)}
        >
          {timeOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.inputLabel}>Duração do Evento:</Text>
      <Text>{calculateDuration(eventStartTime, eventEndTime)}</Text>
      <Text style={styles.inputLabel}>Título do Evento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do Evento"
        onChangeText={setEventTitle}
        value={eventTitle}
      />
      <Text style={styles.inputLabel}>Cor do Evento:</Text>
      <Picker
        selectedValue={eventColor}
        style={styles.input}
        onValueChange={handleColorChange}
      >
        <Picker.Item label="Vermelho" value="#FF0000" />
        <Picker.Item label="Amarelo" value="#FFFF00" />
        <Picker.Item label="Verde" value="#00FF00" />
      </Picker>
      <Button title="Adicionar Evento" onPress={handleAddEvent} />
    </View>
  );
};

export default EventScreen;
