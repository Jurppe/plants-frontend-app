import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SpeedDial } from 'react-native-elements';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../assets/styles/SliderEntry.style';
import { SliderPropsTypes } from '../types';
import PlantInfoRow from '../components/PlantInfoRow';
import { colors } from '../constants/Colors';

export default function SliderEntry(props: SliderPropsTypes) {
  function get_image() {
    const { data: { picture }, parallax, parallaxProps, even } = props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: picture.toString() }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: picture.toString() }}
        style={styles.image} 
      />
    );
  }

  function handlePress() {
    setShowDetail(!showDetail)
  }

  function handleShower() {
    console.log('add showering, event:', data.name)
  }

  const { data, even } = props;
  const [showDetail, setShowDetail] = useState(false);
  const [open, setOpen] = React.useState(false);
  const uppercaseTitle = data.name ? (
    <Text
      style={[styles.title, even ? styles.titleEven : {}]}
      numberOfLines={2}
    >
      {data.name.toUpperCase()}
    </Text>
  ) : false;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.slideInnerContainer, styles.shadow]}
      onPress={() => { handlePress() }}
    >

      <View style={styles.shadow} />
      <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
        {get_image()}
        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        <SpeedDial
          isOpen={open}
          icon={{ name: 'settings', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}
          transitionDuration={200}
          color={even ? colors.greenColorNormal : colors.orangeColorNormal}
          overlayColor='transparent'
          style={styles.speedDial}
        >
          <SpeedDial.Action
            icon={{ name: 'shower', color: '#fff', type: 'font-awesome' }}
            title="Water"
            onPress={() => handleShower()}
            color={even ? colors.greenColorNormal : colors.orangeColorNormal}
          />
          <SpeedDial.Action
            icon={{ name: 'edit', color: '#fff' }}
            title="Modify"
            onPress={() => console.log('Delete Something')}
            color={even ? colors.greenColorNormal : colors.orangeColorNormal}
          />
        </SpeedDial>
      </View>
      {showDetail ?
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {data.about}
          </Text>
        </View>
        :
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          <PlantInfoRow data={data} even={even} />
        </View>
      }

    </TouchableOpacity>
  );
} 
