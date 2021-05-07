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
import { DatabaseContext } from '../navigation/DatabaseProvider';


const ChallengesScreen = ({navigation}) => {

    
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const {user} = useContext(AuthContext);
    const {userChallenges, getChallengesInfo, getArrayUserChallenges, arrayUserChallenges} = useContext(DatabaseContext);
    

    useEffect(()=>{
        if(arrayUserChallenges!=[]){
            arrayUserChallenges.forEach(challengeID=>{
                firestore().collection('challenges').doc(challengeID).get()
                .then(challenge => {
                    challenge._data.id = challengeID;
                        if(challenges == []){
                        setChallenges(challenge);
                    }else{
                        setChallenges(prevChallenges=>[...prevChallenges,challenge])
                    }
                })
            })
        }

        if(loading){
            setLoading(false);
        }
        // return subscriber;
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
                                conditions={item._data.conditions}
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