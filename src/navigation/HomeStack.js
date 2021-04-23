import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import CreateChallengeScreen from '../screens/CreateChallengeScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function HomeStack(){

    return(
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor:Colors.primary,
                    },
                    headerTintColor:Colors.secondary
                }}>
                <Stack.Screen name='Home' 
                    component={HomeScreen}/>
                <Stack.Screen
                    name="Challenges"
                    component={ChallengesScreen}
                />
                <Stack.Screen
                    name="CreateChallenge"
                    component={CreateChallengeScreen}
                    options={{title:'Let\'s Create Challenge'}}
                    // user={user}
                />   
            </Stack.Navigator>
    )
}