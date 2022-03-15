import { View } from "react-native";
import { Icon } from "react-native-elements";
import { greenColorNormal, orangeColorLight } from "../constants/Colors";
import { StyleSheet } from "react-native";

export default function Logo() {
  return(
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
  )
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    marginBottom: 20,
    padding: 10
  },
})