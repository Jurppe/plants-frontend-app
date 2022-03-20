import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DateDiff, WateringFunctions } from '../components/Functions';
import { PlantObject } from '../types';

export default function PlantInfoRow({ data, even }: { data: PlantObject, even: boolean | undefined }) {
  const mapWateringPeriod = {
    daily: 1,
    weekly: 7,
    monthly: 31,
    twiceWeek: 3,
    twiceMonth: 15
  }

  const dateNow = new Date();
  const lastWateredDate = new Date(data.last_watered);
  const daysTillNextWatering = mapWateringPeriod[data.watering_period] - Math.floor((dateNow.getTime() - lastWateredDate.getTime()) / (1000 * 60 * 60 * 24));
  const {ageUnit, ageValue} = DateDiff.autoUnit(new Date(data.bought), dateNow);
  const lastWateredSinceDays = DateDiff.inDays(lastWateredDate, dateNow);
  const {wateringIcon, wateringIconColor} = WateringFunctions.wateringStatusToString(daysTillNextWatering);
  const {statusIcon, statusColor} = WateringFunctions.overallStatusToString(data.isAlive, daysTillNextWatering);

  return(
    <>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={[styles.age, even ? styles.evenFont : {}]}>{ageValue}</Text>
          <Text style={[styles.ageUnit, even ? styles.evenFont : {}]}>{ageUnit}</Text>
        </View>
        <View style={styles.item}>
          <Icon name={statusIcon} type='font-awesome' color={statusColor} size={30} />
        </View>
        <View style={styles.item}>
          <Icon name={wateringIcon} type='font-awesome' color={wateringIconColor} size={30} />
        </View>
      </View>
      <View style={[styles.container, { marginTop: 10 }]}>
        <View style={styles.item}>
          <Text style={[styles.title, even ? styles.evenFont : {}]}>Age</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.title, even ? styles.evenFont : {}]}>Status</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.title, even ? styles.evenFont : {}]}>Watering</Text>
        </View>
      </View>
    </>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent'
  },
  item: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'transparent'
  },
  title: {
    textAlign: 'center',
    padding: 0,
    fontWeight: 'bold',
  },
  age: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  ageUnit: {
    textAlign: 'center',
    fontSize: 12,
  },
  evenFont: {
    color: 'black'
  }
})