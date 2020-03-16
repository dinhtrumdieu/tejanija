// @flow
import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import {Video, Constants, DangerZone, GestureHandler} from 'expo';
import Video from 'react-native-video';
import {type Video as VideoModel} from './videos';
import VideoContent from './VideoContent';
import PlayerControls, {PLACEHOLDER_WIDTH} from './PlayerControls';

//const {Animated, Easing} = DangerZone;
import Animated, {Easing} from 'react-native-reanimated';
//const {State, PanGestureHandler} = GestureHandler;
import {State, PanGestureHandler} from 'react-native-gesture-handler';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
const statusBarHeight = 0;
const minHeight = 64;
//const midBound = height - 64 * 3;
const midBound = height - 64;
const upperBound = midBound + minHeight;
const {
  Extrapolate,
  Value,
  Clock,
  cond,
  eq,
  set,
  add,
  sub,
  multiply,
  lessThan,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  interpolate,
  timing,
  neq,
} = Animated;
const AnimatedVideo = Animated.createAnimatedComponent(ImageBackground);
const shadow = {
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0.18,
  shadowRadius: 2,
};

import PlayIcon from '../../../assets/svg/Play.svg';
import PauseIcon from '../../../assets/svg/Pause.svg';
import HeartIcon from '../../../assets/svg/Heart_Detail.svg';
import MoreIcon from '../../../assets/svg/More-horizontal.svg';
import ShareIcon from '../../../assets/svg/Share-other.svg';
import ArrowDownIcon from '../../../assets/svg/Chevron-down.svg';

import {scale, verticalScale} from '../../libs/reactSizeMatter/scalingUtils';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../component/Text';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

