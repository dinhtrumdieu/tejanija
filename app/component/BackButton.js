import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BackBlackIcon from '../../assets/svg/back_icon_black.svg';
import BackWhiteIcon from '../../assets/svg/back_icon_white.svg';
//import Navigator from '../utils/Navigator';
import {SvgXml} from 'react-native-svg';
import Text from '../component/Text';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors} from '../utils/CommonStyles';
import I18n from '../i18n/i18n';
import {useNavigation} from '@react-navigation/native';

export default function BackButton(props) {
  const navigation = useNavigation();
  const {isShowBackLabel = true, white = false} = props;
  return (
    <TouchableOpacity
      hitSlop={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 30,
      }}
      onPress={() => navigation.goBack()}>
      <View style={{flexDirection: 'row'}}>
        {<SvgXml xml={white ? BackWhiteIcon : BackBlackIcon} />}
        {isShowBackLabel && (
          <Text
            style={{
              marginLeft: scale(5),
              fontSize: moderateScale(16),
              color: white ? '#fff' : CommonColors.headerTextColor,
              fontWeight: 'bold',
            }}>
            {I18n.t('app.back')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
