import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import {CommonColors} from '../utils/CommonStyles';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import Text from '../component/Text';
import _ from 'lodash';

export default class CheckBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            active: this.props.active || false,
        };
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        // this.setState({
        //     active: nextProps.active,
        // });
    }

    onPress = (item) => {
        const {onChangeMarkedData} = this.props;
        this.setState({
            active: !this.state.active,
        });
        if (onChangeMarkedData) {
            onChangeMarkedData(item, !this.state.active);
        }
    };

    render() {
        const {title, style, titleComponent, item} = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
                <View
                    style={[{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: scale(170),
                        marginBottom: scale(10),
                    }, style]}>
                    <View
                        style={[styles.checkbox, {borderColor: this.state.active ? CommonColors.mainColor : CommonColors.border}]}>
                        {this.state.active && <View style={styles.innerCheckbox}/>}
                    </View>
                    {
                        titleComponent ? titleComponent :
                            <Text style={{flex: 1, fontSize: moderateScale(14)}}>{title}</Text>
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    checkbox: {
        width: scale(16),
        height: scale(16),
        borderRadius: scale(3),
        backgroundColor: '#fff',
        borderColor: CommonColors.mainColor,
        borderWidth: scale(1),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(8),
    },
    innerCheckbox: {
        width: scale(10),
        height: scale(10),
        borderRadius: scale(3),
        backgroundColor: CommonColors.mainColor,
    },

});
