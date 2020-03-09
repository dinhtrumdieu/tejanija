import React, {Component} from 'react';
import {LayoutAnimation, Platform, Text, TouchableWithoutFeedback, UIManager, View} from 'react-native';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import AddIcon from '../../assets/svg/add.svg';
import MinusIcon from '../../assets/svg/minus.svg';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import CheckBox from './CheckBox';
import {SvgXml} from 'react-native-svg';
import I18n from '../i18n/i18n'

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const bodyType = [
    'OTHER',
    'SUV',
    'OTHER',
    'OTHER',
    'OTHER',
    'OTHER',
];

export default class TransitionView extends Component {

    state = {
        expanded: false,
    };

    render() {
        const {headerTitle, data = bodyType} = this.props;
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    this.setState({expanded: !this.state.expanded});
                }}>
                    <View style={styles.regionSearchView}>
                        <Text style={styles.regionSearchLabel}>{headerTitle}</Text>
                        {this.state.expanded && <SvgXml xml={MinusIcon}/>}
                        {!this.state.expanded && <SvgXml xml={AddIcon}/>}
                    </View>
                </TouchableWithoutFeedback>
                {this.state.expanded && <View>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                        {data.map((item, index) => this.renderCheckboxView(item, index))}
                    </View>
                </View>}
            </View>
        );
    }

    renderCheckboxView = (item, index) => {
        const {onChange, displayTitle, selected, keyCompare} = this.props;
        let active = false;
        if (keyCompare) {
            active = selected ? selected.find(element => element === item[keyCompare]) : false;
        } else {
            active = selected ? selected.find(element => element === item) : false;
        }
        return (
            <CheckBox
                key={index}
                active={active}
                item={item}
                title={displayTitle ? displayTitle(item) : I18n.t(item)}
                onChangeMarkedData={(item, isAdd) => onChange(item, isAdd)}
            />
        );
    };
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    regionSearchView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: scale(10),
    },
    regionSearchLabel: {
        fontSize: '12@ms',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});
