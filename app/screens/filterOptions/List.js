import React, {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

import Animated from 'react-native-reanimated';
import {bInterpolate, useTransition} from 'react-native-redash';
import Chevron from './Chevron';
// import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import Item from './ListItem';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import {View} from 'react-native-animatable';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';

export default function List(props) {
  const {list} = props;
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const height = bInterpolate(transition, 0, scale(52) * list.items.length);
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    selected,
  );
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <View>
          <Animated.View >
            <View style={[styles.container, {}]}>
              <Text style={styles.title}>{list.name}</Text>
              <Chevron {...{transition}} />
            </View>
            <View style={styles.containerSelected}>
              <Text style={styles.titleSelected}>{selected}</Text>
            </View>
          </Animated.View>
          <View style={styles.separator} />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, {height}]}>
        {list.items.map((item, index) => (
          // <Item {...{ item, key }} isLast={key === list.items.length - 1} />
          <Item key={index} item={item} selected={!!selected.get(item.name)} onSelect={onSelect}/>
        ))}
      </Animated.View>
    </>
  );
}

const {interpolate} = Animated;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerSelected: {
    position:'absolute',
    bottom: scale(5),
    alignItems: 'flex-start',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'normal',
    color: '#1A1A1A',
  },
  titleSelected: {
    fontSize: moderateScale(13),
    fontWeight: 'normal',
    color: '#7D7D7D',
  },
  items: {
    overflow: 'hidden',
  },
  separator: {
    ...CommonStyles.separatorStyle,
  },
});
