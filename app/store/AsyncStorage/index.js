import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import Utils from '../../utils/Utils';

const POST_KEY = 'POST';

export const _savePost = async data => {
  // check item had exists yet ?
  try {
    let result = await _getPost();
    if (result) {
      let array = JSON.parse(result);
      const response = array.find(element => element.id === data.id);
      if (response) {
        Utils.showErrorToast({message: 'Bạn đã lưu bài này trước đó '});
        return;
      }
      array.push(data);
      await AsyncStorage.setItem(POST_KEY, JSON.stringify(array));
    } else {
      result = [data];
      await AsyncStorage.setItem(POST_KEY, JSON.stringify(result));
    }
  } catch (error) {
    console.warn('error', error);
    // Error saving data
  }
};

export const _getPost = async () => {
  try {
    const response = await AsyncStorage.getItem(POST_KEY);
    if (response) {
      return response;
    }
    return '[]';
  } catch (error) {
    console.warn(error);
    // Error retrieving data
  }
};
