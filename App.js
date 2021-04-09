import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import {Header, Text} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';



import ChallengesScreen from './screens/ChallengesScreen';
import HomeScreen from './screens/HomeScreen';

import Navigation from './components/Navigation';
import HeaderCustom from './components/HeaderCustom';
import AuthScreen from './screens/AuthScreen';

const Stack = createStackNavigator();

export default function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <AuthScreen  />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Challenges"
          component={ChallengesScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );  
};

const styles = StyleSheet.create({
  
  
  
});





