
import React, { useState, useRef } from "react";
import { View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList , Button} from "react-native";
import Text from '../../../component/Text';
import { scale } from '../../../libs/reactSizeMatter/scalingUtils'
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../../assets/svg/play_icon.svg'
import RightIcon from '../../../../assets/svg/Chevron-right.svg';
import {CommonColors, CommonStyles} from '../../../utils/CommonStyles'
import {useNavigation} from '@react-navigation/native';



import Header from '../../../component/Header';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CollectionListScreen = () => {
// const item = useNavigationParam('data');
const navigation = useNavigation();
const entries = [
    {
      title: "Wisdom’s road ",
      header: "Heading",
      content: "Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea",
    },
    {
      title: "Abcfd’s road ",
      header: "22Heading",
      content: "22Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea",
    },
    {
      title: "Xyhdhde’s road ",
      header: "33Heading",
      content: "33Non veniam sint reprehenderit ea minim consequat ipsum consectetur qui quis cupidatat sint ipsum fugiat ad ex elit aliqua ea",
    },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { },
    { }
];

const CellComponent = ({item}) => {
    return (
        <View style={{marginHorizontal: scale(16), flex: 1}}>
            <Image 
                source={require('../../../../assets/images/bg_board.png')}
                style={styles.img}>
                
            </Image>
            <Text 
                onPress={() => navigation.navigate('CollectionItemDetailScreen', { data: item })}
                style={styles.textTitle}>
            CHECK THE ENERGY USED
            </Text>
            <Text style={styles.textContent}>
            Shwe Oo Min Dhammasukha Tawya 2014 Vassa QA File: R05_0006
            </Text>

        </View>

    );
}

return (
    <View >
        <Header
            headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
            type={0}
            center={<Text style={CommonStyles.headerTitle}>Effort</Text>}
            left={<Text style={CommonStyles.headerTitle} onPress={() => navigation.goBack()}>Back</Text>}
        />

        <View style={{ marginVertical: scale(0)}}>
            <FlatList
                bounces={true}
                data={entries}
                keyExtractor={item => item.id}
                renderItem={CellComponent}
            />
        </View>
    </View>
  
);
};

export default CollectionListScreen;
const styles = StyleSheet.create({

  img:{
        marginTop: scale(30),
        borderRadius: scale(10),
        width: '100%',
        height: scale(215),
        // aspectRatio: 16 / 9,
        // resizeMode: 'stretch'
    },
    textTitle:{
        fontSize: scale(18),
        fontWeight:'normal',
        color:'#000',
        textAlign: 'left',
        textTransform: 'uppercase',
        marginVertical: scale(10)
      },
      textContent:{
          fontSize: scale(13),
          fontWeight:'normal',
          color:'#7D7D7D',
          textAlign: 'left',
          fontStyle: 'italic'
        }
  

});