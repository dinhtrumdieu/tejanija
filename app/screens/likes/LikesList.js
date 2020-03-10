import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import LikeItem from './item/LikeItem';
import {CommonStyles} from '../../utils/CommonStyles';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';

const DATA = [{}, {}];

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

function LikesList() {
  return (
    <FlatList
      bounces={true}
      data={DATA}
      renderItem={({item, index}) => (
        <LikeItem
          getSwipeItemIsOpen={() => getSwipeRef(index)}
          onCloseOldSwipe={() => onClose(index)}
          ref={ref => (this[`item_${index}`] = ref)}
          item={item}
          index={index}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    ...CommonStyles.separatorStyle,
    marginLeft: scale(20),
  },
});

export default LikesList;
