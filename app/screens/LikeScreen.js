import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import Text from '../component/Text';
import {CommonColors, CommonStyles} from '../utils/CommonStyles';
import {scale, moderateScale} from '../libs/reactSizeMatter/scalingUtils';
import {SvgXml} from 'react-native-svg';
import MenuIcon from '../../assets/svg/menu_three.svg';
import FilterIcon from '../../assets/svg/Filter.svg';
import CloseIcon from '../../assets/svg/Icon_close_white.svg';

import LikesList from './likes/LikesList';
import NotesList from './likes/NotesList';
import {_getPost} from '../store/AsyncStorage';
import _ from 'lodash';
import EventRegister, {RELOAD_EVENT} from '../utils/EventRegister';
import Realm from 'realm';
import Quote from '../realm/schema/Quotes';

export default function LikeScreen({navigation}) {
  const [tab, setTab] = React.useState(0);
  const [note, setNote] = React.useState('A Yogi’s Note');
  const [data, setData] = useState([]);
  const fetchData = () => {
    async function getData() {
      return await _getPost();
    }
    getData().then(result => {
      setData(JSON.parse(result));
    });
  };

  useEffect(() => {
    fetchData();
    this.event = EventRegister.on(RELOAD_EVENT, () => fetchData());
    // Specify how to clean up after this effect:
    return () => {
      EventRegister.off(this.event);
    };
  }, []);

  const memoizedCallback = useCallback(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <SvgXml style={{marginLeft: scale(15)}} xml={FilterIcon} />
          </TouchableOpacity>
          {!_.isEmpty(note) && (
            <View
              style={{
                // flexDirection:'row',
                height: scale(24),
                borderRadius: scale(12),
                borderWidth: scale(1),
                borderColor: '#FFF',
                paddingLeft: scale(10),
                paddingRight: scale(6.67),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: moderateScale(13),
                    textAlign: 'center',
                  }}>
                  {note}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setNote('');
                    //deleteNoteFilter;
                  }}>
                  <SvgXml style={{marginLeft: scale(10)}} xml={CloseIcon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {tab === 0 && <LikesList />}
        {tab === 1 && (
          <NotesList
            memoizedCallback={memoizedCallback}
            data={data}
            navigation={navigation}
          />
        )}
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
