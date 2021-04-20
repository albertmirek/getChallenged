import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import {Container} from 'native-base';
import auth from '@react-native-firebase/auth';


import HeaderCustom from '../components/HeaderCustom';

const LoginScreen = props => {

    //Login/SignUp Screen... false= LoginScreen
    const [switchToSign, setSwitchToSign] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const[error, setError] = useState();
    const[valid, setValid] = useState();

    const emailInputHandler = (enteredText) => {
        setEmail(enteredText);
    }

    const passwordInputHandler = (enteredText) => {
        setPassword(enteredText);
    }

    function signIn(email, password){
        if(!email){
            setError('Email required');
            setValid(false);
            return;
        }else if(!password && password.trim() && password.length > 6 ){
            setError('Weak password, min length is 5 characters');
            setValid(false);
            return;
        }
        // }else if(!__isValidEmail(email)){
        //     setError('Invalid Email');
        //     setValid(false);
        //     return;
        // }
        createUser(email, password);
    }
    
    const createUser = async (email, password) => {

        try {
            let response= await auth().createUserWithEmailAndPassword(email, password);
            if(response){
                Alert.alert('Success', 'Account created successfully');
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const logIn = async (email,password) => {
        try{
            let response = await auth().signInWithEmailAndPassword(email, password);
        }catch(error){
            Alert.alert('Authentication went wrong', 'Please insert correct information or Sign Up')
        }
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
                onPress={()=> logIn(email,password)}
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
                onPress={() => signIn(email,password)}
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