import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import Header from '../../component/Header';
import {CommonColors, CommonStyles, Fonts} from '../../utils/CommonStyles';
import BackButton from '../../component/BackButton';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../libs/reactSizeMatter/scalingUtils';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../assets/svg/Play.svg';
import Animated, {Easing} from 'react-native-reanimated';
import AudioPlayerScreen from './AudioPlayerScreen';
const {Value, timing} = Animated;
const {height} = Dimensions.get('window');

export default class AudioDetailScreen extends React.Component {
  animation = new Value(0);

  state = {
    video: false,
  };

  setVideo = () => {
    this.setState({video: true}, this.toggleVideo);
  };

  toggleVideo = () => {
    timing(this.animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  componentDidMount(): void {
   // this.setVideo();
  }

  render() {
    const {animation} = this;
    const {video} = this.state;
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });
    return (
      <View style={{flex: 1}}>
        <Header
          left={<BackButton />}
          center={
            <Text
              style={[
                CommonStyles.headerTitle,
                {color: CommonColors.headerTextColor, fontWeight: 'normal'},
              ]}>
              When the practice is ...
            </Text>
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(30)}}
          style={styles.body}>
          <View>
            <TouchableWithoutFeedback onPress={() => this.setVideo()}>
              <View>
                <Image
                  style={{
                    width: scale(335),
                    height: verticalScale(175),
                    borderRadius: scale(10),
                  }}
                  source={require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg')}
                />
                <LinearGradient
                  colors={['rgba(69, 77, 102, 0)', 'rgba(69, 77, 102, 0.7)']}
                  style={[styles.linearGradient]}>
                  <View style={styles.playButton}>
                    <SvgXml xml={PlayIcon} />
                  </View>
                  <Text style={styles.totalTime}>05:20</Text>
                </LinearGradient>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>
              When the practice is correct, faith increases
            </Text>
            <Text style={styles.time}>
              China Retreat 2014 Q&A (2 March 2014 AM; 1:03:44–1:05:30)
            </Text>
            <Text style={styles.content}>
              How do you feel when you practice? The quality of mind will show
              you. Less defilement is right. More defilement is wrong. If you
              have right practice your quality of mind will naturally show you.
              The mind is lighter, more peaceful, more open, happier, more
              interested and more willing to practice. And saddha, or faith,
              must increase. If you become more and more tired and defilements
              are increasing; you become bored, not interested, and more tense
              then your mind is also showing you that it’s wrong practice – for
              example, when the clock strikes the hour, you quickly go to the
              toilet or drink water to reduce the time for sitting meditation;
              this indicates not really wanting to practice.
            </Text>
          </View>
        </ScrollView>
        <Animated.View
          style={{transform: [{translateY}], position: 'absolute'}}>
          {video && <AudioPlayerScreen />}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: scale(335),
    height: verticalScale(175),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: scale(48),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26, 0.45)',
    borderRadius: scale(24),
  },
  totalTime: {
    color: '#fff',
    fontSize: moderateScale(11),
    ...Fonts.defaultBold,
    fontWeight: 'bold',
    marginTop: scale(10),
  },
  title: {
    fontSize: moderateScale(24),
    color: CommonColors.headerTextColor,
    marginTop: scale(16),
    marginBottom: scale(10),
  },
  time: {
    color: '#7D7D7D',
    fontSize: moderateScale(13),
    ...Fonts.defaultItalic,
    marginBottom: scale(16),
  },
  content: {
    fontSize: moderateScale(16),
    color: CommonColors.headerTextColor,
  },
});
