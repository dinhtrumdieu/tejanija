import React, {Component} from 'react';
import {View, Text} from 'react-native';
import I18n from '../i18n/i18n';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors, Fonts} from '../utils/CommonStyles';

export default class LabelComponent extends Component {
  render() {
    const {focused, title} = this.props;
    return (
      <Text
        allowFontScaling={false}
        style={{
          color: focused
            ? CommonColors.activeTabColor
            : CommonColors.inActiveTabColor,
          fontSize: moderateScale(13),
          ...Fonts.defaultRegular,
          textAlign: 'center',
          marginBottom: scale(5),
        }}>
        {title}
      </Text>
    );
  }
}
