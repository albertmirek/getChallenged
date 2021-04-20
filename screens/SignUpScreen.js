import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import {Container} from 'native-base';

import HeaderCustom from '../components/HeaderCustom';
import { useState } from 'react';

const LoginScreen = props => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const usernameInputHandler = (enteredText) => {
        setUsername(enteredText);
    }

    const passwordInputHandler = (enteredText) => {
        setPassword(enteredText);
    }

    return(
        <View style={styles.screen}>
            <HeaderCustom title="Sign Up" />
            <TextInput 
            style={styles.input}
            placeholder="email"
            onChangeText={usernameInputHandler}
            value={username}
            />
            <TextInput 
            style={styles.input}
            placeholder="password"
            onChangeText={passwordInputHandler}
            value={password}
            />
            <View style={styles.row}>
                <Button title='Sign Up' />
                <Button title='Cancel' />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },  
    input: {
        borderBottomColor:'black', 
        borderBottomWidth:1,  
        width: '70%',
        textAlign: 'center',
        padding: 10,
      },
      row:{
          flexDirection: 'row'
      }
});


export default LoginScreen;