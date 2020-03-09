import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BackIcon from '../../assets/svg/app/back_icon.svg';
import BackLoginIcon from '../../assets/svg/app/back_black.svg';
import Navigator from '../utils/Navigator';
import {SvgXml} from 'react-native-svg';
import Text from '../component/Text';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors} from '../utils/CommonStyles';
import I18n from '../i18n/i18n';

export default class BackButton extends React.Component {

    _onBack = () => {
        Navigator.goBack();
    };

    render() {
        const {onPress, isLogin} = this.props;
        return (
            <TouchableOpacity
                hitSlop={{
                    top: 30, right: 30, left: 30, bottom: 30,
                }}
                onPress={onPress || this._onBack}
            >
                <View style={{flexDirection: 'row'}}>
                    {!isLogin && <SvgXml  xml={BackIcon}/>}
                    {isLogin && <SvgXml  xml={BackLoginIcon}/>}
                    {/*{*/}
                    {/*    !isLogin && <Text style={{*/}
                    {/*        marginLeft: scale(5),*/}
                    {/*        fontSize: moderateScale(16),*/}
                    {/*        color: CommonColors.mainText,*/}
                    {/*    }}>{I18n.t('app.back')}</Text>*/}
                    {/*}*/}
                </View>
            </TouchableOpacity>
        );
    }
}
