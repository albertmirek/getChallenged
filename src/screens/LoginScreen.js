import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Colors from  '../constants/Colors';
import {AuthContext} from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function LoginScreen({navigation}){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {login} = useContext(AuthContext);
    const {error} = useContext(AuthContext);


    return(
        // <LinearGradient colors={[Colors.primary, '#f23F23' ,Colors.secondary]} style={styles.container}>
         <View style={styles.container}>
            <Text style={styles.text}>Welcome to GetChallenged</Text>
            <FormInput
                value={email}
                placeholderText='Email'
                onChangeText={userEmail=> setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrext={false}
                />
            <FormInput
                value={password}
                placeholderText='Password'
                onChangeText={userPassword=> setPassword(userPassword)}
                secureTextEntry={true}
                />
            <FormButton     
                buttonTitle='Login'
                onPress={()=> login(email,password)}
                />
                <Text>{error}</Text>
            <TouchableOpacity
                style={styles.navButton}
                onPress={()=> navigation.navigate('Signup')}>
                    
                    <Text style={styles.navButtonText}>New User? Sign up here!</Text>
                </TouchableOpacity>
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        fontSize: 24,
        marginBottom: 10
      },
      navButton: {
        marginTop: 15
      },
      navButtonText: {
        fontSize: 20,
        color: '#6646ee'
      }
    
});