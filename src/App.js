import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './Router';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(()=> {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
};

export default App;
