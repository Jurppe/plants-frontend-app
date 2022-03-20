import * as React from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import styles from '../assets/styles/index.style';
import { PlantObject } from '../types';


export default function MyCarousel({ newData }: any) {
  const [activeIndex, setactiveIndex] = React.useState(0)

  function _renderItem({ item, index }: {item: PlantObject, index: number}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
        <Carousel
          layout={"default"}
          layoutCardOffset={20}
          data={newData}
          sliderWidth={300}
          itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={index => setactiveIndex(index)}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </View>
    </SafeAreaView>
  );
}

