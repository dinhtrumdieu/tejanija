import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {SvgXml, SvgCss} from 'react-native-svg';
import Text from '../component/Text';
import MenuIcon from '../../assets/svg/Menu.svg';
import MenuWhiteIcon from '../../assets/svg/Menu_white.svg';
import BgViewIcon from '../../assets/svg/Bg-view.svg';
import GridViewIcon from '../../assets/svg/Grid-view.svg';
import SearchIcon from '../../assets/svg/Search.svg';
import SearchWhiteIcon from '../../assets/svg/Search_white.svg';
import NotificationIcon from '../../assets/svg/Bell.svg';
import NotificationWhiteIcon from '../../assets/svg/Bell_white.svg';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonSize, Fonts} from '../utils/CommonStyles';
import BackgroundViewList from './home/BackgroundViewList';
import GridViewList from './home/GridViewList';
import ListViewList from './home/ListViewList';

export default function HomeScreen({navigation}) {
  const [type, setType] = React.useState(0);
  return (
    <View style={{flex: 1}}>
      {type === 0 && <BackgroundViewList navigation={navigation} type={type} />}
      <View
        style={{
          flex: 1,
          paddingTop: CommonSize.headerHeight,
        }}>
        {type === 1 && <GridViewList />}
        {type === 2 && <ListViewList />}
      </View>

      <Header
        type={type}
        left={
          <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {type === 0 ? (
                <SvgXml xml={MenuWhiteIcon} />
              ) : (
                <SvgXml xml={MenuIcon} />
              )}
              <Text
                style={{
                  color: type === 0 ? '#fff' : '#1A1A1A',
                  ...Fonts.defaultBold,
                  marginLeft: scale(5),
                }}>
                Menu
              </Text>
            </View>
          </TouchableOpacity>
        }
        right={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setType(0)}>
              {type === 0 ? (
                <SvgXml xml={BgViewIcon} />
              ) : (
                <SvgXml xml={GridViewIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={{marginHorizontal: scale(30)}}>
              {type === 0 ? (
                <SvgXml xml={SearchWhiteIcon} />
              ) : (
                <SvgXml xml={SearchIcon} />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setType(2)}> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              {type === 0 ? (
                <SvgXml xml={NotificationWhiteIcon} />
              ) : (
                <SvgXml xml={NotificationIcon} />
              )}
            </TouchableOpacity>
          </View>
        }
        headerStyle={type === 0 ? styles.headerStyle : styles.headerWhite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: '100%',
    borderBottomWidth: 0,
  },
  headerWhite: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
