import React from 'react';
import {StyleSheet, Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
import {scale, moderateScale} from '../../libs/reactSizeMatter/scalingUtils';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
export const LIST_ITEM_HEIGHT = scale(52);
export default function Item(props) {
  const {item, key, selected, onSelect } = props;

  return (
      <TouchableOpacity
      onPress={()=>{saveNoteFilter(item.name); onSelect(item.name)}}

      >
        <View style={{marginLeft: scale(20)}}>
            <View style={[styles.container]}>
                <Text style={[styles.name, selected && {color: '#309975', }]}>{item.name}</Text>
            </View>
            <View style={styles.separator} />
        </View>
      </TouchableOpacity>
  );
}
const saveNoteFilter = async note => {
    try {
      await AsyncStorage.setItem('note', note);
      console.warn("note", note)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
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
    fontSize: moderateScale(16),
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
