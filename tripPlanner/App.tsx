
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/stores/store';
import {UserProvider} from './src/stores';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';

LogBox.ignoreAllLogs()

function App(): JSX.Element {

  

  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </Provider>
    </SafeAreaView>
  );
}
export default App;

