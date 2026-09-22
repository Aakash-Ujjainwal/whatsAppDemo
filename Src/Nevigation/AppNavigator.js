import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '../Screens/Onboard/Onboard';
import Splash from '../Screens/Splash/Splash';
import Home from '../Screens/Home/Home';
import About from '../Screens/About/About';
import Profile from '../Screens/Profile/Profile';
import Login from '../Screens/Login/Login';
import Otpverify from '../Screens/Otpverify/Otpverify';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const StackNavigator = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
// const MainTab = () => {
//   return (
//     <Tabs.Navigator screenOptions={{headerShown:false}} >
//       <Tabs.Screen name="Home" component={Home} />
//       <Tabs.Screen name="Profile" component={Profile} />
//       <Tabs.Screen name="About" component={About} />
//     </Tabs.Navigator>
//   );
// };
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Tabs.Screen name="Splash" component={Splash} />
        <Tabs.Screen name="Onbaord" component={Onboard} />
        <Tabs.Screen name="Login" component={Login} />
        <Tabs.Screen name="Otpverify" component={Otpverify} />
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Profile" component={Profile} />
        <Tabs.Screen name="About" component={About} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
