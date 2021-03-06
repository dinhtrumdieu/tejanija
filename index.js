/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillReceiveProps',
  'Warning: DatePickerIOS',
  'Warning: componentWillUpdate',
]);
AppRegistry.registerComponent(appName, () => App);
