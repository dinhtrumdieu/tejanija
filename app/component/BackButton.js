import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BackIcon from '../../assets/svg/back_icon_black.svg';
//import Navigator from '../utils/Navigator';
import {SvgXml} from 'react-native-svg';
import Text from '../component/Text';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors} from '../utils/CommonStyles';
import I18n from '../i18n/i18n';
import {useNavigation} from '@react-navigation/native';

export default function BackButton(props) {
  const navigation = useNavigation();
  const {isShowBackLabel = true} = props;
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
        {<SvgXml xml={BackIcon} />}
        {isShowBackLabel && (
          <Text
            style={{
              marginLeft: scale(5),
              fontSize: moderateScale(16),
              color: CommonColors.headerTextColor,
              fontWeight: 'bold',
            }}>
            {I18n.t('app.back')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
