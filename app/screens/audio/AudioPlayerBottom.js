import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../assets/svg/Play.svg';
import PauseIcon from '../../../assets/svg/Pause.svg';
import {AudioContext} from '../context/audio-context';
import {getSound} from './action';

export default class AudioPlayerBottom extends Component {
  onHandle = () => {
    this.props.navigation.navigate('AudioPlayer', {data: this.props.data});
  };

  play = () => {
    if (getSound()) {
      getSound().play();
    }
  };

  pause = () => {
    if (getSound()) {
      getSound().pause();
    }
  };

  handlePlay = (togglePlay, audio) => {
    if (audio.play === 'playing') {
      this.pause();
      togglePlay('paused');
    } else {
      this.play();
      togglePlay('playing');
    }
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({audio, togglePlay}) => {
          return (
            <TouchableWithoutFeedback onPress={this.onHandle}>
              <View style={styles.container}>
                <Image
                  resizeMode={'cover'}
                  style={styles.musicImage}
                  source={require('../../../assets/demo/17049efa376cd9bf8d7c0af72238784c.jpg')}
                />
                <Text style={styles.title}>
                  RIGHT EFFORT DOES NOT MEAN STRO...
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => this.handlePlay(togglePlay, audio)}>
                  <View
                    style={{
                      width: scale(30),
                      height: scale(30),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {audio.play === 'paused' && <SvgXml xml={PlayIcon} />}
                    {audio.play === 'playing' && <SvgXml xml={PauseIcon} />}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(50),
    backgroundColor: '#1A2C3C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(8),
    paddingRight: scale(16),
  },
  title: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    flex: 1,
    marginHorizontal: scale(8),
  },
  musicImage: {
    width: scale(40),
    height: scale(40),
  },
});
