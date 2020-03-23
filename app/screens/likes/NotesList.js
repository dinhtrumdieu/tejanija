import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import NoteItem from './item/NoteItem';
import {_getPost} from '../../store/AsyncStorage';

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

function NotesList(props) {
  return (
    <FlatList
      bounces={true}
      data={props.data}
      renderItem={({item, index}) => (
        <NoteItem
          navigation={props.navigation}
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

const styles = StyleSheet.create({});

export default NotesList;
