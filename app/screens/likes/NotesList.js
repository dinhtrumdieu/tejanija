import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, RefreshControl} from 'react-native';
import NoteItem from './item/NoteItem';
import EventRegister, {RELOAD_EVENT} from '../../utils/EventRegister';

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

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function NotesList(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.memoizedCallback();
    wait(1000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);
  const data = [...props.data].reverse();
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      bounces={true}
      data={data}
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
