/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './redux/currency';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
