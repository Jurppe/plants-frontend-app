import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Logo from '../components/Logo';
import HomeScreenInfo from '../components/HomeScreenInfo';
import MyCarousel from '../components/HomeCarousel';
import JSONdata from '../dummydata/myplants-dummy.json';

export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {
  return (
    <View style={styles.container}>
      <Logo />
      <MyCarousel newData={JSONdata} />
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
});
