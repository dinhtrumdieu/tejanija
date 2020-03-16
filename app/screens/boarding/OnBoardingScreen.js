
import React, { useState, useRef } from "react";
import { View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
import Text from '../../component/Text';
import { scale, moderateScale } from '../../libs/reactSizeMatter/scalingUtils'
import Swiper from 'react-native-swiper'

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

return (
      <ImageBackground 
        source={require('../../../assets/images/bg_board.png')}
        style={[styles.backgroundImage, {flex: 1}]}>
          <Swiper 
            style={styles.wrapper}
            height={200}
            horizontal={true}
            // autoplay
            dot={<View style={{backgroundColor: 'white', opacity: 0.25, width: scale(8), height: scale(8), borderRadius: scale(4), marginLeft: scale(8), marginRight: scale(5), marginTop: scale(5), marginBottom: scale(5)}} />}
            activeDot={<View style={{backgroundColor: '#FFFFFF', width: scale(10), height: scale(10), borderRadius: scale(5), marginLeft: scale(5), marginRight: scale(5), marginTop: scale(5), marginBottom: scale(5)}} />}
            >
            {entries.map((item, index) => {
              return(
                <View style={[{ flex: 1}]} key={index}>
                  <View style={{ flex: 3, alignItems:'center', alignContent:'center', justifyContent: 'center'}}>
                    <Text style={styles.textTop}>{item.title}</Text>
                  </View>
                  <View style={{ flex: 3, alignItems:'center', alignContent:'center', justifyContent: 'center'}}>
                    <Text style={styles.textCenter}>{item.header}</Text>
                    <Text style={styles.textContentCenter}>{item.content}</Text>
                  </View>

                  <View style={{bottom: -50, flex: 3, alignItems:'center', alignContent:'center', justifyContent: 'center'}}>
                    {index == 2 ? <TouchableOpacity 
                      style={styles.buttonStart}
                      onPress={() => {}}>
                      <Text style={styles.textStart}>Get started</Text>
                    </TouchableOpacity> : <View></View>}
                  </View>
                </View>
            )
            })}
          </Swiper>
      </ImageBackground>
)
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
  
});
