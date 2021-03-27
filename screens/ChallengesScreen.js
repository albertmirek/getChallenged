import React, { useState } from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {Container, Text, Button} from 'native-base';

import ChallengeInput from '../components/ChallengeInput';
import ChallengeItem from '../components/ChallengeItem';

import {addChallenge, getChallenges} from '../api/ChallengeApi';


const ChallengesScreen = props => {

    
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
        <Container style={styles.screen}>
            <Button block onPress={()=>setIsAddMode(true)}>
                <Text>Create new Challenge!</Text>
            </Button>
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
        </Container>
    );
};


const styles = StyleSheet.create({

    screen:{
        flex:1,
        padding:20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth:1
    }
});


function exportChallenges(){
    
    onChallengesReceived(userChallenges);
}


export default ChallengesScreen;