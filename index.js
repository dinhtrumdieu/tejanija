/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
YellowBox.ignoreWarnings(['Warning: componentWillMount']);
AppRegistry.registerComponent(appName, () => App);
