import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import Text from '../component/Text';
import {SvgXml} from 'react-native-svg';
import FavouriteIcon from '../../assets/svg/Icon_float_favourite.svg';
import CloseIcon from '../../assets/svg/Icon_float_close.svg';
import CreateIcon from '../../assets/svg/Icon_float_create.svg';
import ShareIcon from '../../assets/svg/Icon_float_share.svg';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonStyles, ShadowStyle} from '../utils/CommonStyles';
import DimensionsIOS from '../utils/DimensionsIOS';

function FloatButton(props) {
  const {isShow, data} = props;
  const [float, setFloat] = React.useState(isShow);
  const [fadeValue, setFadeValue] = React.useState(new Animated.Value(0));
  const [xValue, setXValueValue] = React.useState(
    new Animated.Value(scale(-88)),
  );
  const [spinValue, setspinValue] = React.useState(new Animated.Value(0));
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });
  const xPadding = DimensionsIOS.bottomAreaHeight + scale(20);

  // function animate
  function fadeAnimation() {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 100,
    }).start(() => moveOutAnimation());
  }

  function fadeOutAnimation() {
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
    }).start(() => fadeOutAnimation());
  }

  function moveOutAnimation() {
    Animated.timing(xValue, {
      toValue: scale(0),
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  function rotate() {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }

  function rotateOut() {
    Animated.timing(spinValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }

  function toggleButton() {
    if (float) {
      moveAnimation();
      rotateOut();
    } else {
      fadeAnimation();
      rotate();
    }
    setFloat(!float);
  }

  return (
    <View
      style={{
        alignItems: 'flex-end',
        bottom: 0,
        width: scale(152),
        position: 'absolute',
        right: 0,
        marginRight: scale(24),
        marginBottom: xPadding,
      }}>
      <View
        style={[
          styles.shadownBox,
          {
            height: scale(64),
            width: scale(152),
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
            alignContent: 'center',
          },
        ]}>
        {/* <TouchableOpacity activeOpacity={0.8}> */}
        <Animated.View
          style={[
            styles.circle,
            {
              bottom: xValue,
              opacity: fadeValue,
              marginLeft: scale(24),
              // backgroundColor: '#EFEEB4',
            },
          ]}>
          <TouchableOpacity
            style={{
              width: scale(64),
              height: scale(64),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EFEEB4',
              borderRadius: scale(32),
            }}>
            <SvgXml xml={FavouriteIcon} />
          </TouchableOpacity>
        </Animated.View>
        {/* </TouchableOpacity> */}
        <Animated.View
          style={[
            styles.circle,
            {
              left: xValue,
              bottom: xValue,
              opacity: fadeValue,
              // backgroundColor: '#EFEEB4',
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AddNotes', {data});
              moveAnimation();
              rotateOut();
              setFloat(!float);
            }}
            style={{
              width: scale(64),
              height: scale(64),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EFEEB4',
              borderRadius: scale(32),
            }}>
            <SvgXml xml={CreateIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View
        style={[
          styles.shadownBox,
          {
            height: scale(88),
            width: scale(152),
            flexDirection: 'row-reverse',
            alignItems: 'flex-end',
            backgroundColor: '',
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          underlayColor={'#FFF'}
          onPress={() => toggleButton()}
          // activeOpacity={1}
          style={[
            styles.circle,
            {
              marginLeft: scale(24),
              backgroundColor: '#309975',
              zIndex: 999,
            },
          ]}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <SvgXml xml={CloseIcon} />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.circle,
            {
              left: xValue,
              opacity: fadeValue,
              // backgroundColor: '#EFEEB4',
            },
          ]}>
          <TouchableOpacity
            style={{
              width: scale(64),
              height: scale(64),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EFEEB4',
              borderRadius: scale(32),
            }}>
            <SvgXml xml={ShareIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

export default FloatButton;

const styles = StyleSheet.create({
  circle: {
    height: scale(64),
    width: scale(64),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadownBox: {
    ...ShadowStyle,
  },
});
