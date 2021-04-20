import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import Navigation from '../components/Navigation';
import HeaderCustom from '../components/HeaderCustom';

import ChallengesScreen from './ChallengesScreen';

import auth, { firebase } from '@react-native-firebase/auth';
import ChallengeInput from '../components/ChallengeInput';
import { useState } from 'react/cjs/react.development';
import Colors from '../constants/Colors';



const HomeScreen = ({navigation })=> {

    const [modalVisible, setModalVisible] = useState(false);

    const modalVisibleHandler = () => {
        setModalVisible(true);
    }

    const signOut = async () =>{
        await firebase.auth().signOut();
    }

    return(
        <View style={styles.screen}>
            {/* <HeaderCustom title="GetChallenged" /> */}
            <Button title="Navigate to Challenges" 
             onPress={() => navigation.navigate('Challenges')}
             color={Colors.secondary}
             />


            <Navigation nav={navigation} modalVisibleHandler={()=>modalVisibleHandler()} />

    

            {/* <Button title='Sign Out'
            onPress={() => signOut()}
            /> */}
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

