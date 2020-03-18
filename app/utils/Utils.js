import {Dimensions, Platform} from 'react-native';
import Toast from 'react-native-root-toast';

export default class Utils {
  static TOAST_POSITION_BOTTOM = Toast.positions.BOTTOM;

  static TOAST_POSITION_CENTER = Toast.positions.CENTER;

  static TOAST_POSITION_TOP = Toast.positions.TOP;

  static isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.width === 896 ||
        dimen.height === 896)
    );
  }

  static setScreenHeight(height) {
    Utils.screenHeight = height;
  }

  static getScreenHeight() {
    return Utils.screenHeight;
  }

  static showSuccessToast(toastProps = {}) {
    const {message = '', position = Utils.TOAST_POSITION_TOP} = toastProps;
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position,
      textColor: '#fff',
      shadow: false,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      delay: 0,
      success: true,
    });
  }

  static showErrorToast(toastProps = {}) {
    const {
      message = '',
      position = Utils.TOAST_POSITION_TOP,
      duration,
    } = toastProps;
    Toast.show(message, {
      duration: duration || Toast.durations.SHORT,
      position,
      textColor: '#fff',
      shadow: false,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      delay: 0,
      success: false,
    });
  }
}
