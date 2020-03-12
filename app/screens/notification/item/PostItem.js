import Swipeable from 'react-native-swipeable';
import {StyleSheet, TouchableOpacity, View, Image, Alert, TouchableWithoutFeedback} from 'react-native';
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
import ScaledSheet from '../../../libs/reactSizeMatter/ScaledSheet'

import I18n from '../../../i18n/i18n';

export default class PostItem extends React.Component {
  close = () => {
    if (this.swipe) {
      this.swipe.recenter();
    }
  };

  onClickDelete = (index) => {
    Alert.alert(
      I18n.t('app.delete_alert'),
      I18n.t('app.delete_message'),
      [
        {
          text: I18n.t('app.cancel'),
          onPress: () => this.close(),
          style: 'cancel',
        },
        {text: 'OK', onPress: (index) => this.delete()},
      ],
      {cancelable: false},
    );
  };

  delete=() => {
    const {item, index, getSwipeItemIsOpen, onCloseOldSwipe, type, detlete} = this.props;
    detlete(index)
    console.warn("index")
    console.warn(index)
    // if (this.swipe) {
    //   this.swipe.recenter();
    // }
  }

  rightButtons = (index) => {
    return [
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => this.onClickDelete(index)}>
        <View style={styles.deleteButton}>
          <SvgXml xml={DeleteIcon} />
        </View>
      </TouchableOpacity>,
    ];
  };

  render() {
    const {item, index, getSwipeItemIsOpen, onCloseOldSwipe, type} = this.props;
    return (
      <View>
        <Swipeable
          ref={ref => (this.swipe = ref)}
          rightActionActivationDistance={20}
          onRightActionRelease={() => {
            onCloseOldSwipe(index);
            getSwipeItemIsOpen(index);
          }}
          rightButtons={this.rightButtons(index)}>
          <View
            style={{
              paddingVertical: scale(10),
              paddingHorizontal: scale(20),
            }}>
            <View style = {{ padding: scale(0)}}>
                  
          <Text style = {styles.date}>November 27, 2019 / {type ==="sys" ? <View/> : <Text style ={{fontSize: scale(11), color: "#309975"}}>Drowsiness</Text>}</Text>
                  <View style = {{flexDirection:"row", flex:1, alignItems:"center"}}>
                      <View style ={styles.circleStatus}></View>
                      <Text style = {styles.textTitle} >Dealing with wandering mind</Text>
                  </View>
                  <Text style = {styles.textContent}>If you can’t change the attitude, change the...</Text>

              </View>
          </View>
        </Swipeable>
        <View style ={[CommonStyles.separatorStyle, { marginLeft: scale(18), marginRight: scale(18)}]}></View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
 
  date: {
      paddingTop: scale(4),
      paddingBottom: scale(4),
      marginLeft: scale(18),
      marginRight: scale(18),
      fontSize: scale(11),
      color: "#C4C4C4",
  },
  containerSwitch: {
      margin: scale(16),
      flexDirection: "row",
      justifyContent:"center",
      alignItems:"center"
  },
  circleStatus: {
      width: scale(8),
      height: scale(8),
      borderRadius: scale(4),
      backgroundColor:"#309975",
      marginRight: scale(10)
  },
  textContent: {
      paddingTop: scale(8),
      paddingBottom: scale(0),
      marginLeft: scale(18),
      marginRight: scale(18),
      fontSize: scale(13),
      color: "#7D7D7D"
  },
  lineBottom:{flex:1 ,
      height: scale(1),
      backgroundColor:"#000",
      marginLeft: scale(18),
      marginRight: scale(18)
  },
  textTitle: {
      fontSize: scale(16),
      color: "#1A1A1A",
      fontWeight: '900',
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
})