import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StartedPage, Pokelist, PokeDetails } from "../Pages";


const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="StartedPage"
            component={StartedPage}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Pokelist"
            component={Pokelist}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="PokeDetails"
            component={PokeDetails}
            options={{
            headerShown: false,
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
