import React from 'react';
import {
    FlatList,
    Keyboard,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import {CommonStyles} from '../utils/CommonStyles';
import UIUtils from '../utils/UIUtils';
import CheckedIcon from '../../assets/svg/checked.svg';
import {scale} from '../libs/reactSizeMatter/scalingUtils';
import Text from './Text';
import {SvgXml} from 'react-native-svg';
import I18n from '../i18n/i18n'

export default class DropdownMenu extends React.Component {
    state = {
        isVisible: false,
        sourcePosition: undefined,
        containerPosition: undefined,
        contentContainerPosition: undefined,
        options: {},
        items: [],
        isLocalize: false
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({isVisible: false});
    };

    _keyboardDidHide = () => {
        this.setState({isVisible: false});
    };

    show(items, options, isLocalize) {
        const newItems = items.map((item, index) => ({label: !isLocalize ? item.title : item, key: `${index}`}));
        options.sourceView.measure((x, y, width, height, px, py) => {
            this.setState({
                sourcePosition: {
                    x, y, width, height, px, py,
                },
                isVisible: true,
                items: newItems,
                options,
                isLocalize
            });
        });
    }

    _onLayoutContainer = () => {
        this._layoutContainer.measure((x, y, width, height, px, py) => {
            const containerPosition = {
                x, y, width, height, px, py,
            };
            this.setState({
                containerPosition,
            });
        });
    };

    _onContentContainer = () => {
        this._contentContainer.measure((x, y, width, height, px, py) => {
            const contentContainerPosition = {
                x, y, width, height, px, py,
            };
            this.setState({
                contentContainerPosition,
            });
        });
    };

    _renderItem = ({item, index}) => {
        const {options} = this.state;
        const {
            itemButtonStyle, itemTextStyle
        } = this.props;
        const itemButtonStyleNew = options.itemButtonStyle || this._getStyleProps(itemButtonStyle) || {};
        const itemTextStyleNew = options.itemTextStyle || this._getStyleProps(itemTextStyle) || {};
        const dropdownTextHighlightStyle = options.dropdownTextHighlightStyle || this._getStyleProps(dropdownTextHighlightStyle) || {};

        return (
            <TouchableHighlight onPress={() => {
                this._onSelectItem(index);
            }} underlayColor="#C5C5C5">
                <View style={itemButtonStyleNew}>
                    {options.showIcon
                    && (options.selectedItem === index
                        ? <SvgXml xml={CheckedIcon}/>
                        : <View style={{width: scale(10.8), height: scale(8.1)}}/>)}
                    <Text
                        style={[styles.rowText, itemTextStyleNew, options.selectedItem === index ? dropdownTextHighlightStyle : null]}>
                        {!this.state.isLocalize ? I18n.t(item.label) : item.label}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };

    _getStyleProps(style) {
        if (style) {
            return StyleSheet.flatten(style);
        }
    }

    _onSelectItem(index) {
        const {options} = this.state;
        const {onSelectItem} = this.props;

        const onSelectItemNew = options.onSelectItem || onSelectItem;
        if (onSelectItemNew) {
            onSelectItemNew(index);
        }
        this.setState({isVisible: false, contentContainerPosition: undefined});
    }

    render() {
        const {
            isVisible, items, options, sourcePosition, containerPosition, contentContainerPosition,
        } = this.state;
        const {separatorStyle, dropdownStyle} = this.props;
        let dropdownStyleNew;
        let top = 0;
        if (isVisible && sourcePosition && containerPosition) {
            const sourceLeft = sourcePosition.px;
            const sourceBottom = sourcePosition.py + sourcePosition.height;
            if (options && options.dropUp) {
                if (contentContainerPosition) {
                    top = sourcePosition.py - contentContainerPosition.height;
                }
            } else {
                top = sourceBottom - containerPosition.py;
            }

            dropdownStyleNew = {
                position: 'absolute',
                left: (sourceLeft - containerPosition.px) || 0,
                top: top || 0,
                ...UIUtils.generateShadowStyle(),
            };
        }

        const separatorStyleNew = options.separatorStyle || this._getStyleProps(separatorStyle) || {};
        const dropdownPropsStyleNew = options.dropdownStyle || this._getStyleProps(dropdownStyle) || {};
        return (
            <View
                style={[isVisible ? styles.container : {}, top === 0 ? {opacity: 0} : null]}
                ref={ref => this._layoutContainer = ref}
                onLayout={isVisible && this._onLayoutContainer}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.setState({isVisible: false, contentContainerPosition: undefined})}>
                    <View
                        style={[CommonStyles.matchParent, {}]}
                    >
                        {dropdownStyleNew && (
                            <View
                                ref={ref => this._contentContainer = ref}
                                onLayout={this._onContentContainer}
                                style={[dropdownStyleNew, dropdownPropsStyleNew]}
                            >
                                <FlatList
                                    keyboardShouldPersistTaps="always"
                                    data={items}
                                    extraData={this.state}
                                    ItemSeparatorComponent={() => (<View style={separatorStyleNew}/>)}
                                    renderItem={this._renderItem}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        elevation: 999,
        zIndex: 1100000,
    },
    rowText: {
        paddingHorizontal: '6@s',
        paddingVertical: '10@s',
        fontSize: '11@ms',
        color: 'gray',
        textAlignVertical: 'center',
    },
});
