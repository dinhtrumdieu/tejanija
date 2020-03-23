import React from "react";
import { StyleSheet, processColor, Text} from "react-native";
// import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { bInterpolate, bInterpolateColor } from "react-native-redash";
import Icon_Down from '../../../assets/svg/Icon_Chevron_Down.svg'
import {SvgXml} from 'react-native-svg';
import { scale } from "../../libs/reactSizeMatter/scalingUtils";

const size = scale(30);
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface ChevronProps {
  transition: Animated.Node<number>;
}

export default ({ transition }: ChevronProps) => {
  const rotateZ = bInterpolate(transition, Math.PI, 0);
  const backgroundColor = bInterpolateColor( transition, processColor(""), processColor(""))
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }], backgroundColor }]}
    >
      <SvgXml xml={Icon_Down}/>
    </Animated.View>
  );
};