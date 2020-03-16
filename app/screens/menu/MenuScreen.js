
import React, { useState, useRef } from "react";
import { View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList } from "react-native";
import Text from '../../component/Text';
import { scale } from '../../libs/reactSizeMatter/scalingUtils'
import {SvgXml} from 'react-native-svg';
import PlayIcon from '../../../assets/svg/play_icon.svg'
import RightIcon from '../../../assets/svg/chervon-right-green.svg';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles'
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import Carousel from 'react-native-anchor-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const MenuScreen = () => {
const navigation = useNavigation();
const carouselRef = useRef(null);
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
    },{
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
];

const list1 = [
    {id: 1, count: "23", title: "Confidence"},
    {id: 2, count: "45", title: "Effort"},
    {id: 3, count: "33", title: "Awareness 1"},
    {id: 4, count: "13", title: "Stability"},
    {id: 2, count: "45", title: "Effort"},
    {id: 3, count: "33", title: "Awareness 1"},
    {id: 4, count: "13", title: "Stability"},
    {id: 2, count: "45", title: "Effort"},
    {id: 3, count: "33", title: "Awareness 1"},
    {id: 4, count: "13", title: "Stability"}
]
const [list, setList] = React.useState(list1); 

const CellComponentV = ({item}) => {
    return(
        // <View style={{}}>
            <ImageBackground 
                source={require('../../../assets/images/bg_board.png')}
                style={[styles.backgroundImage, {marginRight: scale(16), borderRadius: scale(10)}]}>
                <View style={{ flex: 1}}>
                <View style={{ flex: 3, alignContent:'center', justifyContent: 'center'}}>
                    <Text style={styles.textTop}>{item.title}</Text>
                </View>

                <View style={{flex: 3, alignContent:'', justifyContent: 'center'}}>
                    <TouchableOpacity 
                    style={styles.buttonPlay}
                    onPress={() => {}}>
                    <SvgXml xml={PlayIcon}/>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        // </View>


    )
}

