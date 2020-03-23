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
import {SvgXml} from 'react-native-svg';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonStyles, ShadowStyle} from '../../utils/CommonStyles';
import FloatButton from '../../component/FloatButton';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../component/Text';

const content =
  'Right idea is important.\n' +
  '\n' +
  'The mind doesn’t go to the sound. It is the paying-attention-mind happening. This is the right concept – the mind pays attention at one instance. The next mind is a new mind. Otherwise, you think that the mind goes there and then comes back; that there is only one mind.\n' +
  '\n' +
  'Your realization is right if you understand that this mind is happening and then is finished, the next mind arises and then is finished. One mind does its job and then it’s finished; the next mind arises, does its job and then it’s finished.';

const data = [
  {
    id: 1,
    time: 'November 2, 2019',
    title: 'RIGHT IDEA OF ARISING AND PASSING AWAY',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg'),
    content: content,
  },
  {
    id: 2,
    time: 'November 3, 2019',
    title: 'HOW MUCH PRACTICE FOR A BEGINNER?',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/17049efa376cd9bf8d7c0af72238784c.jpg'),
    content: content,
  },
  {
    id: 3,
    time: 'November 4, 2019',
    title: 'THE MINDS WORK IS TO STAY AWARE ',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/download.jpeg'),
    content: content,
  },
  {
    id: 4,
    time: 'November 5, 2019',
    title: 'Check the energy used',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/gradient_pink_shades_130856_1350x2400.jpg'),
    content: content,
  },
  {
    id: 5,
    time: 'November 6, 2019',
    title: 'RIGHT IDEA OF ARISING AND PASSING AWAY',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/images.jpeg'),
    content: content,
  },
  {
    id: 6,
    time: 'November 7, 2019',
    title: 'RIGHT IDEA OF ARISING AND PASSING AWAY',
    description: 'China Retreat 2016 02/27 Interview 5 (A2) (1:30:42-1:32:13)',
    image: require('../../../assets/demo/Many-pink-flowers-background-color-layers_iphone_320x480.jpg'),
    content: content,
  },
];

const {width, height} = Dimensions.get('window');

function BackgroundViewList(props) {
  const {type} = props;
  const [postNext, onPostNext] = React.useState(0);
  const [float, setFloat] = React.useState(false);

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={data[postNext].image}
      style={{
        width: width,
        height: height - scale(50),
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (postNext < data.length - 1) {
            onPostNext(postNext + 1);
          } else {
            onPostNext(0);
          }
        }}>
        <View style={{flex: 1}}>
          <View style={[styles.linearGradient]} />
          <View style={{marginTop: scale(100), marginHorizontal: scale(20)}}>
            <Text style={styles.time}>{data[postNext].time}</Text>
            <Text style={styles.title}>{data[postNext].title}</Text>
            <Text style={styles.description}>{data[postNext].description}</Text>
            <Text style={styles.content}>{data[postNext].content}</Text>
          </View>
          <FloatButton
            data={data[postNext]}
            navigation={props.navigation}
            isShow={float}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default BackgroundViewList;

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  time: {
    fontSize: moderateScale(13),
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    fontSize: moderateScale(16),
    color: '#fff',
  },
  title: {
    fontSize: moderateScale(32),
    color: '#fff',
    textAlign: 'center',
    marginTop: scale(5),
    marginBottom: scale(10),
    fontWeight: '300',
  },
  description: {
    fontSize: moderateScale(13),
    color: '#fff',
    textAlign: 'center',
    marginBottom: scale(16),
  },
});
