import Swipeable from 'react-native-swipeable';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {moderateScale, scale} from '../../../libs/reactSizeMatter/scalingUtils';
import Text from '../../../component/Text';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import DeleteIcon from '../../../../assets/svg/delete_icon.svg';
import {
  CommonColors,
  CommonStyles,
  Fonts,
  ShadowStyle,
} from '../../../utils/CommonStyles';

export default class NoteItem extends React.Component {
  close = () => {
    if (this.swipe) {
      this.swipe.recenter();
    }
  };

  onClickDelete = () => {};

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
          style={{
            paddingVertical: scale(16),
            paddingHorizontal: scale(20),
          }}>
          <View
            style={{
              borderWidth: scale(1),
              borderColor: CommonColors.border,
              borderRadius: scale(5),
              overflow: 'hidden',
            }}>
            <Text style={{lineHeight: scale(24), textAlign: 'justify', padding: scale(8)}}>
              <Text style={styles.time}>November 01, 2019</Text>- [Note content
              dummy data] Consequat ligula sed rhoncus consequat metus. Quam
              urna vehicula feugiat Nisl commodo tempor, tincidunt ligula
              pellentesque praesent libero. Lobortis habitasse auctor neque,
              inceptos class, sociis rutrum vivamus nascetur sit curae.
            </Text>
            <View style={styles.bottom}>
              <Image
                resizeMode={'cover'}
                style={styles.image}
                source={require('../../../../assets/demo/Many-pink-flowers-background-color-layers_iphone_320x480.jpg')}
              />
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.title}>Check the energy used</Text>
                <Text style={styles.category}>Effort</Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    color: '#7D7D7D',
    fontSize: moderateScale(16),
    ...Fonts.defaultItalic,
  },
  title: {
    color: '#309975',
    fontSize: moderateScale(16),
    marginBottom: scale(10),
    textTransform: 'uppercase',
  },
  category: {
    color: '#7D7D7D',
    fontSize: moderateScale(13),
    ...Fonts.defaultItalic,
  },
  separator: {
    ...CommonStyles.separatorStyle,
    marginLeft: scale(20),
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    backgroundColor: '#EFEFEF',
  },
  image: {
    width: scale(106),
    height: scale(106),
    borderRadius: scale(10),
    marginRight: scale(10),
  },
});
