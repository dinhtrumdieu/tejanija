const DEV_API_SERVER = 'http://35.245.73.75:8000';
const DEV_SOCKET_SERVER = 'ws://socket-testnet.amanpuri.io:2052';
const DEV_CLIENT_SECRET = '9car';
const DEV_ASSET_SERVER = 'http://testnet.amanpuri.io';

export default class AppConfig {
    static CLIENT_LINE_ID_SERVER = 'bMFA53JPEKkY2dOTUVKOnE';

    static API_SERVER = 'http://35.245.73.75:8000';

    static API_VERSION = 'v1';

    static SOCKET_SERVER = 'wss://socket.amanpuri.io:6001';

    static CLIENT_SECRET = '9car';

    static ACCESS_TOKEN = '';

    static TOKEN_SECRET = '';

    static ASSET_SERVER = 'https://amanpuri.io';

    static SUPPORT_URL = 'https://amanpuri-exchange.zendesk.com/hc/en-us';

    static dev() {
        return __DEV__;
    }

    static isLogin() {
        return !!AppConfig.ACCESS_TOKEN;
    }

    static getApiServer() {
        return __DEV__ ? DEV_API_SERVER : AppConfig.API_SERVER;
    }

    static getApiVersion() {
        return AppConfig.API_VERSION;
    }

    static getSocketServer() {
        return __DEV__ ? DEV_SOCKET_SERVER : AppConfig.SOCKET_SERVER;
    }

    static getClientSecret() {
        return __DEV__ ? DEV_CLIENT_SECRET : AppConfig.CLIENT_SECRET;
    }

    static getAssetServer() {
        return __DEV__ ? DEV_ASSET_SERVER : AppConfig.ASSET_SERVER;
    }

    static getSupportUrl() {
        return AppConfig.SUPPORT_URL;
    }

    static getAboutUrl() {
        return `${AppConfig.getAssetServer()}/about`;
    }

    static getTermUrl() {
        return `${AppConfig.getAssetServer()}/terms?isWebview=true`;
    }

    static getUrlImage(image) {
        if (image && image.toString().includes("http")) {
            return image;
        }
        return DEV_API_SERVER + '/api/v1/public/file/image/' + image;
    }
}
