/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, ScrollView} from 'react-native';
import Navigation from './components/Navigation';
import ChallengeItem from './components/ChallengeItem';
import ChallengeInput from './components/ChallengeInput';


export default function App(){

  const [challenges, setChallenges] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addChallengeHandler = challengeTitle => {
    setChallenges(currentChallenges => [...currentChallenges, 
      { id: Math.random().toString(), value:challengeTitle}]);

    setIsAddMode(false);
  };

  const removeChallengeHandler = challengeID => {
    setChallenges(currentChallenges => {
      return currentChallenges.filter((challenge) => challenge.id !== challengeID);
    });
  };

  const cancelGoalAdditionHandler = () =>{
    setIsAddMode('false');
  };


  return(

    <View style={styles.container}>
      <Button title="Add new Goal" onPress={() => setIsAddMode(true)} />
      <ChallengeInput visible={isAddMode} 
                      onAddChallenge={addChallengeHandler} 
                      onCancel={cancelGoalAdditionHandler} 
                      />

      <ScrollView>
        {challenges.map((challenge) => <ChallengeItem onDelete={removeChallengeHandler}
            title={challenge.value} id={challenge.id} />)}
      </ScrollView>

    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  
  
});





