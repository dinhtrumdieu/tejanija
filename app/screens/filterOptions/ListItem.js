import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
export const LIST_ITEM_HEIGHT = scale(52);
export default function Item(props) {
  const {item} = props;
  return (
    <View style={{marginLeft: scale(20)}}>
      <View style={[styles.container]}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
    height: LIST_ITEM_HEIGHT,
  },
  name: {
    fontSize: scale(16),
  },
  pointsContainer: {
    borderRadius: scale(8),
    backgroundColor: '#44c282',
    padding: scale(8),
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    ...CommonStyles.separatorStyle,
  },
});
