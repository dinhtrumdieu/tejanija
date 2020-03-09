import React, { Component } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import { CommonColors } from '../utils/CommonStyles';


export default class VccLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 2,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 64,
      color: CommonColors.mainText,
    };
  }

  render() {
    const {
      types, index, color, size,
    } = this.state;
    const type = types[index];
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.1}
        isVisible
        avoidKeyboard
        useNativeDriver
      >
        <View style={styles.container}>
          <Spinner isVisible size={size} type={type} color={color} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
