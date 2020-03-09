import React from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import Text from '../../component/Text';

const {width, height} = Dimensions.get('window');

export default function AudioPlayerScreen() {
  console.warn(height);
  return (
    <ImageBackground
      resizeMode={'cover'}
      style={{width, height}}
      source={require('../../../assets/images/audio_player_bg.png')}
    />
  );
}

const styles = StyleSheet.create({});
