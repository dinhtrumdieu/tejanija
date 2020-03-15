
import {StyleSheet, TouchableOpacity, View, Image, Alert, TouchableWithoutFeedback} from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import {moderateScale, scale} from '../../../libs/reactSizeMatter/scalingUtils';
import Text from '../../../component/Text';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import DetailIcon from '../../../../assets/svg/Detail-icon.svg';
import {
  CommonColors,
  CommonStyles,
  Fonts,
  ShadowStyle,
} from '../../../utils/CommonStyles';
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet'
import I18n from '../../../i18n/i18n';

export default class ActionSheetItem extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render() {
    const {deleteAllItem, markAllRead} = this.props
    return (
      <View>
        <TouchableOpacity
            onPress={this.showActionSheet}
            style={{height: scale(22), width: scale(22)}}>
            <SvgXml xml={DetailIcon} />
        </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
        //   title={'Which one do you like ?'}
          options={['Mark all as read', 'Delete all', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            if (index == 0) {
                markAllRead()
            }
            if (index == 1) {
                deleteAllItem()
            } else {
                console.warn("Pressed Cancel")
            }
          }}
        />
      </View>
    )
  }
}