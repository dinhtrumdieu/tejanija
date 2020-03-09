import React, {Component} from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
//import Image from '../component/Image'
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {SvgXml} from 'react-native-svg';
import EyeIcon from '../../assets/svg/app/eye.svg';
import {CommonColors} from '../utils/CommonStyles';

export default class BookImage extends Component {

    render() {
        const {uri} = this.props;
        return (
            <View style={{
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowOffset: {
                    width: 2,
                    height: 5,
                },
                shadowBlur: 10,
                elevation: 3,
            }}>
                <Image
                    resizeMode={'cover'}
                    source={require('../../assets/images/Intro-book.png')}
                    style={styles.image}/>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={['#8E8E93', 'rgba(142, 142, 147, 0.2)']}
                                style={{
                                    width: scale(5),
                                    height: scale(123),
                                    borderTopLeftRadius: scale(3),
                                    borderBottomLeftRadius: scale(3),
                                    position: 'absolute'
                                }}>
                </LinearGradient>
                {/*<View style={styles.numberBook}>*/}
                {/*    <Text style={{fontSize: moderateScale(11), color: '#FFCC00'}}><Text*/}
                {/*        style={{color: '#fff'}}>2</Text> / 5</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.eyeBook}>*/}
                {/*    <SvgXml xml={EyeIcon}/>*/}
                {/*</View>*/}
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '95@s',
        height: '123@s',
        borderRadius: '3@s',
        marginRight: '16@s'
    },
    numberBook: {
        width: '40@s',
        height: '16@s',
        borderTopLeftRadius: '8@s',
        borderBottomLeftRadius: '8@s',
        backgroundColor: CommonColors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: scale(16)
    },
    eyeBook: {
        width: '26@s',
        height: '16@s',
        borderTopRightRadius: '8@s',
        borderBottomRightRadius: '8@s',
        backgroundColor: '#E5E5EA',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
});
