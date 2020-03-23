import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from './assets/svg/home.svg';
import HomeActiveIcon from './assets/svg/home_active.svg';
import HeartIcon from './assets/svg/heart.svg';
import HeartActiveIcon from './assets/svg/heart_active.svg';
import MoreIcon from './assets/svg/more.svg';
import MoreActiveIcon from './assets/svg/more_active.svg';
import HomeScreen from './app/screens/HomeScreen';
import {SvgXml} from 'react-native-svg';
import LabelComponent from './app/component/LabelComponent';
import VideoPlayer from './app/screens/VideoPlayer';
import MoreScreen from './app/screens/MoreScreen';
import SettingsScreen from './app/screens/more/SettingsScreen';
import Notifications from './app/screens/notification/Notifications';
import AudioDetailScreen from './app/screens/audio/AudioDetailScreen';
// import AudioPlayerScreen from './app/screens/audio/AudioPlayerScreen';
import LikeScreen from './app/screens/LikeScreen';
import SearchScreen from './app/screens/search/SearchScreen';
import OnBoardingScreen from './app/screens/boarding/OnBoardingScreen';
import MenuScreen from './app/screens/menu/MenuScreen';
import AudioPlayer from './app/screens/audio/AudioPlayer';
import {AudioContext} from './app/screens/context/audio-context';
import AddNotesScreen from './app/screens/likes/AddNotesScreen';
import ListScreen from './app/screens/common/ListScreen';
import FilterOptionsScreen from './app/screens/filterOptions/FilterOptionsScreen'

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: '#EFEEB4',
        style: {
          backgroundColor: 'rgba(26, 44, 60, 0.92)',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent title="Newest" focused={focused} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml xml={HomeActiveIcon} />
            ) : (
              <SvgXml xml={HomeIcon} />
            ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={FilterOptionsScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent title="Likes" focused={focused} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml xml={HeartActiveIcon} />
            ) : (
              <SvgXml xml={HeartIcon} />
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <LabelComponent title="More" focused={focused} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? (
              <SvgXml xml={MoreActiveIcon} />
            ) : (
              <SvgXml xml={MoreIcon} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName={'Main'} headerMode={'none'}>
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AudioDetail" component={AudioDetailScreen} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} options={{...TransitionPresets.ModalSlideFromBottomIOS}} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="AddNotes" component={AddNotesScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.togglePlay = (status = 'paused') => {
      this.setState(state => ({
        audio: {
          ...state.audio,
          play: status,
        },
      }));
    };

    this.state = {
      audio: {
        play: 'paused',
      },
      togglePlay: this.togglePlay,
    };
  }

  render() {
    return (
      <AudioContext.Provider value={this.state}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </AudioContext.Provider>
    );
  }
}
