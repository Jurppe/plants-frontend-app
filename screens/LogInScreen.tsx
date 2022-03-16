import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import { StatusBar } from "expo-status-bar";
import { 
  greenColorLight, 
  greenColorNormal, 
  orangeColorLight,
} from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import Logo from '../components/Logo'

type loginProps = {
  signIn: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>
}

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {authContext, state} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo />
      <Text style={styles.infoText}>
        {state?.errorMsg}
      </Text>
      <View style={[styles.inputView, styles.shadowProp]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setUsername(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
 
      <View style={[styles.inputView, styles.shadowProp]}>
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
 
      <TouchableOpacity style={[styles.loginBtn, styles.shadowProp]} onPress={() => authContext?.signIn({username, password})}>
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
    textAlign: 'center',
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
  },

  infoText : {
    color: 'red',
    marginBottom: 15,
    fontWeight: 'bold'
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
