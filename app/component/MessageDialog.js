import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from './Text';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import InformationIcon from '../../assets/svg/common/information.svg';
import { CommonColors, Fonts } from '../utils/CommonStyles';
import { scale } from '../libs/reactSizeMatter/scalingUtils';
import Close from '../../assets/svg/common/close.svg';
import I18n from '../i18n/i18n';

export default class MessageDialog extends Component {
  render() {
    const { content, onConfirmClick, onRejectClick } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.message}>{content}</Text>
          <TouchableOpacity
            onPress={onConfirmClick}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>{I18n.t('common.yes')}</Text>
          </TouchableOpacity>
        </View>
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
    minHeight: scale(180),
    alignItems: 'center',
    paddingHorizontal: '30@s',
    paddingTop: '20@s',
    paddingBottom: '20@s',
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
    width: '50%',
    borderRadius: scale(3),
    backgroundColor: CommonColors.activeTintColor,
    marginBottom: scale(10),
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
