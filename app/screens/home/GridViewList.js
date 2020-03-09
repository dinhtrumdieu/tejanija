import React from 'react';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import Text from '../../component/Text';
import {moderateScale, scale, verticalScale} from '../../libs/reactSizeMatter/scalingUtils';
//import Image from '../../component/Image';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../../utils/CommonStyles';

const DATA = [
  [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      video: true,
      image: require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      video: false,
      image: require('../../../assets/demo/17049efa376cd9bf8d7c0af72238784c.jpg'),
    },
  ],
  [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      video: false,
      image: require('../../../assets/demo/gradient_pink_shades_130856_1350x2400.jpg'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      video: true,
      image: require('../../../assets/demo/Many-pink-flowers-background-color-layers_iphone_320x480.jpg'),
    },
  ],
];

function renderContent(item, index, height, style) {
  const {image} = item;
  return (
    <View
      style={{
        width: scale(160),
        marginRight: scale(16),
        marginBottom: scale(30),
      }}>
      <Image
        style={{
          width: scale(160),
          height: height,
          borderRadius: scale(10),
        }}
        source={image}
      />
      <LinearGradient
        colors={['rgba(69, 77, 102, 0)', 'rgba(69, 77, 102, 0.7)']}
        style={[styles.linearGradient, {height: height}]}>
        <View style={styles.bottom}>
          <Text style={styles.category}>Confidence</Text>
          <Text style={styles.totalTime}>05:20</Text>
        </View>
      </LinearGradient>
      <Text style={styles.title}>
        WHEN THE PRACTICE IS CORRECT, FAITH INCR...
      </Text>
    </View>
  );
}

function Item({item, index}) {
  const video_height = scale(215);
  const content_height = scale(160);
  if (index % 2 === 0) {
    return (
      <View>
        {renderContent(item[0], index, video_height)}
        {renderContent(item[1], index, content_height)}
      </View>
    );
  } else {
    return (
      <View>
        {renderContent(item[0], index, content_height)}
        {renderContent(item[1], index, video_height)}
      </View>
    );
  }
}

function GridViewList() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingLeft: scale(20),
          paddingTop: scale(15),
        }}
        numColumns={2}
        data={DATA}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(13),
    color: '#000000',
    marginTop: scale(10),
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: scale(160),
    height: scale(215),
    borderRadius: scale(10),
  },
  category: {
    color: '#fff',
    fontSize: moderateScale(11),
    backgroundColor: '#309975',
    padding: scale(5),
    borderRadius: scale(3),
    overflow: 'hidden',
  },
  totalTime: {
    color: '#fff',
    fontSize: moderateScale(11),
    ...Fonts.defaultBold,
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: scale(10),
    width: '100%',
    paddingHorizontal: scale(8),
  },
});

export default GridViewList;
