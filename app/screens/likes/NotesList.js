import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import NoteItem from './item/NoteItem';
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

function NotesList() {
  return (
    <FlatList
      bounces={true}
      data={DATA}
      renderItem={({item, index}) => (
        <NoteItem
          getSwipeItemIsOpen={() => getSwipeRef(index)}
          onCloseOldSwipe={() => onClose(index)}
          ref={ref => (this[`item_${index}`] = ref)}
          item={item}
          index={index}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({

});

export default NotesList;
