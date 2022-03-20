import { ScrollView, StyleSheet, Image } from 'react-native';
import { Icon, Tooltip, colors, ListItem, Button, Divider } from 'react-native-elements';
import { useState } from 'react';

import { RootStackScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import { DateDiff, WateringFunctions } from '../components/Functions';

const Header = (props: any) => {
  const {wateringIcon, wateringIconColor} = WateringFunctions.wateringStatusToString(props.daysTillNextWatering);
  
  return(
    <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <View style={styles.headerItem}>
        <Text style={styles.headerName}>{props.name}</Text>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text style={styles.headerSubject}>Age</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerSubject}>Status</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerSubject}>Watering</Text>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text style={styles.headerAge}>
            {props.age}
          </Text>
          <Text>
            {props.ageUnit}
          </Text>
        </View>
        <View style={styles.headerItem}>
          <View>
            <Tooltip
              popover={props.status ? <Text>Alive</Text> : <Text>Dead x_x</Text>}
              withPointer={true}
              backgroundColor={colors.primary}>
              {props.status
                ? <Icon name='leaf' type='font-awesome' color='green' />
                : <Icon name='leaf' type='font-awesome' color='red' />}
            </Tooltip>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Tooltip
            popover={props.status ? <Text>Im good</Text> : <Text>I need some water</Text>}
            withPointer={true}
            backgroundColor={colors.primary}>
            {<Icon name={wateringIcon} type='font-awesome' color={wateringIconColor} />}
          </Tooltip>
        </View>
      </View>
    </View>
  )
}

const Content = (props: any) => {
  return(
    <View style={styles.content}>
      <InformationContent about={props.about} />
      <Divider
            inset={false}
            subHeaderStyle={{ color: colors.primary }}
          />
      <FunctionalContent lastWateredSinceDays={props.lastWateredSinceDays}/>
    </View>
  )
}

const FunctionalContent = (props: any) => {
  const [expanded, setExpanded] = useState(false);

  return(
    <View style={styles.content}>
      <ListItem.Swipeable 
        bottomDivider
        leftContent={
          <Button
            title="Water"
            buttonStyle={{ minHeight: '100%' }}
          />
        }>
        <Icon name='arrow-circle-o-right' type='font-awesome' color='green'/>
        <ListItem.Content>
          <ListItem.Title>Swipe Right to water the plant</ListItem.Title>
          <ListItem.Subtitle>Last watered: {props.lastWateredSinceDays} days ago</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
      
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>User Notes</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
        bottomDivider
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Mika Järvenpää</ListItem.Title>
            <ListItem.Subtitle>Oli kuollut, lisäsin vettä</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Icon name='plus-circle' type='font-awesome' color='green'/>
          <ListItem.Content>
            <ListItem.Title>Add Note</ListItem.Title>
          </ListItem.Content>
          <ListItem.Input placeholder="Type here" />
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
    </View>
  )
}

const InformationContent = (props: any) => {
  return(
    <View>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>About</ListItem.Title>
          <ListItem.Subtitle>{props.about}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  )
}

const Footer = (props: any) => {
  return(
    <View style={styles.footer}>

    </View>
  )
}

export default function PlantDetailScreen({ route }: RootStackScreenProps<'PlantDetailScreen'>) {
  const {
    _id, 
    about, 
    age, // probably data which is not available from real backend :O) use the bought timestamp instead
    bought, 
    isAlive, 
    last_watered, 
    name, 
    needs_watering, 
    picture, 
    user_notes, 
    watering_period
  } = route.params;

  // Maps watering period from string to Number
  const mapWateringPeriod = {
    daily: 1,
    weekly: 7,
    monthly: 31,
    twiceWeek: 3,
    twiceMonth: 15
  }

  const dateNow = new Date();
  const lastWateredDate = new Date(last_watered);
  const daysTillNextWatering = mapWateringPeriod[watering_period] - Math.floor((dateNow.getTime() - lastWateredDate.getTime()) / (1000 * 60 * 60 * 24));
  const {ageUnit, ageValue} = DateDiff.autoUnit(new Date(bought), dateNow);
  const lastWateredSinceDays = DateDiff.inDays(lastWateredDate, dateNow);

  return (
    <View style={styles.container}>
      <Header name={name} age={ageValue} ageUnit={ageUnit} status={isAlive} daysTillNextWatering={daysTillNextWatering}/>
      <Content about={about} lastWateredSinceDays={lastWateredSinceDays}/>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  headerSubject: {
    textAlign: 'center',
  },
  headerName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerAge: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  content: {
    flex: 3,
  },
  footer: {
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 101,
    borderRadius: 100,
  }
});
