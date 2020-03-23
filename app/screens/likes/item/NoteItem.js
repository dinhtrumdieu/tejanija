import Swipeable from 'react-native-swipeable';
import {StyleSheet, TouchableOpacity, View, Image, Alert} from 'react-native';
import {moderateScale, scale} from '../../../libs/reactSizeMatter/scalingUtils';
import Text from '../../../component/Text';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import DeleteIcon from '../../../../assets/svg/delete_icon.svg';
import EditIcon from '../../../../assets/svg/Icon_float_create.svg';
import {
  CommonColors,
  CommonStyles,
  Fonts,
  ShadowStyle,
} from '../../../utils/CommonStyles';
import I18n from '../../../i18n/i18n';

export default class NoteItem extends React.Component {
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
        onPress={() => {
          this.props.navigation.navigate('AddNotes');
          this.close();
        }}>
        <View style={styles.editButton}>
          <SvgXml xml={EditIcon} />
        </View>
      </TouchableOpacity>,
      <TouchableOpacity
        onPress={() => this.onClickDelete()}
        style={{flex: 1, justifyContent: 'center'}}>
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
            <Text
              style={{
                lineHeight: scale(24),
                textAlign: 'justify',
                padding: scale(8),
              }}>
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
                source={item.image}
              />
              <View style={{justifyContent: 'center', flex:1}}>
                <Text style={styles.title}>{item.title}</Text>
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
  editButton: {
    width: scale(64),
    height: scale(64),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 44, 60, 0.92)',
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