function runSpring(clock: Clock, value: Value, dest: Value): Value {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

type VideoModalProps = {
  video: VideoModel,
};

export default class AudioPlayerScreen extends React.Component {
  translationY = new Value(0);

  velocityY = new Value(0);

  offsetY = new Value(0);

  offsetY2 = new Value(0);

  gestureState = new Value(State.UNDETERMINED);

  onGestureEvent: $Call<event>;

  translateY: Value;

  constructor(props: VideoModalProps) {
    super(props);
    const {
      translationY,
      velocityY,
      offsetY,
      gestureState: state,
      offsetY2,
    } = this;
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY,
            velocityY,
            state,
          },
        },
      ],
      {useNativeDriver: true},
    );
    const clockY = new Clock();
    const finalTranslateY = add(
      add(translationY, offsetY),
      multiply(0.2, velocityY),
    );
    const snapPoint = cond(
      lessThan(finalTranslateY, sub(offsetY, height / 4)),
      0,
      upperBound,
    );
    this.translateY = cond(
      eq(state, State.END),
      [
        set(
          translationY,
          runSpring(clockY, add(translationY, offsetY), snapPoint),
        ),
        set(offsetY, translationY),
        translationY,
      ],
      [
        cond(eq(state, State.BEGAN), [
          stopClock(clockY),
          cond(neq(offsetY2, 0), [set(offsetY, 0), set(offsetY2, 0)]),
        ]),
        add(offsetY, translationY),
      ],
    );

    Sound.setCategory('Playback');

    // audio play
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  play = async () => {
    if (this.sound) {
      this.sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      const filepath = require('../../../assets/audio/SoundHelix-Song-1.mp3');
      this.sound = new Sound(filepath, error => {
        if (error) {
          console.log('failed to load the sound', error);
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            duration: this.sound.getDuration(),
          });
          this.sound.play(this.playComplete);
        }
      });
    }
  };

  playComplete = success => {
    if (this.sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      this.setState({playState: 'paused', playSeconds: 0});
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({playState: 'paused'});
  };

  componentDidMount() {
    this.play();
    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState === 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        });
      }
    }, 100);
  }

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({playSeconds: value});
    }
  };

  // componentDidUpdate(prevProps: VideoModalProps) {
  //   if (prevProps !== this.props) {
  //     this.slideUp();
  //   }
  // }

  slideUp = () => {
    console.warn('slide ip');
    timing(this.offsetY2, {
      toValue: -upperBound,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    const {onGestureEvent, translateY: y, offsetY2} = this;
    const translateY = add(y, offsetY2);
    const video = {
      id: '3',
      thumbnail: require('../assets/thumbnails/3.jpg'),
      video: require('../assets/3.mp4'),
      title: 'Sending Firebase Data Messages to Expo: iOS',
      username: 'Expo',
      avatar: require('../assets/avatars/1.png'),
      views: 189,
      published: moment().subtract(5, 'days'),
    };
    const tY = interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [0, midBound],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(translateY, {
      inputRange: [0, midBound - 100],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const statusBarOpacity = interpolate(translateY, {
      inputRange: [0, statusBarHeight],
      outputRange: [1, 0],
      extrapolateLeft: Extrapolate.CLAMP,
    });
    const videoContainerWidth = interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [width, width - 16],
      extrapolate: Extrapolate.CLAMP,
    });
    const videoWidth = interpolate(translateY, {
      inputRange: [0, midBound, upperBound],
      outputRange: [width, width - 16, PLACEHOLDER_WIDTH],
      extrapolate: Extrapolate.CLAMP,
    });
    const videoHeight = interpolate(translateY, {
      inputRange: [0, midBound, upperBound],
      outputRange: [height, minHeight * 1.3, minHeight],
      extrapolate: Extrapolate.CLAMP,
    });
    const containerHeight = interpolate(translateY, {
      inputRange: [0, midBound],
      outputRange: [height, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const playerControlOpacity = interpolate(translateY, {
      inputRange: [midBound, upperBound],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <>
        {/*<Animated.View*/}
        {/*  style={{*/}
        {/*    height: statusBarHeight,*/}
        {/*    backgroundColor: 'black',*/}
        {/*    opacity: statusBarOpacity,*/}
        {/*  }}*/}
        {/*/>*/}
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          activeOffsetY={[-10, 10]}
          {...{onGestureEvent}}>
          <Animated.View
            style={{
              transform: [{translateY: tY}],
              ...shadow,
            }}>
            <Animated.View
              style={{backgroundColor: 'white', width: videoContainerWidth}}>
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  opacity: playerControlOpacity,
                }}>
                <PlayerControls title={video.title} onPress={this.slideUp} />
              </Animated.View>
              <AnimatedVideo
                source={require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg')}
                style={{width: videoWidth, height: videoHeight}}
                shouldPlay>
                <Animated.View
                  style={{
                    backgroundColor: 'transparent',
                    width: videoContainerWidth,
                    height: containerHeight,
                  }}>
                  <Animated.View
                    style={{
                      opacity,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <LinearGradient
                      colors={[
                        'rgba(69, 77, 102, 0)',
                        'rgba(69, 77, 102, 0.7)',
                      ]}
                      style={[styles.linearGradient]}
                    />

                    <Header
                      headerStyle={styles.header}
                      left={<BackButton white={true} />}
                      right={<SvgXml xml={ArrowDownIcon} />}
                    />

                    {this.state.playState === 'playing' && (
                      <TouchableOpacity
                        onPress={() => this.pause()}
                        style={styles.playButton}>
                        <SvgXml xml={PauseIcon} />
                      </TouchableOpacity>
                    )}

                    {this.state.playState === 'paused' && (
                      <TouchableOpacity
                        onPress={() => this.play()}
                        style={styles.playButton}>
                        <SvgXml xml={PlayIcon} />
                      </TouchableOpacity>
                    )}

                    <View
                      style={{
                        marginVertical: 15,
                        marginHorizontal: 15,
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: 'white', alignSelf: 'center'}}>
                        {currentTimeString}
                      </Text>
                      <Slider
                        //onTouchStart={this.onSliderEditStart}
                        // onTouchMove={() => console.log('onTouchMove')}
                        //  onTouchEnd={this.onSliderEditEnd}
                        // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                        // onTouchCancel={() => console.log('onTouchCancel')}
                        // onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds}
                        maximumValue={this.state.duration}
                        maximumTrackTintColor="gray"
                        minimumTrackTintColor="white"
                        thumbTintColor="white"
                        style={{
                          flex: 1,
                          alignSelf: 'center',
                          marginHorizontal: Platform.select({ios: 5}),
                        }}
                      />
                      <Text style={{color: 'white', alignSelf: 'center'}}>
                        {durationString}
                      </Text>
                    </View>

                    <View style={styles.buttonBottom}>
                      <TouchableOpacity>
                        <SvgXml xml={HeartIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <SvgXml xml={MoreIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <SvgXml xml={ShareIcon} />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </Animated.View>
              </AnimatedVideo>
            </Animated.View>
            {/*<Animated.View*/}
            {/*  style={{*/}
            {/*    backgroundColor: 'red',*/}
            {/*    width: videoContainerWidth,*/}
            {/*    height: containerHeight,*/}
            {/*    position: 'absolute'*/}
            {/*  }}>*/}
            {/*  <Animated.View style={{opacity}}>*/}
            {/*    /!*<VideoContent {...{video}} />*!/*/}
            {/*  </Animated.View>*/}
            {/*</Animated.View>*/}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}

const styles = StyleSheet.create({
  playButton: {
    width: scale(48),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26, 0.45)',
    borderRadius: scale(24),
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    borderBottomWidth: 0,
    width: '100%',
  },
  buttonBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: verticalScale(30),
  },
});
