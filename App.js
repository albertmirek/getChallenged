import React, { useState } from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import {Header, Text} from 'native-base';

import ChallengesScreen from './screens/ChallengesScreen';

import Navigation from './components/Navigation';
import HeaderCustom from './components/HeaderCustom';


export default function App(){

  const [creatingChallenge, setCreatingChallenge] = useState(false);






  return(
    <View style={styles.screen}>
      <HeaderCustom title="GetChallenged" />
      <ChallengesScreen  />
      <Navigation />
    </View>
    

  );
  
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent:'center',
  },
  title:{
    paddingTop:10,
    fontSize:22
  }
  
  
  
});





