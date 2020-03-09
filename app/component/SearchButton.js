import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import SearchIcon from '../../assets/svg/search.svg';
import Navigator from '../utils/Navigator';
import {SvgXml} from 'react-native-svg';
import Text from '../component/Text';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import {CommonColors} from '../utils/CommonStyles';

export default class SearchButton extends React.Component {

    render() {
        const {onPress} = this.props;
        return (
            <TouchableOpacity
                hitSlop={{
                    top: 30, right: 30, left: 30, bottom: 30,
                }}
                onPress={() => Navigator.navigate('SearchScreen')}
            >
                <SvgXml xml={SearchIcon}/>
            </TouchableOpacity>
        );
    }
}
