/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/Entrypoint';
import { name as appName } from './app.json';

import './globals';

import { enableScreens } from 'react-native-screens';
enableScreens();

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
