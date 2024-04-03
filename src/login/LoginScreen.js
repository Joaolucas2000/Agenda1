import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Implement your login logic here
    // For demonstration, let's assume successful login
    if (rememberMe) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    }
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Remember Me</Text>
        <Button onPress={() => setRememberMe(!rememberMe)} title={rememberMe ? 'On' : 'Off'} />
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;