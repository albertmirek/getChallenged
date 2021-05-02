import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, Alert, FlatList, Button, View} from 'react-native';
import {Container, Text} from 'native-base';

import ChallengeInput from '../components/ChallengeInput';
import ChallengeItem from '../components/ChallengeItem';
import Loading from '../components/Loading';

import {AuthContext} from '../navigation/AuthProvider';
import {ChallengeContext} from '../navigation/ChallengeProvider';
import firestore from '@react-native-firebase/firestore';


import Colors from '../constants/Colors'


const ChallengesScreen = ({navigation}) => {

    
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user} = useContext(AuthContext);

    useEffect(()=>{
        // const subscriber = firestore().collection('participants').doc(user.uid).get()
        // .then((retrieved) => getChallenges(retrieved._data.challenges));

        const subscriber = firestore().collection('participants').doc(user.uid).get()
        .then((challengesArray) => {
            if(challengesArray._data.challenges==[]){
                return;
            }else{
                challengesArray._data.challenges.forEach(challenge => {
                    firestore().collection('challenges').doc(challenge).get()
                    .then((retrieved) => {
                        retrieved._data.id = challenge;
                        if(validateDuplicity(retrieved)){
                            if(challenges===[]){
                                setChallenges(retrieved);
                            }
                            else{
                                setChallenges((prevChallenges)=> [...prevChallenges, retrieved]);
                            }
                            console.log('update of challenge occured');
                       }
                    });
                });
            }
        });


        if(loading){
            setLoading(false);
        }
        return subscriber;
    },[]);

    
    function validateDuplicity(challenge){
        var val = true;
        challenges.forEach(element => {
            if(element._data.id==challenge._data.id){
                val = false;
            }
        });
        return val;
    }

    if(loading){
        return <Loading />
    }
    if(!loading){
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
                    <FlatList
                        data={challenges}
                        renderItem={({item})=> (
                            <ChallengeItem 
                                id={item._data.id}
                                name={item._data.name}
                                stage={item._data.stage}
                                beginDate={item._data.beginDate}
                                endDate={item._data.endDate}
                                description={item._data.description}
                                navigation={navigation}
                            />
                        )}
                        keyExtractor={item=>item._data.id}
                    />
            </View>
        );
    }
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



export default ChallengesScreen;