import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from './Text';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import InformationIcon from '../../assets/svg/common/information.svg';
import { CommonColors, Fonts } from '../utils/CommonStyles';
import { scale } from '../libs/reactSizeMatter/scalingUtils';
import Close from '../../assets/svg/common/close.svg';
import I18n from '../i18n/i18n';
import {SvgXml} from 'react-native-svg';

export default class ConfirmDialog extends Component {
  render() {
    const { content, onConfirmClick, onRejectClick } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SvgXml xml={InformationIcon} />
          <Text style={styles.message}>{content}</Text>
          <TouchableOpacity
            onPress={onConfirmClick}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>{I18n.t('common.yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRejectClick}
            style={styles.rejectButton}
          >
            <Text style={styles.rejectText}>{I18n.t('common.no')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginBottom: scale(20) }}
          hitSlop={{
            top: 20, bottom: 20, left: 20, right: 20,
          }}
          onPress={onRejectClick}
        >
          <SvgXml xml={Close} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: scale(280),
    minHeight: scale(280),
    alignItems: 'center',
    paddingHorizontal: '30@s',
    paddingTop: '43@s',
    paddingBottom: '39@s',
    borderRadius: scale(3),
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOpacity: 1.0,
    elevation: 1,
    backgroundColor: 'white',
    marginBottom: '20@s',
  },
  confirmButton: {
    height: scale(35),
    width: '100%',
    borderRadius: scale(3),
    backgroundColor: CommonColors.activeTintColor,
    marginBottom: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontSize: '13@ms',
    ...Fonts.defaultBold,
    color: CommonColors.mainText,
    textTransform: 'uppercase',
  },
  rejectButton: {
    height: scale(35),
    width: '100%',
    borderRadius: scale(3),
    borderWidth: 1,
    borderColor: CommonColors.activeTintColor,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    fontSize: '13@ms',
    ...Fonts.defaultBold,
    color: CommonColors.activeTintColor,
    textTransform: 'uppercase',
  },
  message: {
    ...Fonts.defaultRegular,
    fontSize: '14@ms',
    color: '#666666',
    marginTop: '13@s',
    marginBottom: '30@s',
    textAlign: 'center',
  },
});
