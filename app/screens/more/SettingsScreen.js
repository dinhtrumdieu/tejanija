import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch
} from 'react-native';
import Text from '../../component/Text';
import Header from '../../component/Header';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';
import CloseIcon from '../../../assets/svg/Close.svg';
import ArrowRightIcon from '../../../assets/svg/Chevron-right.svg';
import {SvgXml} from 'react-native-svg';

function renderRow(title) {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.row}>
        <Text style={styles.label}>{title}</Text>
        <SvgXml xml={ArrowRightIcon} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function renderSeparator() {
  return (
    <View
      style={[
        CommonStyles.separatorStyle,
        {width: scale(360), alignSelf: 'flex-end'},
      ]}
    />
  );
}

export default function SettingsScreen({navigation}) {
  const [isOn, setIsOn] = React.useState(true)
  return (
    <View style={{flex: 1}}>
      <Header
        center={
          <Text
            style={[
              CommonStyles.headerTitle,
              {color: CommonColors.headerTextColor},
            ]}>
            Settings
          </Text>
        }
        right={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={CloseIcon} />
          </TouchableOpacity>
        }
      />
      <View>
        <Text style={styles.settingsTitle}>SETTINGS</Text>
        <View style={styles.body}>
          <View style={{backgroundColor: 'white'}}>
            <TouchableWithoutFeedback>
              <View style={styles.row}>
                <Text style={styles.label}>Color theme</Text>
                <Text style={{color: 'rgba(0, 0, 0, 0.4)'}}>Dark</Text>
                <SvgXml xml={ArrowRightIcon} />
              </View>
            </TouchableWithoutFeedback>
            {renderSeparator()}
            <TouchableWithoutFeedback>
              <View style={styles.row}>
                <Text style={styles.label}>Push notifications</Text>
                <Switch 
                  style={{}}
                  onValueChange={() => {setIsOn(!isOn)}}
                  value={isOn}
              />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.othersTitle}>OTHERS</Text>
        <View style={styles.body}>
          <View style={{backgroundColor: 'white'}}>
            {renderRow('About')}
            {renderSeparator()}
            {renderRow('Terms of Use')}
            {renderSeparator()}
            {renderRow('Legal Notices')}
            {renderSeparator()}
            {renderRow('Privacy Notice')}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonColors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
  label: {
    color: '#1A1A1A',
    flex: 1,
  },
  settingsTitle: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginTop: scale(33),
    marginHorizontal: scale(16),
    color: '#7D7D7D',
    marginBottom: scale(5),
  },
  othersTitle: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    marginTop: scale(43),
    marginHorizontal: scale(16),
    color: '#7D7D7D',
    marginBottom: scale(5),
  },
});
