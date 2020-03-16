import React, {useState, useRef} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Text from '../../component/Text';
import {scale, moderateScale} from '../../libs/reactSizeMatter/scalingUtils';
import {SvgXml, SvgCss} from 'react-native-svg';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles';
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const OnBoardingScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef();
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
  ];

  var slides = [];

  const entriesSplitter = () => {
    let size = 1; //Based on the size you want
    while (entries.length > 0) {
      slides.push(entries.splice(0, size));
    }
  };

  // render every single slide
  const _renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {item.map(item => {
          return (
            <ImageBackground
              key={index}
              source={require('../../../assets/images/bg_board.png')}
              style={styles.backgroundImage}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.textTop}>{item.title}</Text>
                </View>

                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.textCenter}>{item.header}</Text>
                  <Text style={styles.textContentCenter}>{item.content}</Text>
                </View>

                <View
                  style={{
                    bottom: -50,
                    flex: 3,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.buttonStart}
                    onPress={() => {}}>
                    <Text style={styles.textStart}>Get started</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{paddingTop: 0}}>
      {entriesSplitter()}
      <Carousel
        ref={carousel}
        data={slides}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={screenWidth}
        autoplay={true}
        autoplayInterval={2000}
        loop={true}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{flex: 3}} />
        <View style={{flex: 3}}>
          <Pagination
            dotsLength={3} // also based on number of sildes you want
            activeDotIndex={activeSlide}
            containerStyle={{backgroundColor: '', borderWidth: 0}}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={{
              backgroundColor: '#000',
            }}
            inactiveDotOpacity={0.65}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{flex: 3}} />
      </View>
    </View>
  );
};

export default OnBoardingScreen;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: screenWidth,
    height: screenHeight,
  },
  textTop: {
    fontSize: scale(32),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
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
  buttonStart: {
    width: scale(355),
    height: scale(42),
    borderRadius: scale(21),
    backgroundColor: '#58B368',
    alignItems: 'center',
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
});
