import React from 'react';
import { Animated, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings/index';
import ConfirmDialog from '../component/ConfirmDialog';
import MessageDialog from '../component/MessageDialog';

const elements = [];
export default class DialogUtil {
  static async showDialog(content, onConfirmClick, onRejectClick) {
    const animated = new Animated.Value(0.1);
    await animated.setValue(0.1);
    await Animated.spring(
      animated,
      {
        toValue: 1,
        // velocity: 0,
        tension: 65,
        friction: 5,
      },
    ).start();
    const sibling = new RootSiblings(
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ transform: [{ scale: animated }] }}>
          <ConfirmDialog
            content={content}
            onConfirmClick={() => {
              DialogUtil.dismiss();
              if (onConfirmClick) {
                onConfirmClick();
              }
            }}
            onRejectClick={() => {
              DialogUtil.dismiss();
              if (onRejectClick) {
                onRejectClick();
              }
            }}
          />
        </Animated.View>
      </View>,
    );
    await elements.push(sibling);
  }

  static async showMessageDialog(content, onConfirmClick) {
    const animated = new Animated.Value(0.1);
    await animated.setValue(0.1);
    await Animated.spring(
      animated,
      {
        toValue: 1,
        // velocity: 0,
        tension: 65,
        friction: 5,
      },
    ).start();
    const sibling = new RootSiblings(
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View style={{ transform: [{ scale: animated }] }}>
          <MessageDialog
            content={content}
            onConfirmClick={() => {
              DialogUtil.dismiss();
              if (onConfirmClick) {
                onConfirmClick();
              }
            }}
            onRejectClick={() => {
              DialogUtil.dismiss();
              if (onRejectClick) {
                onRejectClick();
              }
            }}
          />
        </Animated.View>
      </View>,
    );
    await elements.push(sibling);
  }

  static dismiss() {
    const lastSibling = elements.pop();
    lastSibling && lastSibling.destroy();
  }
}
