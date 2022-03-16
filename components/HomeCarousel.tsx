import * as React from 'react';
import {
  StyleSheet,
  Text, 
  View,
  SafeAreaView } from 'react-native';
import { greenColorLight, orangeColorLight } from '../constants/Colors';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import styles from '../assets/styles/index.style'
import { scrollInterpolators, animatedStyles } from '../assets/animations/animations';


export default class MyCarousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              subtitle: "Text 1",
              illustration: 'https://i.imgur.com/UYiroysl.jpg'
          },
          {
              title:"Item 2",
              subtitle: "Text 2",
              illustration: 'https://i.imgur.com/UYiroysl.jpg'
          },
          {
              title:"Item 3",
              subtitle: "Text 3",
              illustration: 'https://i.imgur.com/UYiroysl.jpg'
          },
          {
              title:"Item 4",
              subtitle: "Text 4",
              illustration: 'https://i.imgur.com/UYiroysl.jpg'
          },
          {
              title:"Item 5",
              subtitle: "Text 5",
              illustration: 'https://i.imgur.com/UYiroysl.jpg'
          },
        ]
      }
    }

    _renderItem({item, index}) {
      return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

    render() {
        return (
          <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  layoutCardOffset={20}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } 
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  />
            </View>
          </SafeAreaView>
        );
    }
}

