import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  SwipeView,
  Image,
  Dimensions,
} from 'react-native';
import Text from '../../component/Text';
import {scale, moderateScale} from '../../libs/reactSizeMatter/scalingUtils';
import {SvgXml, SvgCss} from 'react-native-svg';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';
import Header from '../../component/Header';
import PostItem from './item/PostItem';
import ActionSheetItem from './item/ActionSheetItem';
import Notification1 from '../../../assets/svg/notification-empty.svg';
import BackButton from '../../component/BackButton';

const list1 = [
  {
    id: 1,
    name: 'Drowsiness',
    date: 'November 23, 2019',
    content: 'You need to practice – whenever the mind is thin... ',
    title: 'Dealing with wandering mind',
  },
  {
    id: 2,
    name: 'Restlessness',
    date: 'November 23, 2019',
    content: 'They are not important – just imagination. Don’t ... ',
    title: 'Images in the mind are just thoughts – nothing to fear',
  },
  {
    id: 3,
    name: 'Guided meditation',
    date: 'November 24, 2019',
    content: '',
    title: 'This meditation is for life, no need to ',
  },
  {
    id: 4,
    name: 'Burmese zen',
    date: 'November 24, 2019',
    content: 'Check your mind, what is the mind knowing?...',
    title:
      'Every object is very simple; it’s only thinking that makes it complicated.',
  },
  {
    id: 5,
    name: 'Drowsiness',
    date: 'November 23, 2019',
    content: 'You need to practice – whenever the mind is thin... ',
    title: 'Dealing with wandering mind',
  },
  {
    id: 6,
    name: 'Restlessness',
    date: 'November 23, 2019',
    content: 'They are not important – just imagination. Don’t ... ',
    title: 'Images in the mind are just thoughts – nothing to fear',
  },
  {
    id: 2,
    name: 'Restlessness',
    date: 'November 23, 2019',
    content: 'They are not important – just imagination. Don’t ... ',
    title: 'Images in the mind are just thoughts – nothing to fear',
  },
  {
    id: 3,
    name: 'Guided meditation',
    date: 'November 24, 2019',
    content: '',
    title: 'This meditation is for life, no need to ',
  },
  {
    id: 4,
    name: 'Burmese zen',
    date: 'November 24, 2019',
    content: 'Check your mind, what is the mind knowing?...',
    title:
      'Every object is very simple; it’s only thinking that makes it complicated.',
  },
  {
    id: 5,
    name: 'Drowsiness',
    date: 'November 23, 2019',
    content: 'You need to practice – whenever the mind is thin... ',
    title: 'Dealing with wandering mind',
  },
  {
    id: 6,
    name: 'Restlessness',
    date: 'November 23, 2019',
    content: 'They are not important – just imagination. Don’t ... ',
    title: 'Images in the mind are just thoughts – nothing to fear',
  },
];

