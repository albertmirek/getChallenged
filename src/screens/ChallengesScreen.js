import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, Alert, FlatList, Button, View} from 'react-native';
import {Container, Text} from 'native-base';

import ChallengeInput from '../components/ChallengeInput';
import ChallengeItem from '../components/ChallengeItem';

import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import Colors from '../constants/Colors'


const ChallengesScreen = ({navigation}) => {

    
    const [userChallenges, setUserChallenges] = useState([]);
    const [isAddMode,setIsAddMode] = useState(false);
    const [challenges, setChallenges] = useState([]);

    const {user} = useContext(AuthContext);

    useEffect(()=>{
        firestore().collection('participants').doc(user.uid).get()
        .then((retrieved) => getChallenges(retrieved))
    },[])

    // const addChallengeHandler = challengeTitle =>{
    //     setUserChallenges(currentChallenges =>[
    //         ...currentChallenges, {
    //             id:Math.random().toString(), value:challengeTitle
    //         }
    //     ]);
    //     setIsAddMode(false);
    // }

    const onChallengesReceived = (userChallenges) => {
        console.log(challengeList);
    };

    function getChallenges(array){
        // console.log(array);
        array._data.challenges.forEach(challenge => {
            // console.log(challenge)
            firestore().collection('challenges').doc(challenge).get()
            .then((retrieved) => {
                retrieved._data.id= challenge;
                if(challenges==[]){
                    setChallenges(retrieved);
                    console.log(challenges)
                }
                else{
                    setChallenges([...challenges,retrieved]);
                }
                // console.log(retrieved);
            });
        });
    }
    function insertChallenge(challenge, id){
        challenge._data.id = id;
        setChallenges([...challenges, challenge]);
        
    }

    return(
        <View style={styles.screen}>
            <Button 
                style={styles.btn}
                color={Colors.secondary}
                onPress={()=>navigation.navigate('CreateChallenge')}
                title='Create new Challenge!'
                />
            {/* <ChallengeInput visible={isAddMode} onAddChallenge={addChallengeHandler} /> */}
            {/* <FlatList
                keyExtractor={(item, index) =>item.id}
                data={userChallenges}
                renderItem = {itemData =>(
                    <ChallengeItem 
                        id={itemData.item.id}
                        title={itemData.item.value}
                    />
                )}
                /> */}
                {/* <FlatList
                    data={challenges}
                    renderItem={({item})=> (
                        // <ConditionCreated 
                        //     area={item._data.area}
                        //     activity={item._data.activity}
                        //     goalType={item._data.goalType}
                        //     goal={item._data.goal}
                        //     isEnabled={item._data.isEnabled}
                        //     unit={item._data.unit}
                        //     unitIsEnabled={item._data.unitIsEnabled}
                        //     repetition={item._data.repetition}
                        //     repetitionNumeric={item._data.repetitionNumeric}
                        //     repetitionEnabled={item._data.repetitionEnabled}
                        // />
                        <ChallengeItem
                            name={item._data.name}
                            stage={item._data.stage}
                            />
                    )}
                    keyExtractor={item=>item._data.id}
                /> */}
        </View>
    );
};


const styles = StyleSheet.create({

    screen:{
        flex:1,
        padding:20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },
    btn:{
        paddingTop:20,
        alignSelf: 'center',
    }
});


function exportChallenges(){
    
    onChallengesReceived(userChallenges);
}


export default ChallengesScreen;