import React from 'react';
import {
    View, StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import Text from './Text';
import ScaledSheet from '../libs/reactSizeMatter/ScaledSheet';
import {CommonStyles} from '../utils/CommonStyles';
import BackButton from './BackButton';
import Navigator from '../utils/Navigator';
import Header from './Header';
import I18n from '../i18n/i18n';
import AppConfig from '../utils/AppConfig';
import Consts from '../utils/Consts';
import BaseScreen from '../screens/BaseScreen';
import {scale} from '../libs/reactSizeMatter/scalingUtils';

export default class WebviewScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            userAgent: null,
        };
        this.getUserAgent();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    static load({title, linkUrl}) {
        Navigator.navigate('WebviewScreen', {title, linkUrl});
    }

    _onLoadEnd = () => {
        this.setState({
            isLoaded: true,
        });
    };

    _renderLeftToolBar = () => (<BackButton/>);

    _renderCenterToolBar = title => (
        <Text numberOfLines={1}
              style={[CommonStyles.headerTitle, {width: scale(250)}]}>{title}</Text>
    );

    getUserAgent = async () => {
        const res = await DeviceInfo.getUserAgent();
        this.setState({userAgent: res});
    };

    render() {
        const {isLoaded, userAgent} = this.state;
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent
                    barStyle="dark-content"
                />
                <View>
                    <Header
                        left={this._renderLeftToolBar()}
                        center={this._renderCenterToolBar(params.title)}
                    />
                </View>
                <View style={styles.content}>
                    <WebView
                        startInLoadingState
                        useWebKit
                        source={{
                            uri: params.linkUrl,
                        }}
                        userAgent={userAgent}
                        bounces={false}
                        style={{backgroundColor: isLoaded ? '#fff' : '#10121e'}}
                        onLoadEnd={this._onLoadEnd}
                        textZoom={100}
                    />
                </View>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#10121e',
    },
});
