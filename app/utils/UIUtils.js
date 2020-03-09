import {
  Platform,
} from 'react-native';

export default class UIUtils {
  static generateShadowStyle(height = 4) {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        zIndex: 999,
      };
    }
    return {
      elevation: height,
    };
  }

  static generatePopupShadow() {
    return UIUtils.generateShadowStyle(8);
  }
}
