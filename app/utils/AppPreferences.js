import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
import AppConfig from './AppConfig';

export default class AppPreferences {
  static saveAccessToken(token, secret = '9car') {
    AppConfig.ACCESS_TOKEN = token;
    AppConfig.TOKEN_SECRET = secret;
    const data = { token, secret };
    Keychain.setGenericPassword('access_token', JSON.stringify(data), { accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
    AsyncStorage.setItem('token_saved', 'true');
  }

  static async getAccessToken() {
    const tokenSaved = await AsyncStorage.getItem('token_saved');
    if (tokenSaved) {
      const data = await Keychain.getGenericPassword();
      if (data) {
        return JSON.parse(data.password);
      }
      return null;
    }
    return null;
  }

  static removeAccessToken() {
    AppConfig.ACCESS_TOKEN = '';
    Keychain.resetGenericPassword();
    AsyncStorage.setItem('token_saved', 'false');
  }

  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static async get(key, defaultValue) {
    const value = await AsyncStorage.getItem(key);
    return value || defaultValue;
  }

  static async set(key, value) {
    await AsyncStorage.setItem(key, value);
  }

  static async saveLastEmailLogin(lastEmailLogin) {
    AsyncStorage.setItem('lastEmailLogin', lastEmailLogin);
  }

  static async getLastEmailLogin() {
    return await AsyncStorage.getItem('lastEmailLogin');
  }

  static async saveAccountLogin(account) {
    AsyncStorage.setItem('account', account);
  }

  static async getAccountLogin() {
    return await AsyncStorage.getItem('account');
  }

  static removeAccountLogin() {
    AsyncStorage.setItem('account', 'null');
  }

}
