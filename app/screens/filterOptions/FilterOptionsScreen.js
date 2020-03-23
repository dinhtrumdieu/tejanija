import * as React from 'react';
import { View, TouchableOpacity, StatusBar, Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import CloseIcon from '../../../assets/svg/CLoseWhite.svg';
import CalendarIcon from '../../../assets/svg/Icon_Calendar.svg';
import CloseCircleIcon from '../../../assets/svg/Icon_Close_Circle.svg';
import DatePicker from 'react-native-datepicker'
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import {SvgXml} from 'react-native-svg';
import LikeScreen from '../LikeScreen'
import { scale } from '../../libs/reactSizeMatter/scalingUtils';
import Text from '../../component/Text';
import Accordion from './Accordion';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={{flex:1, backgroundColor:'rgba(26, 44, 60, 0.92)', width: scale(335)}} {...props}>
        <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle={'light-content' }
          />
        <View 
            style={{
                flexDirection: 'row',
                flex:1,
                backgroundColor:'rgba(26, 44, 60, 0.5)',
                height: scale(60),
                paddingHorizontal: scale(20),
                paddingBottom: scale(16), }}>
                <View 
                    style={{
                        flex:1,
                        justifyContent: 'flex-end',
                        backgroundColor:'' }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.closeDrawer()}
                        >
                            <SvgXml xml={CloseIcon}/>
                        </TouchableOpacity>
                        

                </View>
                <View 
                    style={{
                        flex:1,
                        justifyContent: 'flex-end' }}>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: scale(16),
                                color: '#FFF',
                                fontWeight:'bold',
                                textAlign: 'center', }}>Filter</Text>

                        </TouchableOpacity>
                </View>
            
                <View 
                    style={{
                        flex:1,
                        justifyContent: 'flex-end' }}>
                        <TouchableOpacity>
                            <Text 
                            style={{
                                fontSize: scale(16),
                                color: '#FFF',
                                fontWeight:'normal',
                                textAlign:'right' }}>Clear</Text> 
                        </TouchableOpacity>
                </View>
        </View>
        <CalendarComponent/>
        <Accordion />
        <View style={{flex:1, backgroundColor:'#FFF', height: screenHeight}}></View>

    </DrawerContentScrollView>
  );
}

function CalendarComponent() {
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
    return (
        <View>
            <View style={[, {justifyContent:'space-evenly', paddingHorizontal:scale(20), backgroundColor:'#FFF', height: scale(55), flexDirection:'row', flex: 1}]}>
                <View 
                    style={{
                        // flex:1,
                        width: scale(24),
                        backgroundColor:'',
                        justifyContent:'center',}}>
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <SvgXml xml={CalendarIcon}/>
                        </TouchableOpacity>
                </View>

                <View
                  style={{ flex:1, justifyContent:'center',  alignItems:'flex-end'}}  >
                   <DatePicker
                    style={{color:'#1A1A1A',}}
                    date={dateFrom}
                    mode="date"
                    placeholder="__/__/____"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'relative',
                        width: 0,
                        height: 0
                      },
                      dateInput: {
                        borderWidth: 0,
                        alignItems:'flex-end',
                        textAlign:'right'
                      }
                    }}
                    onDateChange={(date) => setDateFrom(date)}
                  />
                </View>
                <View
                  style={{ width: scale(5), paddingHorizontal: scale(0), justifyContent:'center',  alignItems:'center'}} >
                    <Text style={{color:'#7D7D7D'}}>-</Text>
                  </View>
                <View
                  style={{ flex:1, justifyContent:'center',  alignItems:'flex-start', color:'#1A1A1A'}}  >
                   <DatePicker
                    style={{color:'#1A1A1A'}}
                    date={dateTo}
                    mode="date"
                    placeholder="__/__/____"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        width: 0
                      },
                      dateInput: {
                        borderWidth: 0,
                        alignItems:'flex-start',
                        paddingLeft: scale(8)
                      }
                    }}
                    onDateChange={(date) => setDateTo(date)}
                  />
                </View>
                <View 
                    style={{
                        // flex:1,
                        justifyContent: 'center',
                        width: scale(24),
                        backgroundColor:'' }}>
                        <TouchableOpacity
                            onPress={() => {setDateFrom(""); setDateTo("")}}
                        >
                            <SvgXml xml={CloseCircleIcon}/>
                        </TouchableOpacity>
                </View>
          </View>
          <View style={styles.separator} />
        </View>
    );
  }

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
        <Drawer.Navigator drawerStyle = {{width: scale(335), backgroundColor:'rgba(26, 44, 60, 0.92)'}} drawerWidth = {500} drawerPosition = {'left'} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="BackgroungComponet" component={LikeScreen} />
        </Drawer.Navigator>
  );
}


export default function FilterOptionsScreen() {
  return (
      <MyDrawer />
  );
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
  