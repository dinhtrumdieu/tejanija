import React, {Component} from 'react';
import { View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert, SwipeView, Image} from 'react-native';
import Text from '../../component/Text';
import { scale, moderateScale } from '../../libs/reactSizeMatter/scalingUtils'
import { supported32BitAbis } from 'react-native-device-info';
import {SvgXml, SvgCss} from 'react-native-svg';
import {CommonColors, CommonStyles} from '../../utils/CommonStyles'
import ScaledSheet from '../../libs/reactSizeMatter/ScaledSheet'
import Header from '../../component/Header';
import DetailIcon from '../../../assets/svg/Detail-icon.svg';
import MenuIcon from '../../../assets/svg/Menu.svg';
import Swipeout from 'react-native-swipeout';
import ActionSheet from 'react-native-actionsheet'
import PostItem from './item/PostItem'

export default function Notifications() {

        const [tabSelected, setTabSelected] = React.useState(1);
        const list1 = [1,2,3,4,5,6,7,8]
        const [list, setList] = React.useState(list1); 
        return (
            <View style={styles.container}>
                <Header
                headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
                type={0}
                center={<Text style={CommonStyles.headerTitle}>Notifications</Text>}
                right = {<TouchableOpacity
                    onPress={showActionSheet}
                    style={{height: scale(22), width: scale(22)}}>
                     <SvgXml xml={DetailIcon} />
                  </TouchableOpacity>}
                
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
                {/* {<RenderTabPost tabSelected={tabSelected}/>}
                {<RenderTabSystem tabSelected={tabSelected}/>} */}
                {<RenderTabPost/>}
                {<RenderTabSystem/>}

                <ActionSheet
                // ref={o => this.ActionSheet = o}
                title={'Which one do you like ?'}
                options={['Apple', 'Banana', 'cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={(index) => { /* do something */ }}
            />
                
            </View>
        );

        function showActionSheet(){
            // ActionSheet.show()
            console.warn("SHEET")
        }

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

    // function RenderTabPost(props) {
        // const {tabSelected} = props;
        // console.warn(tabSelected);

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
                {/* <FlatList
                    contentContainerStyle={{paddingLeft: scale(16)}}
                    data={list}
                    horizontal={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <RenderListPost item={item} />}
                    showsHorizontalScrollIndicator={false}
                /> */}
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
                        type={""}
                    />
                    )}
                    keyExtractor={(item, index) => index.toString()}
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
                    {/* <FlatList
                        contentContainerStyle={{paddingLeft: scale(16)}}
                        data={list}
                        horizontal={false}
                        keyExtractor={(item, index) => index.toString() }
                        renderItem={({item}) =><RenderListSystem item={item}/>}
                        showsHorizontalScrollIndicator={false}
                    /> */}
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



    function ShowAlert() {
        Alert.alert(
            'Delete notification',
            'Are you sure want to delete this notification ?',
            [
              {text: 'Cancel', onPress: () => console.warn('Cancel Pressed'), style: 'default'},
            //   {text: 'OK', onPress: () => setList(list.filter(item => item.id !== id))},
            {text: 'OK', onPress: () => console.warn('OK Pressed'), style: 'default'},
            // {text: 'OK', onPress: () => console.warn(item), style: 'cancel'},
        ],
            { cancelable: false }
          )
    }
    // function deleteItem(id){
    //     setList(list.filter(item => item.id !== id))

    // let newimagesAddFile = this.state.imagesAddFile;
    // newimagesAddFile.splice(index,1); //to remove a single item starting at index
    // this.setState({imagesAddFile:newimagesAddFile})
    //  }


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