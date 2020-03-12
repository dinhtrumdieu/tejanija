import {StatusBar, Platform} from 'react-native';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import Utils from './Utils';

const Fonts = {
  defaultRegular: {
    fontFamily: 'SourceSansPro-Regular',
  },
  defaultBold: {
    fontFamily: 'SourceSansPro-Bold',
  },
  defaultBlack: {
    fontFamily: 'SourceSansPro-Black',
  },
  defaultItalic: {
    fontFamily: 'SourceSansPro-Italic',
  },
};

class CommonColors {
  static mainColor = '#FF9500';

  static secondaryColor = '#4F9DA6';

  static screenBgColor = '#FF9500';

  static increased = '#2dac91';

  static decreased = '#f74940';

  static activeTintColor = '#FFAD5A';

  static inActiveTintColor = '#383b6b';

  static border = '#C4C4C4';

  static separator = '#D1D1D6';

  static mainText = '#FFFFFF';

  static secondaryText = '#1A1A1A';

  static headerBarBgColor = '#FFFFFF';

  static headerTitleColor = '#FFFFFF';

  static disableText = '#444774';

  static activeTabColor = '#EFEEB4';

  static inActiveTabColor = '#fff';

  static headerTextColor = '#1A1A1A';
}

class CommonSize {
  static contentPadding = scale(16);

  static headerTitleFontSize = '15@ms';

  static inputHeight = '40@s';

  static inputFontSize = '14@ms';

  static formLabelFontSize = '14@ms';

  static btnSubmitHeight = scale(35);

  static paddingTopHeader =
    Platform.OS === 'ios'
      ? Utils.isIphoneX()
        ? scale(34)
        : scale(20)
      : StatusBar.currentHeight;

  static headerHeight = scale(44) + CommonSize.paddingTopHeader;

  static marginBottom = scale(30);
}

const CommonStyles = {
  screen: {
    flex: 1,
    // backgroundColor: CommonColors.screenBgColor,
  },
  header: {
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 0,
    height: CommonSize.headerHeight,
    paddingTop: CommonSize.paddingTopHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#e2e2e2',
  },
  headerHome: {
    backgroundColor: CommonColors.headerBarBgColor,
    elevation: 0,
    height: CommonSize.headerHeight + scale(13),
    paddingTop: CommonSize.paddingTopHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: CommonColors.headerTitleColor,
    textAlignVertical: 'center',
    textAlign: 'center',
    ...Fonts.defaultBold,
  },
  priceIncreased: {
    color: CommonColors.increased,
  },
  priceDecreased: {
    color: CommonColors.decreased,
  },
  priceNotChanged: {
    color: CommonColors.mainText,
  },
  matchParent: {
    flex: 1,
  },
  inputFocused: {
    borderColor: CommonColors.activeTintColor,
    borderWidth: scale(1),
  },
  buttonSubmitDisabled: {
    backgroundColor: CommonColors.inActiveTintColor,
    height: CommonSize.btnSubmitHeight,
    width: '100%',
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(3),
  },
  buttonSubmit: {
    backgroundColor: CommonColors.activeTintColor,
    height: CommonSize.btnSubmitHeight,
    width: '100%',
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(3),
  },
  textButtonSubmit: {
    fontSize: scale(13),
    ...Fonts.defaultBold,
    textTransform: 'uppercase',
    color: CommonColors.lightTextColor,
    letterSpacing: scale(1),
  },
  iconToolbar: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  errorMessage: {
    fontSize: scale(11),
    textAlign: 'left',
    color: 'red',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: CommonColors.separator,
  },
};

const ShadowStyle = {
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 8,
  },
  elevation: 3,
};

const TextButtonStyle = {
  fontSize: '12@s',
  fontWeight: '500',
  textTransform: 'uppercase',
  color: CommonColors.mainText,
};

const SeparatorStyle = {
  width: '100%',
  height: scale(1),
  backgroundColor: CommonColors.separator,
};

export {
  CommonStyles,
  CommonColors,
  CommonSize,
  Fonts,
  ShadowStyle,
  TextButtonStyle,
  SeparatorStyle,
};
