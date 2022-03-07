import { StyleSheet, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { PlantProps } from '../types';
import { ListItem, ThemeProvider, Icon } from 'react-native-elements'
import useColorScheme from '../hooks/useColorScheme';

export default function PlantCard(props: PlantProps) {
  const Plant = JSON.parse(JSON.stringify(props.Object))
  const [isPressed, setIsPressed] = useState(false);
  let colorScheme = useColorScheme();

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => props.handlePress(Plant)}
      >
      <ThemeProvider useDark={colorScheme === 'dark'}>
        <ListItem containerStyle={isPressed ? styles.isPressed : styles.isNotPressed}
          key={Plant._id} bottomDivider>
          {Plant.isAlive ? <Icon type='font-awesome' name="leaf" color='green' /> : <Icon type='font-awesome' name="leaf" color='#f50' />}
          <ListItem.Content>
            <ListItem.Title>{Plant.name}</ListItem.Title>
            <ListItem.Subtitle>{Plant.isAlive ? "ALIVE" : "DEAD"}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </ThemeProvider>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  isPressed: {
    opacity: 0.5
  },
  isNotPressed: {
    opacity: 1
  },
  card: {

  }
});
