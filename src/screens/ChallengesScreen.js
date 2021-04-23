import React, { useState } from 'react';
import {StyleSheet, Alert, FlatList, Button, View} from 'react-native';
import {Container, Text} from 'native-base';

import ChallengeInput from '../components/ChallengeInput';
import ChallengeItem from '../components/ChallengeItem';


import Colors from '../constants/Colors'


const ChallengesScreen = ({navigation}) => {

    
    const [userChallenges, setUserChallenges] = useState([]);
    const [isAddMode,setIsAddMode] = useState(false);


    const addChallengeHandler = challengeTitle =>{
        setUserChallenges(currentChallenges =>[
            ...currentChallenges, {
                id:Math.random().toString(), value:challengeTitle
            }
        ]);
        setIsAddMode(false);
    }

    const onChallengesReceived = (userChallenges) => {
        console.log(challengeList);
    };

    return(
        <View style={styles.screen}>
            {/* <Button block onPress={()=>navigation.navigate('CreateChallenge')}>
                <Text>Create new Challenge!</Text>
            </Button> */}
            <Button 
                color={Colors.secondary}
                onPress={()=>navigation.navigate('CreateChallenge')}
                title='Create new Challenge!'
                />
            <ChallengeInput visible={isAddMode} onAddChallenge={addChallengeHandler} />
            <FlatList
                keyExtractor={(item, index) =>item.id}
                data={userChallenges}
                renderItem = {itemData =>(
                    <ChallengeItem 
                        id={itemData.item.id}
                        title={itemData.item.value}
                    />
                )}
                />
        </View>
    );
};


const styles = StyleSheet.create({

    screen:{
        flex:1,
        padding:20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    
    },
    btn:{
        paddingTop:20,
        color:Colors.secondary,
        alignSelf: 'center'
    }
});


function exportChallenges(){
    
    onChallengesReceived(userChallenges);
}


export default ChallengesScreen;