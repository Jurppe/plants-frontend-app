import { View } from "react-native";
import { Icon } from "react-native-elements";
import { greenColorNormal, orangeColorLight } from "../constants/Colors";
import { StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function Logo() {
  return(
    <View style={styles.container}>
      <Icon
          containerStyle={[styles.image]}
          name='leaf'
          type='font-awesome'
          size={70}
          color={greenColorNormal}
          backgroundColor={orangeColorLight}
          borderRadius={100}
          iconStyle={styles.shadowProp}
        />
        <Text style={styles.title}>Pläntit</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    padding: 15,
    height: 'auto',
    width: 'auto'
  },
  title: {
    color: greenColorNormal,
    fontWeight: '900',
    fontSize: 40,
    letterSpacing: 1,
    fontVariant: ['small-caps'],
    textAlign: 'center',
    textShadowColor: orangeColorLight,
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 5,
    textAlignVertical: 'center',
    padding: 10
  },
})