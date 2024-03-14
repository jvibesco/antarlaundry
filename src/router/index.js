import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Splash, Akun, Pesanan} from '../pages'
import { ButtomNavigator } from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
      <Tab.Navigator tabBar={props => <ButtomNavigator {...props} />}
      screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pesanan" component={Pesanan} />
        <Tab.Screen name="Akun" component={Akun} />
      </Tab.Navigator>
    )
  }

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
      </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})