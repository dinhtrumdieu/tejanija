import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button
} from 'react-native';
import Text from '../component/Text';
import {CommonColors, CommonStyles} from '../utils/CommonStyles';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import {SvgXml} from 'react-native-svg';
import MenuIcon from '../../assets/svg/menu_three.svg';
import FilterIcon from '../../assets/svg/Filter.svg';
import LikesList from './likes/LikesList';
import NotesList from './likes/NotesList';

export default function LikeScreen({ navigation }) {
  const [tab, setTab] = React.useState(0);
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          CommonStyles.header,
          {
            backgroundColor: 'rgba(26, 44, 60, 0.92)',
            borderBottomWidth: 0.5,
            borderColor: '#c7c7c7',
          },
        ]}>
        <View style={styles.tab}>
          <TouchableWithoutFeedback onPress={() => setTab(0)}>
            <View
              style={[
                styles.tabActive,
                {backgroundColor: tab === 0 ? '#1A2C3C' : 'transparent'},
              ]}>
              <Text style={styles.tabLabel}>Likes</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setTab(1)}>
            <View
              style={[
                styles.tabInActive,
                {backgroundColor: tab === 1 ? '#1A2C3C' : 'transparent'},
              ]}>
              <Text style={styles.tabLabel}>Notes</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <SvgXml xml={MenuIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.filterMenu}>
          <TouchableOpacity
          onPress={() => navigation.openDrawer()} 
          >
            <SvgXml style={{marginLeft: scale(15)}} xml={FilterIcon} />
          </TouchableOpacity>
        </View>
        {tab === 0 && <LikesList />}
        {tab === 1 && <NotesList />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabActive: {
    width: scale(123),
    height: scale(34),
    backgroundColor: '#1A2C3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#1A2C3C',
    borderTopLeftRadius: scale(4),
    borderBottomLeftRadius: scale(4),
  },
  tabInActive: {
    width: scale(123),
    height: scale(34),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#1A2C3C',
    borderBottomRightRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  tabLabel: {
    color: '#FFFFFF',
  },
  tab: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  menuIcon: {
    position: 'absolute',
    right: scale(16),
    bottom: scale(10),
  },
  filterMenu: {
    height: scale(40),
    width: '100%',
    backgroundColor: 'rgba(26, 44, 60, 0.92)',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
