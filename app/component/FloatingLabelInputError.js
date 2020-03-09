import React, {Component} from 'react';
import {View, StatusBar, TextInput, Animated, StyleSheet} from 'react-native';
import {CommonColors} from '../utils/CommonStyles';
import {moderateScale, scale} from '../libs/reactSizeMatter/scalingUtils';
import Text from '../component/Text'
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';

export default class FloatingLabelInputError extends Component {

    constructor(props) {
        super(props);
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
        this.state = {
            isFocused: false,
        };

    }

    handleFocus = () => this.setState({isFocused: true});
    handleBlur = () => this.setState({isFocused: false});

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const {label, containerStyle,isRequired,error, ...props} = this.props;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [scale(27), 10],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [moderateScale(16), moderateScale(12)],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#BBBBBB', '#8D8D8D'],
            }),
        };
        return (
            <View style={[{paddingTop: scale(18)}, containerStyle]}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={[!isRequired ? styles.textInput : styles.textInputIsRequired]}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
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
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.border,
        padding: 0,
    },
    textInputIsRequired: {
        height: scale(40),
        fontSize: moderateScale(16),
        color: '#333333',
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.decreased,
        padding: 0,
    },
    errorLabel:{
        fontSize: '12@ms',
        color: CommonColors.decreased,
        alignSelf:'flex-end',
        marginTop: '5@s'
    }
});
