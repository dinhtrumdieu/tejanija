import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Text from '../../component/Text';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import {CommonStyles} from '../../utils/CommonStyles';
import {SvgXml} from 'react-native-svg';
import CheckIcon from '../../../assets/svg/Check.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';
import _ from 'lodash';
import {_savePost} from '../../store/AsyncStorage';
import Utils from '../../utils/Utils';
import EventRegister, {RELOAD_EVENT} from '../../utils/EventRegister';

export default function AddNotesScreen(props) {
  const data = _.get(props.route.params, 'data', null);
  const title = _.get(data, 'title', '');
  const content_value = _.get(data, 'content', '');
  const [content, setContent] = React.useState(content_value);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          showStatusBar={false}
          headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
          left={<BackButton white={true} />}
          center={
            <Text
              numberOfLines={1}
              style={[
                CommonStyles.headerTitle,
                {width: scale(200), textAlign: 'center'},
              ]}>
              {title}
            </Text>
          }
          right={
            <TouchableOpacity
              onPress={async () => {
                await _savePost(data);
                EventRegister.emit(RELOAD_EVENT);
                Utils.showSuccessToast({message: 'Save successfully!'});
              }}>
              <SvgXml xml={CheckIcon} />
            </TouchableOpacity>
          }
        />
        <TextInput
          disabled={true}
          multiline={true}
          style={{flex: 1, paddingHorizontal: scale(20), marginTop: scale(15)}}
          value={content}
          onChangeText={value => setContent(value)}
          returnKeyType={'done'}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
