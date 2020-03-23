import React from "react";
import { StyleSheet, Text, View } from "react-native";

import List from "./List";
import { scale } from "../../libs/reactSizeMatter/scalingUtils";

const list = {
  name: "5 Spiritual Faculties Awareness 1",
  items: [
    { name: "Nathaniel Fitzgerald" },
    { name: "Lawrence Fullter Fitzgerald" },
    { name: "Jacob Mullins" },
    { name: "Jesus Lewis" },
    { name: "Johnny Marr"}
  ]
};
const list1 = {
    name: "A Yogi's Note ",
    items: [
      { name: "AAA" },
      { name: "BBB" },
      { name: "cccc" },
    ]
  };



export default function Accordion() {
  return (
    <View style={styles.container}>
      <List list={list} />
      <List list={list1} />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f4f6",
      padding: 0
    },
    title: {
      fontSize: 32,
      fontWeight: "bold"
    }
  });