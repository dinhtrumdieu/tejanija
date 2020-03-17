import React from 'react';
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {SvgXml} from 'react-native-svg';
import MenuWhiteIcon from '../../../assets/svg/Menu_white.svg';
import MenuIcon from '../../../assets/svg/Menu.svg';
import {scale} from '../../libs/reactSizeMatter/scalingUtils';

const data = [
  {
    image: require('../../../assets/demo/81b6683a2687eaeb0201905296cf5d79.jpg'),
    content: '',
  },
  {
    image: require('../../../assets/demo/17049efa376cd9bf8d7c0af72238784c.jpg'),
    content: '',
  },
  {image: require('../../../assets/demo/download.jpeg'), content: ''},
  {
    image: require('../../../assets/demo/gradient_pink_shades_130856_1350x2400.jpg'),
    content: '',
  },
  {image: require('../../../assets/demo/images.jpeg'), content: ''},
  {
    image: require('../../../assets/demo/Many-pink-flowers-background-color-layers_iphone_320x480.jpg'),
    content: '',
  },
];

const {width, height} = Dimensions.get('window');

function BackgroundViewList(props) {
  const {type} = props;
  const [postNext, onPostNext] = React.useState(0);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (postNext < data.length - 1) {
          onPostNext(postNext + 1);
        } else {
          onPostNext(0);
        }
      }}>
      <ImageBackground
        source={data[postNext].image}
        style={{
          width: width,
          height: height - scale(50),
          //display: type !== 0 ? 'none' : ''
        }}>
        <ActionButton 
        // verticalOrientation="down"

        // position='left'
        // backdrop={true}
        buttonColor="#309975">
          <View style={{flexDirection:'row', backgroundColor: "red"}}>
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="New Task"
              onPress={() => console.log('notes tapped!')}>
              {type === 0 ? (
                <SvgXml xml={MenuWhiteIcon} />
              ) : (
                <SvgXml xml={MenuIcon} />
              )}
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="#3498db"
              position='left'
              backdrop={true}
              title="Notifications"
              onPress={() => {}}>
              <SvgXml xml={MenuIcon} />
            </ActionButton.Item>

          </View>


          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => {}}>
            <SvgXml xml={MenuWhiteIcon} />
          </ActionButton.Item>

        </ActionButton>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default BackgroundViewList;
