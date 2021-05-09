import React,{useEffect, useState, useContext} from 'react';
import { View,StyleSheet, Text , FlatList} from 'react-native';
import {Toast} from 'native-base';

import firestore from '@react-native-firebase/firestore';

import {DatabaseContext} from '../navigation/DatabaseProvider';
import {AuthContext} from '../navigation/AuthProvider';
import ChallengeItem from '../components/ChallengeItem';
import Loading from '../components/Loading';

const SearchChallengeScreen = props =>{


    const [possibleChallenges, setPossibleChallenges]= useState();
    const[loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const {user} = useContext(AuthContext);
    const {arrayUserChallenges} = useContext(DatabaseContext);

    useEffect(()=>{
        // console.log(arrayUserChallenges);
        firestore().collection('challenges').where(firestore.FieldPath.documentId(), 'not-in', arrayUserChallenges).where('isPublic','==', true) .get()
        .then(querySnapshot=>{
            var inputs=[];
            querySnapshot._docs.forEach(element => {
                var doc = {};
                doc._data = element._data;
                doc._data.id = element._ref._documentPath._parts[1];
                inputs.push(doc);
            });
            setPossibleChallenges(inputs)
        })

        if(loading) setLoading(false);

    },[arrayUserChallenges])


    if(loading){
        return <Loading/>
    }

    return(
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <FlatList
                data={possibleChallenges}
                renderItem={({item})=> (
                    <ChallengeItem 
                        possesion={true}

                        id={item._data.id}
                        name={item._data.name}
                        stage={item._data.stage}
                        beginDate={item._data.beginDate}
                        endDate={item._data.endDate}
                        description={item._data.description}
                        conditions={item._data.conditions}
                    />
                )}
                keyExtractor={item=>item._data.id}
            />
        </View>
    )
}

export default SearchChallengeScreen;

const styles = StyleSheet.create({
    
});