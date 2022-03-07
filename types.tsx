/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  AddPlantModal: undefined;
  PlantDetailScreen: PlantObject;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeScreen: undefined;
  PlantsScreen: undefined;
  AboutMe: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type PlantProps = {
  key: string;
  Object: object;
  handlePress: Function;
}

export type PlantObject = {
  _id: string,
  about: string,
  age: string,
  bought: Date,
  isAlive: boolean,
  last_watered: Date,
  name: string,
  needs_watering: boolean,
  picture: URL,
  user_notes: Array<String>,
  watering_period: 'daily' | 'weekly' | 'monthly',
}