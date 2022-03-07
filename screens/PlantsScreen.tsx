import { ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import PlantCard from '../components/PlantCard';
import { Text, View } from '../components/Themed';
import JSONdata from '../dummydata/myplants-dummy.json';
import { PlantObject, RootTabScreenProps } from '../types';


export default function PlantsScreen({ navigation }: RootTabScreenProps<'PlantsScreen'>) {
  function handlePress(Plant: PlantObject) {
    navigation.navigate('PlantDetailScreen', Plant);
  }

  return (
    <View style={styles.container}>  
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.scrollContainer}>
            {JSONdata.map(obj => {
              return <PlantCard key={obj._id} Object={obj} handlePress={handlePress}/>
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 5,
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'stretch',
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
