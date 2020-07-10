import React, {useContext} from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {moderateScale, scale} from '../../libs/reactSizeMatter/scalingUtils';
import FloatButton from '../../component/FloatButton';
import Text from '../../component/Text';
import {AudioContext} from '../../screens/context/audio-context';
import _ from 'lodash';

const {width, height} = Dimensions.get('window');

function BackgroundViewList(props) {
  const {type} = props;
  const [postNext, onPostNext] = React.useState(0);
  const [float, setFloat] = React.useState(false);
  const value = useContext(AudioContext);
  const data = value.quotes;
  const image = _.get(
    data[postNext],
    'image',
    'https://pbs.twimg.com/media/BUYCYHUIQAA1S-x.jpg',
  );
  const title = _.get(data[postNext], 'title', '');
  const description = _.get(data[postNext], 'description', '');
  const content = _.get(data[postNext], 'content', '');
  const time = _.get(data[postNext], 'create_date', new Date());
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={{uri: image}}
      style={{
        width: width,
        height: height - scale(50),
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (postNext < data.length - 1) {
            onPostNext(postNext + 1);
          } else {
            onPostNext(0);
          }
        }}>
        <View style={{flex: 1}}>
          <View style={[styles.linearGradient]} />
          <View style={{marginTop: scale(100), marginHorizontal: scale(20)}}>
            <Text style={styles.time}>{time.toString()}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
          <FloatButton
            data={data[postNext]}
            navigation={props.navigation}
            isShow={float}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

export default BackgroundViewList;

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  time: {
    fontSize: moderateScale(13),
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    fontSize: moderateScale(16),
    color: '#fff',
  },
  title: {
    fontSize: moderateScale(32),
    color: '#fff',
    textAlign: 'center',
    marginTop: scale(5),
    marginBottom: scale(10),
    fontWeight: '300',
  },
  description: {
    fontSize: moderateScale(13),
    color: '#fff',
    textAlign: 'center',
    marginBottom: scale(16),
  },
});
