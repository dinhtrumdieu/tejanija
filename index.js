/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import FilterOptionsScreen from './app/screens/filterOptions/FilterOptionsScreen'
import {name as appName} from './app.json';
YellowBox.ignoreWarnings(['Warning: componentWillMount']);
AppRegistry.registerComponent(appName, () => App);
