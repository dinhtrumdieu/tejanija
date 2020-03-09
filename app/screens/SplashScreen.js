import React from 'react';
import {Image, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {initApp} from '../../App';
import {CommonColors, CommonStyles} from '../utils/CommonStyles';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import Utils from '../utils/Utils';
import Navigator from '../utils/Navigator';
import AppConfig from '../utils/AppConfig';
import LottieView from 'lottie-react-native';

class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerStyle: {
      backgroundColor: CommonColors.screenBgColor,
    },
  };

  constructor(props) {
    super(props);
    this.initialized = false;
  }

  componentDidMount() {
    try {
      initApp();
    } catch (e) {
      console.log('init app error', e);
    }
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(30, 120);
    setTimeout(() => {
      this.initialized = true;
      this._navigateIfNeed();
    }, 600);
  }

  componentDidUpdate() {
    this._navigateIfNeed();
  }

  _onLayout = e => {
    Utils.setScreenHeight(e.nativeEvent.layout.height);
    this._navigateIfNeed();
  };

  _navigateIfNeed = () => {
    if (this.initialized && Utils.getScreenHeight()) {
      Navigator.navigate('HomeTab');
      // if (AppConfig.isLogin()) {
      //   Navigator.navigate('HomeTab');
      // } else {
      //   Navigator.navigate('LoginScreen');
      // }
    }
  };

  render() {
    return (
      <View style={{flex: 1}} onLayout={this._onLayout}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../../assets/example3')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  requestStatus: state.requestStatus,
});

export default connect(
  mapStateToProps,
  null,
)(SplashScreen);

const styles = ScaledSheet.create({
  screen: {
    ...CommonStyles.screen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '100%',
    height: '100%',
  },
});
