import React, {Component} from 'react';
import { View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert, SwipeView, Image} from 'react-native';
import Text from '../../component/Text';
import { scale, moderateScale } from '../../libs/reactSizeMatter/scalingUtils'
import {SvgXml, SvgCss} from 'react-native-svg';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles'
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet'
import Header from '../../component/Header';
import PostItem from './item/PostItem'
import ActionSheetItem from './item/ActionSheetItem';
import Notification1 from '../../../assets/svg/notification-empty.svg';

export default function Notifications() {

        const [tabSelected, setTabSelected] = React.useState(1);
        const [isShow, setIsShow] = React.useState(false);
        const list1 = [{"id": 1}, {"id": 2}, {"id": 3}, {"id": 4}]
        const [list, setList] = React.useState(list1); 
        return (
            <View style={styles.container}>
                <Header
                    headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
                    type={0}
                    center={<Text style={CommonStyles.headerTitle}>Notifications</Text>}
                    right = { <ActionSheetItem /> }
                />
                <View style={styles.containerSwitch}>
                    <TouchableWithoutFeedback onPress={() => setTabSelected(1)}>
                    <View style={[styles.activeTab1, tabSelected === 1 ? {backgroundColor: '#309975'} : styles.inActiveTab1]}>
                            {tabSelected !== 1 ? <Text style={styles.labelTextInactive}>Post</Text> :
                                <Text style={styles.labelTextActive}>Post</Text>}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setTabSelected(2)}>
                    <View style={[styles.activeTab2, tabSelected === 2 ? {backgroundColor: '#309975'} : styles.inActiveTab2]}>

                            {tabSelected !== 2 ? <Text style={styles.labelTextInactive}>System</Text> :
                                <Text style={styles.labelTextActive}>System</Text>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                { list.length > 0 ?
                    <View>
                        {<RenderTabPost/>}
                        {<RenderTabSystem/>}
                    </View>
                    :
                    <View
                        style={{flex:1, justifyContent: 'center', alignItems: 'center', height: scale(300), width: scale(300)}}>
                        <SvgXml xml={Notification1} />
                        <Text>You have no notification.</Text>
                    </View>
                }
            </View>
        );

    const DATA = [{}, {}];

    function getSwipeRef(index) {
        this.itemIsOpen = index;
    }
    
    function onClose(index) {
        if (this.itemIsOpen !== index) {
        if (this[`item_${this.itemIsOpen}`]) {
            this[`item_${this.itemIsOpen}`].close();
        }
        }
    }

    function deleteItem(index) {
        const filterdata = list.filter(item => item.id !== index)
        setList(filterdata)
        // setList(list.splice(index,1))
        console.warn("list")
        console.warn(list)
    }

  
    function RenderTabPost() {
        console.warn(tabSelected);
        const display = tabSelected === 1;
        // const list = [1,1,1,1,1,1,1,1]
        return (
            <View style={[display ? {} : {display: 'none'}]}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(16),
                }}>
                </View>
                <FlatList
                    bounces={true}
                    data={list}
                    extraData = {list}
                    renderItem={({item, index}) => (
                    <PostItem
                        getSwipeItemIsOpen={() => getSwipeRef(index)}
                        onCloseOldSwipe={() => onClose(index)}
                        ref={ref => (this[`item_${index}`] = ref)}
                        item={item}
                        index={index}
                        type={""}
                        detlete={() => deleteItem(index)}
                    />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    // keyExtractor = {({item}) => item.id}
                />
            </View>
        );
    };
  
    function RenderTabSystem() {
        const display = tabSelected === 2;
        // const list = [1,1,1,1,1,1,1,1]
        return (
                <View style={[display ? {} : {display: 'none'}]}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: scale(16),
                    }}>
                    </View>
              
                    <FlatList
                    bounces={true}
                    data={list}
                    renderItem={({item, index}) => (
                    <PostItem
                        getSwipeItemIsOpen={() => getSwipeRef(index)}
                        onCloseOldSwipe={() => onClose(index)}
                        ref={ref => (this[`item_${index}`] = ref)}
                        item={item}
                        index={index}
                        type={"sys"}
                        
                    />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
        );
    };

}

const styles = ScaledSheet.create({
    container: {
        // marginTop: scale(30),
        flex: 1
    },

    labelTextInactive: {
        color: '#309975',
        fontSize: moderateScale(16),
        fontWeight: '500',
        // textTransform: 'uppercase',
    },
    labelTextActive: {
        color: '#FFF',
        fontSize: moderateScale(16),
        fontWeight: '500',
        // textTransform: 'uppercase',
    },
   
    activeTab1: {
        width: scale(168),
        height: scale(35),
        borderRadius: scale(0),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFAD5A',
        borderBottomLeftRadius: scale(4),
        borderTopLeftRadius: scale(4),
    },
    activeTab2: {
        width: scale(168),
        height: scale(35),
        borderRadius: scale(0),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFAD5A',
        borderBottomRightRadius: scale(4),
        borderTopRightRadius: scale(4),
    },
    inActiveTab1: {
        backgroundColor: 'white',
        borderWidth: scale(1),
        borderColor:"#309975",
        borderRightWidth: scale(0),
    },
    inActiveTab2: {
        backgroundColor: 'white',
        borderWidth: scale(1),
        borderColor:"#309975",
        borderLeftWidth: scale(0),
    },
    date: {
        paddingTop: scale(8),
        paddingBottom: scale(8),
        marginLeft: scale(18),
        marginRight: scale(18),
        fontSize: scale(11),
        color: "#C4C4C4",
    },
    containerSwitch: {
        margin: scale(16),
        marginTop: scale(3),
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    circleStatus: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        backgroundColor:"#309975",
        marginRight: scale(10)
    },
    textContent: {
        paddingTop: scale(8),
        paddingBottom: scale(8),
        marginLeft: scale(18),
        marginRight: scale(18),
        fontSize: scale(13),
        color: "#7D7D7D"
    },
    lineBottom:{flex:1 ,
        height: scale(1),
        backgroundColor:"#000",
        marginLeft: scale(18),
        marginRight: scale(18)
    },
    textTitle: {
        fontSize: scale(16),
        color: "#1A1A1A",
        fontWeight: '900',
    }
})