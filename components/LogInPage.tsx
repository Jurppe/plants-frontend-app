import {
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { PlantProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from './Themed';
import { StatusBar } from "expo-status-bar";
import { Icon } from 'react-native-elements';
import { 
  greenColorLight, 
  greenColorNormal, 
  greenColorDark, 
  orangeColorDark,
  orangeColorLight,
  orangeColorNormal,
} from '../constants/Colors';

async function loginUser(credentials: {username: string, password: string}) {
  return fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(error => console.log(error))
}

export default function LogInPage({ setToken }): any {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const token = await loginUser({
      username,
      password
    });

    setToken(token); 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plants</Text>
      <Icon
        containerStyle={styles.image}
        name='leaf'
        type='font-awesome'
        size={70}
        color={greenColorNormal}
        backgroundColor={orangeColorLight}
        borderRadius={100}
      />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: greenColorLight,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: greenColorNormal,
  },

  loginText: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  title: {
    marginBottom: 40,
    color: greenColorNormal,
    fontWeight: '800',
    fontSize: 40,
    letterSpacing: 5,
    fontVariant: ['small-caps'],
    textAlign: 'center',
    textShadowColor: orangeColorLight,
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 5
  }
});
