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
const minHeight = 64;
//const midBound = height - 64 * 3;
const midBound = height - 64;
const upperBound = midBound + minHeight;
const {timing} = Animated;

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
import {setSound, getSound, setInforSound, getInforSound} from './action';
import _ from 'lodash';

type VideoModalProps = {
  video: VideoModel,
};

export default class AudioPlayer extends React.Component {
  constructor(props: VideoModalProps) {
    super(props);
    Sound.setCategory('Playback');

    // audio play
    this.state = {
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  play = () => {
    const data = this.props.route.params.data;
    const news_id = data.id;
    const sound = getSound();
    const id_playing = _.get(getInforSound(), 'id', null);
    if (sound && id_playing && _.isEqual(id_playing, news_id)) {
      sound.play(this.playComplete);
      this.setState({playState: 'playing'});
    } else {
      // release bài hát cũ
      if (sound) {
        sound.release();
        setSound(null);
        setInforSound(null);
      }
      const filepath = data.audio;
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
      setSound(this.sound);
      setInforSound(data);
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
    this.sound = getSound();
    this.play();
    if (this.sound) {
      this.setState({
        duration: this.sound.getDuration(),
      });
    }
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
    // if (this.sound) {
    //   this.sound.release();
    //   this.sound = null;
    // }
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
    timing(this.offsetY2, {
      toValue: -upperBound,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);
    return (
      <ImageBackground
        source={require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg')}
        style={{width, height}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={['rgba(69, 77, 102, 0)', 'rgba(69, 77, 102, 0.7)']}
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
        </View>
      </ImageBackground>
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
