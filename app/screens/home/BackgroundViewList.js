import React from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Text from '../../component/Text';
import {SvgXml} from 'react-native-svg';
import MenuWhiteIcon from '../../../assets/svg/Menu_white.svg';
import MenuIcon from '../../../assets/svg/Menu.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonStyles, ShadowStyle} from '../../utils/CommonStyles';
import FloatButton from '../../component/FloatButton'

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
          <FloatButton isShow = {float}/>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default BackgroundViewList;