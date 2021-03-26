/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import {Button, Text, Header, Container, Content} from 'native-base';

// import Navigation from './components/Navigation';
// import ChallengeItem from './components/ChallengeItem';
// import ChallengeInput from './components/ChallengeInput';

// import LoginScreen from './screens/LoginScreen'


import Navigation from './components/Navigation';


export default function App(){



  return(
    <View style={styles.screen}>

      <Navigation />
    </View>
    

  );
  
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    alignContent:'center',
    justifyContent: 'flex-start'
  },
  
  
  
});





