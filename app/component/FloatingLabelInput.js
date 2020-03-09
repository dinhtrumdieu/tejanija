import React, {Component} from 'react';
import {View, StatusBar, TextInput, Animated, StyleSheet} from 'react-native';
import {CommonColors} from '../utils/CommonStyles';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import Text from 'Text'
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';

export default class FloatingLabelInput extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {error = 'vui long nhap',isRequired, label, containerStyle, ...props} = this.props;
        return (
            <View style={[{paddingTop: scale(18)}, containerStyle]}>
                <Text style={styles.labelStyle}>{label}</Text>
                <TextInput
                    {...props}
                    autoCapitalize={'none'}
                    style={[!isRequired ? styles.textInput : styles.textInputIsRequired]}
                />
                {
                    isRequired &&  <Text style={styles.errorLabel}>{error}</Text>
                }
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    textInput: {
        height: scale(40),
        fontSize: moderateScale(16),
        color: '#333333',
        borderWidth: 1,
        borderColor: CommonColors.border,
        paddingHorizontal: 10,
        borderRadius: scale(5),
        backgroundColor: 'white'
    },
    textInputIsRequired: {
        height: scale(40),
        fontSize: moderateScale(16),
        color: '#333333',
        borderWidth: 1,
        borderColor: CommonColors.decreased,
        paddingHorizontal: 10,
        borderRadius: scale(5),
        backgroundColor: 'white'
    },
    labelStyle:{
        fontSize: '15@s',
        marginBottom: '5@s'
    },
    errorLabel:{
        fontSize: '12@ms',
        color: CommonColors.decreased,
        alignSelf:'flex-end',
        marginTop: '5@s'
    }
});
