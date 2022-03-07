import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useState } from 'react';
import { FAB, FABProps, Input } from 'react-native-elements'

import { Text, View } from '../components/Themed';

const InputComponent = (props: any) => {
  return (
    <View>
      <Text>Test</Text>
      <Input
        label= {props.tile}
        placeholder='test 1'
        leftIcon={{ type: 'font-awesome', name: props.icon }}
      />
    </View>
  )
}

export default function ModalScreen() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <InputComponent icon="leaf" title="Title 1" handleChange={() => console.log("eka 1")} />
        <FAB
          visible={visible}
          onPress={() => setVisible(!visible)}
          placement="right"
          title="Add Plant"
          icon={{ name: 'add', color: 'white' }}
          color="green"
          style={styles.button}
        />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    margin: 20
  }
});
