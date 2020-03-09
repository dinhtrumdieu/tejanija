import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {CommonColors, Fonts} from '../utils/CommonStyles';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';

const EMPTY = '';

export default class AppText extends Component {
  render() {
    const {style, onPress} = this.props;
    const children =
      this.props.children !== null && this.props.children !== undefined
        ? this.props.children
        : EMPTY;
    return (
      <Text
        {...this.props}
        allowFontScaling={false}
        ellipsizeMode="tail"
        onPress={onPress}
        style={[styles.text, style]}>
        {children}
      </Text>
    );
  }
}

const styles = ScaledSheet.create({
  text: {
    fontSize: '16@ms',
    color: CommonColors.secondaryText,
    ...Fonts.defaultRegular,
  },
});
