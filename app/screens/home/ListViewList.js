import React from 'react';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import Text from '../../component/Text';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../libs/reactSizeMatter/scalingUtils';
//import Image from '../../component/Image';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../../utils/CommonStyles';
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../assets/svg/Play.svg';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
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
];

function Item({item, index}) {
  const {image} = item;
  return (
    <View>
      <View
        style={{
          marginRight: scale(16),
          marginBottom: scale(30),
        }}>
        <Image
          style={{
            width: scale(335),
            height: verticalScale(175),
            borderRadius: scale(10),
          }}
          source={image}
        />
        <LinearGradient
          colors={['rgba(69, 77, 102, 0)', 'rgba(69, 77, 102, 0.7)']}
          style={[styles.linearGradient]}>
          <View style={styles.playButton}>
            <SvgXml xml={PlayIcon} />
          </View>
          <Text style={styles.totalTime}>05:20</Text>
        </LinearGradient>
        <Text style={styles.title}>
          RIGHT EFFORT DOES NOT MEAN STRONG EFFORT
        </Text>
        <Text
          style={{
            fontSize: moderateScale(13),
            color: '#7D7D7D',
            ...Fonts.defaultItalic,
          }}>
          Switzerland Retreat C4 Group Interview 20160527 (2:53:33-2:55:21)
          (2:53:33-2:55:21)
        </Text>
      </View>
    </View>
  );
}

function ListViewList() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingLeft: scale(20),
          paddingTop: scale(15),
        }}
        numColumns={1}
        data={DATA}
        renderItem={({item, index}) => <Item item={item} index={index} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(18),
    color: '#000000',
    marginVertical: scale(10),
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: scale(335),
    height: verticalScale(175),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: scale(10),
  },
  playButton: {
    width: scale(48),
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26, 0.45)',
    borderRadius: scale(24),
  },
});

export default ListViewList;
