import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import { verticalScale } from '../libs/reactSizeMatter/scalingUtils';
import EmptyIcon from '../../assets/svg/no_result.svg';
import { CommonColors, Fonts } from '../utils/CommonStyles';
import I18n from '../i18n/i18n';
import {SvgXml} from 'react-native-svg';

export default class EmptyView extends Component {
  render() {
    const { style, message } = this.props;
    return (
      <View style={[{
        marginTop: verticalScale(100), alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
      }, style]}
      >
        <SvgXml xml={EmptyIcon} />
        <Text
          allowFontScaling={false}
          style={styles.noResultLabel}
        >
          {message || 'Không có dữ liệu'}
        </Text>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  noResultLabel: {
    fontSize: '14@ms',
    color: CommonColors.disableText,
    marginTop: '10@s',
    ...Fonts.defaultRegular,
  },
});
