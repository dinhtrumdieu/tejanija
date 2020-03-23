import * as React from 'react';
import {View, TouchableOpacity, StatusBar, Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import CloseIcon from '../../../assets/svg/CLoseWhite.svg';
import CalendarIcon from '../../../assets/svg/Icon_Calendar.svg';
import CloseCircleIcon from '../../../assets/svg/Icon_Close_Circle.svg';
import DatePicker from 'react-native-datepicker';
import {CommonColors, CommonSize, CommonStyles} from '../../utils/CommonStyles';
import {SvgXml} from 'react-native-svg';
import LikeScreen from '../LikeScreen';
import {scale, moderateScale} from '../../libs/reactSizeMatter/scalingUtils';
import Text from '../../component/Text';
import Accordion from './Accordion';
import Header from '../../component/Header';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

function CustomDrawerContent(props) {
  return (
    <View
      style={{
        flex: 1,
        width: scale(335),
      }}>
      <Header
        left={
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <SvgXml xml={CloseIcon} />
          </TouchableOpacity>
        }
        center={<Text style={CommonStyles.headerTitle}>Filter</Text>}
        right={
          <TouchableOpacity>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#FFF',
                fontWeight: 'normal',
              }}>
              Clear
            </Text>
          </TouchableOpacity>
        }
        headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
        showStatusBar={false}
      />
      <CalendarComponent />
      <Accordion />
    </View>
  );
}

function CalendarComponent() {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  return (
    <View>
      <View
        style={[
          {
            paddingHorizontal: scale(20),
            backgroundColor: '#FFF',
            height: scale(55),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <TouchableOpacity>
          <SvgXml xml={CalendarIcon} />
        </TouchableOpacity>

        <View
          style={{
            width: scale(220),
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(55),
          }}>
          <DatePicker
            date={dateFrom}
            mode="date"
            placeholder="__/__/____"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            style={{
              width: scale(100),
            }}
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
            }}
            onDateChange={date => setDateFrom(date)}
          />

          <Text style={{color: '#7D7D7D'}}>-</Text>

          <DatePicker
            style={{
              width: scale(100),
            }}
            date={dateTo}
            mode="date"
            placeholder="__/__/____"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
            }}
            onDateChange={date => setDateTo(date)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setDateFrom('');
            setDateTo('');
          }}>
          <SvgXml xml={CloseCircleIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: scale(335),
        backgroundColor: 'rgba(26, 44, 60, 0.92)',
      }}
      // drawerWidth={500}
      drawerPosition={'left'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="BackgroungComponet" component={LikeScreen} />
    </Drawer.Navigator>
  );
}

export default function FilterOptionsScreen() {
  return <MyDrawer />;
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    ...CommonStyles.separatorStyle,
    marginLeft: scale(0),
  },
});
