import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Home from './Home'
import Detail from './Detail'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();

const Route = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='Detail' component={Detail} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Route