import React from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight

} from 'react-native';
import Text from '../../component/Text';
import ActionButton from 'react-native-action-button';
import {SvgXml} from 'react-native-svg';
import MenuWhiteIcon from '../../../assets/svg/Menu_white.svg';

import FavouriteIcon from '../../../assets/svg/Icon_float_favourite.svg';
import CloseIcon from '../../../assets/svg/Icon_float_close.svg';
import CreateIcon from '../../../assets/svg/Icon_float_create.svg';
import ShareIcon from '../../../assets/svg/Icon_float_share.svg';

import MenuIcon from '../../../assets/svg/Menu.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';

const data = [
  {
    image: require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg'),
    content: '',
  },
  {
    image: require('../../../assets/demo/17049efa376cd9bf8d7c0af72238784c.jpg'),
    content: '',
  },
  {image: require('../../../assets/demo/download.jpeg'), content: ''},
  {
    image: require('../../../assets/demo/gradient_pink_shades_130856_1350x2400.jpg'),
    content: '',
  },
  {image: require('../../../assets/demo/images.jpeg'), content: ''},
  {
    image: require('../../../assets/demo/Many-pink-flowers-background-color-layers_iphone_320x480.jpg'),
    content: '',
  },
];

const {width, height} = Dimensions.get('window');

function BackgroundViewList(props) {
  const {type} = props;
  const [postNext, onPostNext] = React.useState(0);
  const [float, setFloat] = React.useState(false);
  const [fadeValue, setFadeValue] = React.useState(new Animated.Value(0));
  const [xValue, setXValueValue] = React.useState(new Animated.Value(scale(-88)));
  const [spinValue, setspinValue] = React.useState(new Animated.Value(0));
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg']
  })

  function fadeAnimation(){
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 300,
    }).start(()=> moveOutAnimation());
  }

  function fadeOutAnimation(){
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 300,
    }).start();
  }

  function moveAnimation() {
    Animated.timing(xValue, {
      toValue: scale(-88),
      duration: 300,
      easing: Easing.back(), 
  }).start(()=> fadeOutAnimation());

  }

  
  function moveOutAnimation() {
    Animated.timing(xValue, {
      toValue: scale(0),
      duration: 300,
      easing: Easing.linear
    }).start();
  }

  function rotate(){
    Animated.timing(spinValue,{
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start()
  }

  function rotateOut(){
    Animated.timing(spinValue,{
      toValue: 0,
      duration: 500,
      easing: Easing.linear
    }).start()
  }

  function toggleButton() {
 
    if (float) {
      moveAnimation()
      rotateOut()
  
    } else {
      fadeAnimation()
      rotate()

    }
    setFloat(!float)
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (postNext < data.length - 1) {
          onPostNext(postNext + 1);
        } else {
          onPostNext(0);
        }
      }}>
      <ImageBackground
        source={data[postNext].image}
        style={{
          width: width,
          height: height - scale(50),
        }}>

      <View style={{marginTop: height - scale(250), marginLeft: width - scale(200), justifyContent: 'center', alignContent: 'center', alignItems:'center'}}>
            <View style={{
              height: scale(64),
              width: scale(152),
              flexDirection:'row-reverse',
              alignItems:'flex-end',
              alignContent:'center',
              backgroundColor:''
              }}>
              <Animated.View
                  style={{
                    bottom: xValue,
                    opacity: fadeValue,
                    marginLeft: scale(24),
                    backgroundColor:"#EFEEB4",
                    height: scale(64),
                    width: scale(64),
                    borderRadius: scale(32), justifyContent:'center', alignItems: 'center'}}
                >
                  <SvgXml xml={FavouriteIcon} />

                </ Animated.View>
              <Animated.View
                  style={{
                    left: xValue,
                    bottom: xValue,
                    opacity: fadeValue,
                    backgroundColor:"#EFEEB4", height: scale(64), width: scale(64), borderRadius: scale(32), justifyContent:'center', alignItems: 'center'}}
                >
                  <SvgXml xml={CreateIcon} />

                </ Animated.View>
            </View>

            <View style={{
              height: scale(88),
              width: scale(152),
              flexDirection:'row-reverse',
              alignItems:'flex-end',
              backgroundColor:''
              
              }}>
              <TouchableHighlight
                    underlayColor = {'#FFF'}
                    onPress={() => toggleButton()}
                    // activeOpacity={1}
                    style={{
                      marginLeft: scale(24),
                      backgroundColor:"#309975",
                      height: scale(64),
                      width: scale(64),
                      borderRadius: scale(32),
                      justifyContent:'center',
                      alignItems: 'center',
                      zIndex: 999
                    }}
              >
                <Animated.View
                  style={{transform: [{rotate: spin}] }}
                >
                  <SvgXml xml={CloseIcon} />

                </Animated.View>

              </ TouchableHighlight>
              <Animated.View
                  style={{
                    left: xValue,
                    opacity: fadeValue,
                    height: scale(64),
                    width: scale(64),
                    borderRadius: scale(32),
                    justifyContent:'center',
                    alignItems: 'center',
                    backgroundColor:"#EFEEB4",
                  }}
                >
                  <SvgXml xml={ShareIcon} />
                </ Animated.View>
            </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default BackgroundViewList;

