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

const DATA =
  'Adipiscing nunc consectetuer quam conubia vivamus magna pretium blandit interdum. Mauris integer taciti libero purus mus potenti dui taciti. Odio. Pellentesque. Fermentum libero rutrum. Mi sagittis.\n' +
  '\n' +
  'Eros neque. Natoque vestibulum pretium libero posuere porta feugiat condimentum. Ut sem scelerisque adipiscing euismod. Platea vel platea pulvinar sem.\n' +
  '\n' +
  'Ac est morbi hendrerit. Iaculis sociosqu turpis dignissim. Vivamus montes conubia sit id consequat platea amet sed senectus mi luctus felis mollis phasellus aliquam.';

export default function AddNotesScreen() {
  const [content, setContent] = React.useState(DATA);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          headerStyle={{backgroundColor: 'rgba(26, 44, 60, 0.92)'}}
          left={<BackButton white={true} />}
          center={
            <Text style={CommonStyles.headerTitle}>Be happy when ab...</Text>
          }
          right={
            <TouchableOpacity>
              <SvgXml xml={CheckIcon} />
            </TouchableOpacity>
          }
        />
        <TextInput
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
