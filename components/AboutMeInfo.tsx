import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function AboutMeInfo() {
  return (
    <View style={{ backgroundColor: 'red'}}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  myPic: {
      resizeMode: 'center'
  }
});
