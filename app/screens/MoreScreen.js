import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Text from '../component/Text';
import Header from '../component/Header';
import {CommonColors, CommonStyles} from '../utils/CommonStyles';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import SettingIcon from '../../assets/svg/Settings.svg';
import VersionIcon from '../../assets/svg/Hard-drive.svg';
import HelpIcon from '../../assets/svg/Help-circle.svg';
import ArrowRightIcon from '../../assets/svg/Chevron-right.svg';
import {SvgXml} from 'react-native-svg';

export default function MoreScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Header
        headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
        type={0}
        center={<Text style={CommonStyles.headerTitle}>More</Text>}
      />
      <View style={styles.body}>
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Settings')}>
          <View style={styles.row}>
            <SvgXml xml={SettingIcon} />
            <Text style={styles.label}>Settings</Text>
            <SvgXml xml={ArrowRightIcon} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={[
            CommonStyles.separatorStyle,
            {width: scale(315), alignSelf: 'flex-end'},
          ]}
        />
        <TouchableWithoutFeedback>
          <View style={styles.row}>
            <SvgXml xml={HelpIcon} />
            <Text style={styles.label}>Helps</Text>
            <SvgXml xml={ArrowRightIcon} />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={[
            CommonStyles.separatorStyle,
            {width: scale(315), alignSelf: 'flex-end'},
          ]}
        />
        <TouchableWithoutFeedback>
          <View style={styles.row}>
            <SvgXml xml={VersionIcon} />
            <Text style={styles.label}>Version</Text>
            <Text style={{color: '#C4C4C4'}}>1.0.0</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: scale(36),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonColors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  label: {
    color: '#1A1A1A',
    marginLeft: scale(14),
    flex: 1,
  },
});
