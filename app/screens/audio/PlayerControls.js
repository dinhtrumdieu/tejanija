// @flow
import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {width} = Dimensions.get('window');
export const PLACEHOLDER_WIDTH = width / 3;

type PlayerControlsProps = {
  title: string,
  onPress: () => mixed,
};

export default class PlayerControls extends React.PureComponent<PlayerControlsProps> {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <Text style={styles.title} numerOfLine={3}>
            {'test'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
    padding: 8,
  },
});
