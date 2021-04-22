// import 'react-native-gesture-handler';
// import React, { useState, useEffect } from 'react';
// import { ScrollView, StyleSheet, View} from 'react-native';
// import {Header, Text} from 'native-base';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import auth from '@react-native-firebase/auth';

// import Colors from './constants/Colors'

// import ChallengesScreen from './screens/ChallengesScreen';
// import HomeScreen from './screens/HomeScreen';

// import Navigation from './components/Navigation';
// import HeaderCustom from './components/HeaderCustom';
// import AuthScreen from './screens/AuthScreen';
// import CreateChallengeScreen from './screens/CreateChallengeScreen';
// import {AuthProvider} from './context/UserContext';

import React from 'react';
import Providers from './navigation';

// const Stack = createStackNavigator();


export default function App(){
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);


  // const[error, setError] = useState();
  // const[valid, setValid] = useState();

  // function signIn(email, password){
  //   if(!email){
  //       setError('Email required');
  //       setValid(false);
  //       return;
  //   }else if(!password && password.trim() && password.length > 6 ){
  //       setError('Weak password, min length is 5 characters');
  //       setValid(false);
  //       return;
  //   }
  //   // }else if(!__isValidEmail(email)){
  //   //     setError('Invalid Email');
  //   //     setValid(false);
  //   //     return;
  //   // }
  //   createUser(email, password);
  // }

  // const createUser = async (email, password) => {

  //     try {
  //         let response= await auth().createUserWithEmailAndPassword(email, password);
  //         if(response){
  //             Alert.alert('Success', 'Account created successfully');
  //         }

  //     } catch (error) {
  //         console.log(error.message)
  //     }
  // }

  // const logIn = async (email,password) => {
  //     try{
  //         let response = await auth().signInWithEmailAndPassword(email, password);
  //     }catch(error){
  //         Alert.alert('Authentication went wrong', 'Please insert correct information or Sign Up')
  //     }
  // }
  // const signOut = async () =>{
  //   await firebase.auth().signOut();
  // }


  // if (initializing) return null;

  // if (!user) {
  //   return (
  //     <AuthScreen 
  //       signIn={(email, password)=> signIn(email,password)}
  //       logIn={(email,password)=>logIn(email,password)}
  //       createUser={(email,password)=>createUser(email,password)}
  //     />
  //   );
  // }

  // return (
    
  //   <NavigationContainer>
  //     <Stack.Navigator
  //     screenOptions={{
  //       headerStyle:{
  //         backgroundColor:Colors.primary,
  //       },
  //       headerTintColor: Colors.secondary
  //     }}
  //     >
  //       <Stack.Screen
  //         name="Home"
  //         component={HomeScreen}
  //       />
  //       <Stack.Screen
  //         name="Challenges"
  //         component={ChallengesScreen}
  //         />
  //         <Stack.Screen
  //         name="CreateChallenge"
  //         component={CreateChallengeScreen}
  //         options={{title:'Let\'s Create Challenge'}}
  //         user={user}
  //         />
  //     </Stack.Navigator>
  //   </NavigationContainer>
    
  // );  

  return <Providers />;
};





