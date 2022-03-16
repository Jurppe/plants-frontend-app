import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../assets/styles/SliderEntry.style';
import { SliderPropsTypes } from '../types';


export default function SliderEntry(props: SliderPropsTypes) {

  function get_image() {
    const { data: { illustration }, parallax, parallaxProps, even } = props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={{ uri: illustration }}
        style={styles.image}
      />
    );
  }

  function handlePress() {
    setShowDetail(!showDetail)
  }

  const { data: { title, subtitle }, even } = props;
  const [showDetail, setShowDetail] = useState(false);
  
  const uppercaseTitle = title ? (
    <Text
      style={[styles.title, even ? styles.titleEven : {}]}
      numberOfLines={2}
    >
      {title.toUpperCase()}
    </Text>
  ) : false;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.slideInnerContainer, styles.shadow]}
      onPress={() => {handlePress()}}
    >

      <View style={styles.shadow} />
      <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
        {get_image()}
        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
      </View>
      <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
        {uppercaseTitle}
        <Text
          style={[styles.subtitle, even ? styles.subtitleEven : {}]}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
