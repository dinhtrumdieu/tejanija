import Swipeable from 'react-native-swipeable';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from '../../../libs/reactSizeMatter/scalingUtils';
import Text from '../../../component/Text';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import DeleteIcon from '../../../../assets/svg/delete_icon.svg';
import {CommonStyles, ShadowStyle} from '../../../utils/CommonStyles';
import I18n from '../../../i18n/i18n';

export default class LikeItem extends React.Component {
  close = () => {
    if (this.swipe) {
      this.swipe.recenter();
    }
  };

  onClickDelete = () => {
    Alert.alert(
      I18n.t('app.delete_alert'),
      I18n.t('app.delete_message'),
      [
        {
          text: I18n.t('app.cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.close()},
      ],
      {cancelable: false},
    );
  };

  rightButtons = () => {
    return [
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => this.onClickDelete()}>
        <View style={styles.deleteButton}>
          <SvgXml xml={DeleteIcon} />
        </View>
      </TouchableOpacity>,
    ];
  };

  render() {
    const {item, index, getSwipeItemIsOpen, onCloseOldSwipe} = this.props;
    return (
      <Swipeable
        ref={ref => (this.swipe = ref)}
        rightActionActivationDistance={20}
        onRightActionRelease={() => {
          onCloseOldSwipe(index);
          getSwipeItemIsOpen(index);
        }}
        rightButtons={this.rightButtons()}>
        <View
          style={{paddingVertical: scale(16), paddingHorizontal: scale(20)}}>
          <Text style={styles.time}>November 06, 2019</Text>
          <Text style={styles.title}>BE HAPPY WHEN ABLE TO BE AWARE</Text>
          <Text>
            When I was a teenager, my teacher taught me: If you know it, be
            happy...
          </Text>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    color: '#1A1A1A',
    fontSize: moderateScale(13),
  },
  title: {
    fontWeight: '300',
    color: '#309975',
    fontSize: moderateScale(24),
    marginVertical: scale(10),
  },
  deleteButton: {
    width: scale(64),
    height: scale(64),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#309975',
    borderRadius: scale(32),
    ...ShadowStyle,
  },
});
