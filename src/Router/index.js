import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StartedPage, ListContact, ContactDetails, AddContact } from "../Pages"


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
            name="AddContact"
            component={AddContact}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="ListContact"
            component={ListContact}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="ContactDetails"
            component={ContactDetails}
            options={{
            headerShown: false,
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
