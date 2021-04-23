import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import {Container} from 'native-base';

// import auth from '@react-native-firebase/auth';


import HeaderCustom from '../components/HeaderCustom';

const LoginScreen = props => {

    //Login/SignUp Screen... false= LoginScreen
    const [switchToSign, setSwitchToSign] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    

    const emailInputHandler = (enteredText) => {
        setEmail(enteredText);
    }

    const passwordInputHandler = (enteredText) => {
        setPassword(enteredText);
    }


    if(!switchToSign){
    return(
        <View style={styles.screen}>
            <HeaderCustom title="Login Screen" />
            <TextInput 
            style={styles.input}
            placeholder="email"
            onChangeText={emailInputHandler}
            value={email}
            />
            <TextInput 
            style={styles.input}
            placeholder="password"
            onChangeText={passwordInputHandler}
            value={password}
            />
            <View style={styles.btnContainer}>
                <Button 
                title='Login' 
                onPress={props.logIn(email,password)}
                style={styles.btnPrimary}
                />
                <Button 
                title="Do not have an account? Sign Up then!"
                onPress={()=>(setSwitchToSign(true),setEmail(''), setPassword(''))} 
                style={styles.btnSecondary}
                color='red'
                />
            </View>
        </View>
    )
    }else {
    return(
        <View style={styles.screen}>
            <HeaderCustom title="Sign Up" />
            <TextInput 
            style={styles.input}
            placeholder="email"
            onChangeText={emailInputHandler}
            value={email}
            />
            <TextInput 
            style={styles.input}
            placeholder="password"
            onChangeText={passwordInputHandler}
            value={password}
            />
            <View style={styles.btnContainer}>
                <Button title='Sign Up' 
                onPress={props.signIn(email,password)}
                />
                <Button title='Log In' 
                onPress={()=> (setSwitchToSign(false),setEmail(''), setPassword(''))} 
                style={styles.btnSecondary}
                color='red'
                />
            </View>
        </View>
    )
    }


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
      btnContainer:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'space-evenly'

      },
});


export default LoginScreen;