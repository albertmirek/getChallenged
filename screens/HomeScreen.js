import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import Navigation from '../components/Navigation';
import HeaderCustom from '../components/HeaderCustom';

import ChallengesScreen from './ChallengesScreen';


const HomeScreen = ({navigation })=> {



    return(
        <View style={styles.screen}>
            {/* <HeaderCustom title="GetChallenged" /> */}
            <Button title="Navigate to Challenges" 
             onPress={() => navigation.navigate('Challenges')}/>
            <Navigation nav={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent:'center',
      },
      
});

export default HomeScreen;

