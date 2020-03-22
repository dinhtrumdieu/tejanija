import React, {useState, useRef} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';
import Text from '../../component/Text';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../assets/svg/play_icon.svg';
import RightIcon from '../../../assets/svg/chervon-right-green.svg';
import {
  CommonColors,
  CommonStyles,
  ShadowStyle,
} from '../../utils/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import Carousel from 'react-native-anchor-carousel';
import BackButton from '../../component/BackButton';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const entries = [
  {
    title: 'Wisdom’s road ',
    header: 'Heading',
    content:
      'Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
  {
    title: 'Abcfd’s road ',
    header: '22Heading',
    content:
      '22Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
  {
    title: 'Xyhdhde’s road ',
    header: '33Heading',
    content:
      '33Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
  {
    title: 'Wisdom’s road ',
    header: 'Heading',
    content:
      'Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
  {
    title: 'Abcfd’s road ',
    header: '22Heading',
    content:
      '22Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
  {
    title: 'Xyhdhde’s road ',
    header: '33Heading',
    content:
      '33Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea',
  },
];

const list1 = [
  {id: 1, count: '23', title: 'Confidence'},
  {id: 2, count: '4523', title: 'Effort'},
  {id: 3, count: '33', title: 'Awareness 1'},
  {id: 4, count: '13', title: 'Stability'},
  {id: 2, count: '45', title: 'Effort'},
  {id: 3, count: '33', title: 'Awareness 1'},
  {id: 4, count: '13', title: 'Stability'},
  {id: 2, count: '45', title: 'Effort'},
  {id: 3, count: '33', title: 'Awareness 1'},
  {id: 4, count: '13', title: 'Stability'},
  {id: 3, count: '33', title: 'Awareness 1'},
  {id: 4, count: '13', title: 'Stability'},
  {id: 2, count: '45', title: 'Effort'},
  {id: 3, count: '33', title: 'Awareness 1'},
  {id: 4, count: '13', title: 'Stability'},
];

const MenuScreen = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [list, setList] = React.useState(list1);

  const renderItemFlatlist = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('List', {title: item.title, type: 2})
        }
        style={{paddingHorizontal: scale(16)}}>
        <View
          style={{
            flex: 1,
            height: scale(50),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{flex: 1, fontSize: scale(18), fontWeight: 'normal'}}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: scale(15),
                minWidth: scale(24),
                borderRadius: scale(12),
                backgroundColor: '#454D66',
                marginRight: scale(16),
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: scale(11),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  paddingHorizontal: scale(6),
                }}>
                {item.count}
              </Text>
            </View>
            <SvgXml xml={RightIcon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemCarousel = ({item, index}) => {
    const {backgroundColor} = item;
    return (
      <TouchableWithoutFeedback
        style={[{backgroundColor}]}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
          navigation.navigate('List', {title: item.title, type: 1});
        }}>
        <View style={[styles.viewContainerImage]}>
          <ImageBackground
            source={require('../../../assets/images/bg_board.png')}
            imageStyle={{borderRadius: scale(10)}}
            style={[styles.backgroundImage]}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 3,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.textTop}>{item.title}</Text>
              </View>
              <View style={{flex: 3, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.buttonPlay} onPress={() => {}}>
                  <SvgXml xml={PlayIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        headerStyle={{backgroundColor: '#FFF'}}
        type={1}
        left={<BackButton isShowBackLabel={true} />}
      />
      <View
        style={{
          marginLeft: scale(16),
          marginTop: scale(30),
          marginBottom: scale(15),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Collection</Text>
          <View style={{justifyContent: 'center', flex: 1}}>
            <View
              style={[
                CommonStyles.separatorStyle,
                {
                  marginLeft: scale(16),
                  marginRight: scale(0),
                  backgroundColor: '#309975',
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          style={{paddingHorizontal: scale(16), flex: 1}}
          contentContainerStyle={{
            paddingRight: scale(30),
            flexGrow: 1,
          }}
          data={entries}
          renderItem={renderItemCarousel}
          itemWidth={scale(247)}
          containerWidth={screenWidth - scale(0)}
          separatorWidth={-scale(6)}
          ref={carouselRef}
          // pagingEnable={false}
          // minScrollDistance={20}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        bounces={true}
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItemFlatlist}
        contentContainerStyle={{
          paddingBottom: scale(10),
          paddingTop: scale(15),
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  viewContainerImage: {
    width: scale(247),
    height: scale(130),
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: scale(247),
    height: scale(130),
    borderRadius: scale(10),
    ...ShadowStyle,
  },
  textTop: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
    marginHorizontal: scale(16),
  },
  textCenter: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  textContentCenter: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: '#FFF',
    textAlign: 'center',
  },
  buttonPlay: {
    marginLeft: scale(16),
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26,26,26, 0.45)',
    borderRadius: scale(12),
  },
  buttonRight: {
    width: scale(6),
    height: scale(12),
    justifyContent: 'center',
  },
  textStart: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#1A2C3C',
    textAlign: 'center',
  },
  dotStyle: {
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    marginHorizontal: 0,
    backgroundColor: '#FFF',
  },
  textHeader: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  carouselContainer: {
    height: scale(160),
  },
  carousel: {
    flex: 1,
  },
  separator: {
    ...CommonStyles.separatorStyle,
    marginHorizontal: scale(20),
  },
});
