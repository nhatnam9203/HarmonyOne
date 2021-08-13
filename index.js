/**
 * @format
 */
import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';
import './globals';
import App from './src/App';

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreAllLogs();
enableScreens();

AppRegistry.registerComponent(appName, () => App);
