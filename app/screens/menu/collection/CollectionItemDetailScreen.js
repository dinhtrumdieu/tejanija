
import React, { useState, useRef } from "react";
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList , Button} from "react-native";
import Text from '../../../component/Text';
import { scale } from '../../../libs/reactSizeMatter/scalingUtils'
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../../assets/svg/play_icon.svg'
import RightIcon from '../../../../assets/svg/Chevron-right.svg';
import {CommonColors, CommonStyles} from '../../../utils/CommonStyles'
import {useNavigation} from '@react-navigation/native';

import Header from '../../../component/Header';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const textDetail = "Momentum is also one of the nature that we can make use of. If we continuously cultivate a wholesome quality of mind, that wholesome quality will become stronger; and it will come more naturally to the mind. It will become a habit of the mind, and it can become a power of the mind. That’s what I call momentum.\n\n Something that we’re cultivating becomes strong enough to live on its own like the mindfulness remembering to remember on its own, the mindfulness coming naturally and having a momentum that it keeps remembering to be mindful without putting in the effort. And that’s momentum.\n\nUnderstand this nature of how momentum can be gained so that we can relaxingly do something repeatedly to make it powerful.\n\nIf we do this for the wholesome qualities of the mind, they become paramis or perfections because we keep fulfilling the wholesome qualities of the mind until they become more powerful, more perfect.\n\nMomentum is the direct result of the fact that cause and effect is there.\n\nIf every mind arose and passed away, and left nothing behind, then it would not be possible to grow any quality in the mind."

const CollectionItemDetailScreen = () => {
// const item = useNavigationParam('data');
const navigation = useNavigation();
const entries = [
    
    { }
];



return (
    <View >
        <Header
            headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
            type={0}
            center={<Text style={CommonStyles.headerTitle}>Right effort does not...</Text>}
            left={<Text style={CommonStyles.headerTitle} onPress={() => navigation.goBack()}>Back</Text>}
        />

        <View style={{marginHorizontal: scale(16), }}>
            <ScrollView
                contentContainerStyle={{flexGrow:1}}
                // showsHorizontalScrollIndicator={true}>
            >
            <Image 
                source={require('../../../../assets/images/bg_board.png')}
                style={styles.img}>
            </Image>
            <Text style={styles.textTitle}>
                Right effort does not mean strong effort
            </Text>
            <Text style={styles.textDescription}>
                Shwe Oo Min Dhammasukha Tawya 2014 Vassa QA File: R05_0006
            </Text>
            <Text style={styles.textContent}>{textDetail}</Text>     
            </ScrollView>
        </View>
            

    </View>
  
);
};

export default CollectionItemDetailScreen;
const styles = StyleSheet.create({

  img:{
        marginTop: scale(16),
        borderRadius: scale(10),
        width: '100%',
        height: scale(215),
        // aspectRatio: 16 / 9,
        // resizeMode: 'stretch'
    },
    textTitle:{
        fontSize: scale(24),
        fontWeight:'normal',
        color:'#1A1A1A',
        textAlign: 'left',
        textTransform: 'uppercase',
        marginVertical: scale(10)
      },
      textDescription:{
          fontSize: scale(13),
          fontWeight:'normal',
          color:'#7D7D7D',
          textAlign: 'left',
          fontStyle: 'italic'
        },
    textContent:{
        marginTop: scale(16),
        fontSize: scale(15),
        fontWeight:'normal',
        color:'#1A1A1A',
        // textAlign: 'left',
        }


});