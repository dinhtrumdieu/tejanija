import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Animated from "react-native-reanimated";
import { bInterpolate, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
// import Item, { LIST_ITEM_HEIGHT, ListItem } from "./ListItem";
import Item from "./ListItem";
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import { View } from "react-native-animatable";
import { scale } from "../../libs/reactSizeMatter/scalingUtils";

  export default function List(props) {
  const {list} = props
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const height = bInterpolate(
    transition,
    0,
    scale(52)* list.items.length
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <View>
          <Animated.View
            style={[ styles.container, { }  ]} >
            <Text style={styles.title}>{list.name}</Text>
            <Chevron {...{ transition }} />
            
          </Animated.View>
          <View style={styles.separator}></View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          // <Item {...{ item, key }} isLast={key === list.items.length - 1} />
          <Item item={item}/>
        ))}
      </Animated.View>
    </>
  );
};

const { interpolate } = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: "white",
    padding: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  title: {
    fontSize: scale(18),
    fontWeight: "normal",
    color:'#1A1A1A'
  },
  items: {
    overflow: "hidden",
  },
  separator: {
    ...CommonStyles.separatorStyle,
    marginHorizontal: scale(20),
  }
 
});