import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';
import { Provider } from 'react-redux';
import {store} from './redux';
import SplashScreen from 'react-native-splash-screen';
import { ModalPortal } from 'react-native-modals';


const App = () => {
  useEffect(()=> {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
        <ModalPortal />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