export default function Notifications() {
  const [tabSelected, setTabSelected] = React.useState(1);
  const [isShow, setIsShow] = React.useState(false);
  const [list, setList] = React.useState(list1);
  const [isRead, setIsRead] = React.useState(false);
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected],
  );
  return (
    <View style={styles.container}>
      <Header
        headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
        type={0}
        left={<BackButton white={true} isShowBackLabel={false} />}
        center={<Text style={CommonStyles.headerTitle}>Notifications</Text>}
        right={
          <ActionSheetItem
            deleteAllItem={() => deleteAllItem()}
            markAllRead={() => markAllRead()}
          />
        }
      />
      <View style={styles.containerSwitch}>
        <TouchableWithoutFeedback onPress={() => setTabSelected(1)}>
          <View
            style={[
              styles.activeTab1,
              tabSelected === 1
                ? {backgroundColor: '#309975'}
                : styles.inActiveTab1,
            ]}>
            {tabSelected !== 1 ? (
              <Text style={styles.labelTextInactive}>Post</Text>
            ) : (
              <Text style={styles.labelTextActive}>Post</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setTabSelected(2)}>
          <View
            style={[
              styles.activeTab2,
              tabSelected === 2
                ? {backgroundColor: '#309975'}
                : styles.inActiveTab2,
            ]}>
            {tabSelected !== 2 ? (
              <Text style={styles.labelTextInactive}>System</Text>
            ) : (
              <Text style={styles.labelTextActive}>System</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {list.length > 0 ? (
        <View style={{flex: 1}}>
          {tabSelected === 1 && <RenderTabPost />}
          {tabSelected === 2 && <RenderTabSystem />}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center',
            height: scale(300),
            width: scale(300),
            justifyContent: 'center',
          }}>
          <View style={{paddingBottom: scale(40)}}>
            <SvgXml xml={Notification1} />
            <Text style={{textAlign: 'center'}}>You have no notification.</Text>
          </View>
        </View>
      )}
    </View>
  );

  function getSwipeRef(index) {
    this.itemIsOpen = index;
  }

  function onClose(index) {
    if (this.itemIsOpen !== index) {
      if (this[`item_${this.itemIsOpen}`]) {
        this[`item_${this.itemIsOpen}`].close();
      }
    }
  }

  function markAllRead() {
    setIsRead(true);
  }

  function deleteAllItem() {
    const dataZero = [];
    setList(dataZero);
    // setList(list.splice(index,1))
  }

  function deleteItem(index) {
    const filterdata = list.filter(item => item.id !== index);
    setList(filterdata);
  }

  function RenderTabPost() {
    return (
      <FlatList
        bounces={true}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: scale(30), flexGrow: 1}}
        extraData={selected}
        renderItem={({item, index}) => (
          <PostItem
            getSwipeItemIsOpen={() => getSwipeRef(index)}
            onCloseOldSwipe={() => onClose(index)}
            ref={ref => (this[`item_${index}`] = ref)}
            item={item}
            index={index}
            type={''}
            isRead={isRead}
            deleteItem={() => deleteItem(index)}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }

  function RenderTabSystem() {
    return (
      <FlatList
        bounces={true}
        data={list}
        contentContainerStyle={{paddingBottom: scale(30), flexGrow: 1}}
        renderItem={({item, index}) => (
          <PostItem
            getSwipeItemIsOpen={() => getSwipeRef(index)}
            onCloseOldSwipe={() => onClose(index)}
            ref={ref => (this[`item_${index}`] = ref)}
            item={item}
            index={index}
            type={'sys'}
            isRead={isRead}
            deleteItem={() => deleteItem(index)}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    // marginTop: scale(30),
    flex: 1,
  },

  labelTextInactive: {
    color: '#309975',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  labelTextActive: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },

  activeTab1: {
    width: scale(168),
    height: scale(35),
    borderRadius: scale(0),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAD5A',
    borderBottomLeftRadius: scale(4),
    borderTopLeftRadius: scale(4),
  },
  activeTab2: {
    width: scale(168),
    height: scale(35),
    borderRadius: scale(0),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAD5A',
    borderBottomRightRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  inActiveTab1: {
    backgroundColor: 'white',
    borderWidth: scale(1),
    borderColor: '#309975',
    borderRightWidth: scale(0),
  },
  inActiveTab2: {
    backgroundColor: 'white',
    borderWidth: scale(1),
    borderColor: '#309975',
    borderLeftWidth: scale(0),
  },
  date: {
    paddingTop: scale(8),
    paddingBottom: scale(8),
    marginLeft: scale(18),
    marginRight: scale(18),
    fontSize: moderateScale(11),
    color: '#C4C4C4',
  },
  containerSwitch: {
    marginVertical: scale(16),
    marginTop: scale(3),
    marginBottom: scale(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleStatus: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#309975',
    marginRight: scale(10),
  },
  textContent: {
    paddingTop: scale(8),
    paddingBottom: scale(8),
    marginLeft: scale(18),
    marginRight: scale(18),
    fontSize: moderateScale(13),
    color: '#7D7D7D',
  },
  lineBottom: {
    flex: 1,
    height: scale(1),
    backgroundColor: '#000',
    marginLeft: scale(18),
    marginRight: scale(18),
  },
  textTitle: {
    fontSize: moderateScale(16),
    color: '#1A1A1A',
    fontWeight: '900',
  },
  separator: {
    ...CommonStyles.separatorStyle,
    marginLeft: scale(20),
  },
});