const CellComponentH = ({item}) => {
    return (
        <View style={{marginHorizontal: scale(16)}}>
            <View style ={[CommonStyles.separatorStyle,{marginTop: scale(5)}]}></View>
            <View style={{flex: 1, height: scale(50), flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Text style={{flex: 8, fontSize: scale(18), fontWeight: 'normal', }}>{item.title}</Text>
                <View style={{flex: 2, flexDirection:'row', marginRight: scale(0), right: scale(-20)}}>
                    <View style={{height: scale(15), width: scale(24), borderRadius: scale(12), backgroundColor:'#454D66', marginRight: scale(10)}}>
                        <Text style={{color:'#FFF', fontSize: scale(11), fontWeight: 'bold', textAlign: 'center'}}>{item.count}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.buttonRight}
                        onPress={(item) => {}}
                        // onPress={() => navigation.navigate('CollectionListScreen', { data: item })}
                    >

                        <SvgXml xml={RightIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}

const renderItemCarousel = ({item, index}) => {
    const {backgroundColor} = item;
        return (
            <TouchableOpacity style={[styles.item, {backgroundColor, }]}
                 onPress={() => { carouselRef.current.scrollToIndex(index); }}>
                    <View style={[styles.viewContainerImage, {marginLeft: scale(16)}]}>
                        <ImageBackground 
                            source={require('../../../assets/images/bg_board.png')}
                            imageStyle={{ borderRadius: scale(10) }}
                            style={[styles.backgroundImage, {marginRight: scale(16), }]}>
                            <View style={{ flex: 1}}>
                            <View style={{ flex: 3, alignContent:'center', justifyContent: 'center'}}>
                                <Text style={styles.textTop}>{item.title}</Text>
                            </View>
                            <View style={{flex: 3, alignContent:'', justifyContent: 'center'}}>
                                <TouchableOpacity 
                                style={styles.buttonPlay}
                                onPress={() => {}}>
                                <SvgXml xml={PlayIcon}/>
                                </TouchableOpacity>
                            </View>
                            </View>
                            </ImageBackground>
                    </View>
            </TouchableOpacity>)

}

return (
    <View >
        <Header
            headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
            type={0}
            // center={<Text style={CommonStyles.headerTitle}>Menu</Text>}
            left={<Text style={[CommonStyles.headerTitle, {color:'#fff'}]}>Back</Text>}
        />
        <View style={{ marginLeft: scale(16), marginVertical: scale(30)}}>
            <View style ={{flexDirection:"row"}}>
                <View style ={{}}>
                    <Text style ={styles.textHeader}>Collection</Text>
                </View>
                <View style ={{justifyContent:'center', flex: 1}}>
                    <View style ={[CommonStyles.separatorStyle, { marginLeft: scale(16), marginRight: scale(0), backgroundColor:'#309975'}]}></View>
                </View>
            </View> 
        </View>

     <View style={styles.carouselContainer}>
        <Carousel  style={styles.carousel}
                data={entries}
                renderItem={renderItemCarousel}
                itemWidth={scale(247)}
                containerWidth={screenWidth - 20} 
                separatorWidth={0}
                ref={carouselRef}
                // pagingEnable={false}
                // minScrollDistance={20}
                autoplay={true}
                autoplayInterval={2000}
                loop={true}
        />
    </View>
        <View style={{ marginVertical: scale(16)}}>
            <FlatList
                bounces={true}
                data={list}
                keyExtractor={item => item.id}
                renderItem={CellComponentH}
            />
        </View>
    </View>
  
);
};

export default MenuScreen;
const styles = StyleSheet.create({
  viewContainerImage: {
    // flex: 1,
    // alignSelf: 'stretch',
    width: scale(247),
    height: scale(130)
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: scale(247),
    height: scale(130),
    borderRadius: scale(10)
  },
  textTop:{
    fontSize: scale(20),
    fontWeight:'bold',
    color:'#FFF',
    textAlign: 'left',
    marginHorizontal: scale(16)
  },
  textCenter:{
    fontSize: scale(24),
    fontWeight:'bold',
    color:'#FFF',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  textContentCenter:{
    fontSize: scale(13),
    fontWeight: 'normal',
    color:'#FFF',
    textAlign: 'center'
  },
  buttonPlay: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    justifyContent: 'center',
    backgroundColor: "gray",
    opacity: .3,
    marginLeft: scale(16),
    alignItems: 'center'


  },
  buttonRight: {
    width: scale(6),
    height: scale(12),
    justifyContent: 'center',

  },
  textStart: {
    fontSize: scale(16),
    fontWeight:'bold',
    color:'#1A2C3C',
    textAlign: 'center'
  },
  dotStyle:{
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    marginHorizontal: 0,
    backgroundColor: '#FFF'
},
textHeader:{
    fontSize: scale(24),
    fontWeight:'bold',
    color:'#000',
    textAlign: 'left',
    textTransform: 'uppercase'
},
carouselContainer: {
    height:scale(140)  
},
carousel: {
    flex:1
} 
  

});



// import React, {useRef} from 'react';
// import Carousel from 'react-native-anchor-carousel';
// import { View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, Image, FlatList } from "react-native";


// const MenuScreen = () => {
// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// const carouselRef = useRef(null);
// const entries = [ { }, { }, { }, { }, { }, { }, { }, { }]

// return (
//     <View style={styles.carouselContainer}>
//      <Carousel  style={styles.carousel}
//                 data={entries}
//                 renderItem={renderItem}
//                 itemWidth={200}
//                 containerWidth={screenWidth - 20} 
//                 separatorWidth={0}
//                 ref={carouselRef}
//                 //pagingEnable={false}
//                 //minScrollDistance={20}
//             />
//     </View>
// )

//   const renderItem = ({item, index}) => {
//         const {backgroundColor} = item;
//         return (
//             <TouchableOpacity style={[styles.item, {backgroundColor}]}
//                               onPress={() => { carouselRef.current.scrollToIndex(index); }}>
//                  AAAAAA
//             </TouchableOpacity>)
//     };
// }
// export default MenuScreen;
 
//     const styles = StyleSheet.create({ 
       
//         carouselContainer: {
//             height:200  
//         },
//         	carousel: {
//                 flex:1
//         } 
//     })

//     import { Dimensions } from 'react-native';
// import SideSwipe from 'react-native-sideswipe';

// import CustomComponent from '...'
// import data from '...'

// export default class MenuScreen extends Component {
//   state = {
//     currentIndex: 0,
//   };

//   render = () => {
//     // center items on screen
//     const { width } = Dimensions.get('window');
//     const contentOffset = (width - CustomComponent.WIDTH) / 2;

//     return (
//       <SideSwipe
//         index={this.state.currentIndex}
//         itemWidth={CustomComponent.WIDTH}
//         style={{ width }}
//         data={data}
//         contentOffset={contentOffset}
//         onIndexChange={index =>
//           this.setState(() => ({ currentIndex: index }))
//         }
//         renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
//          <CustomComponent
//             {...item}
//             index={itemIndex}
//             currentIndex={currentIndex}
//             animatedValue={animatedValue}
//           />
//         )}
//       />
//     );
//   };