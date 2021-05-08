import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import {Form, Header, Input, Picker} from 'native-base';
import moment from 'moment';


import FormInput from '../components/FormInput';
import CustomActionSheet from '../components/CustomActionSheet';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import {windowWidth, windowHeight} from '../utils/Dimensions';
import {DatabaseContext} from '../navigation/DatabaseProvider';
import {AuthContext} from '../navigation/AuthProvider';
import {ApiContext} from '../navigation/ApiProvider';
import firestore from '@react-native-firebase/firestore';
import ActivityItem from './ActivityItem';


const InputModal =props =>{

    const [tokens, setTokens] = useState();
    const [chosenCondition, setChosenCondition] = useState();
    const [activities, setActivities] = useState([]);

    const {isExpired, accessTokenStravaExpiration, hasRefreshToken, insertActivity} = useContext(DatabaseContext);
    const {user} = useContext(AuthContext);
    const {setToken,token,stravaInitialExchange, stravaActivitiesEndpoint, doRefreshToken} = useContext(ApiContext);

    useEffect(()=>{
        console.log('effect');
        console.log(props.condition);
        console.log(activities);
    },[activities])
    // console.log(props.conditions);

    const openStravaApp = () => {
        if(token==''){
            firestore().collection('participants').doc(user.uid+'/apis/strava').get()
            .then((retrievedToken)=>{
                console.log(retrievedToken.refreshToken);
                var nowDate = new Date();
                if(retrievedToken._exists==true && Date.parse(retrievedToken._data.accessTokenExpirationDate)>Date.parse(nowDate)){
                    console.log('fetching');
                    setToken(retrievedToken._data);
                    getActivities(retrievedToken._data.accessToken);
                }else if(retrievedToken.exists==true && Date.parse(retrievedToken._data.accessTokenExpirationDate)<Date.parse(nowDate)){
                   doRefreshToken(retrievedToken._data.refreshToken)
                }else{
                    stravaInitialExchange();
                }
            })
        }else{
            console.log(token.accessToken);
            getActivities(token.accessToken);
        }
    };

    async function getActivities(accessToken) { 
        await fetch(stravaActivitiesEndpoint+accessToken)
                    .then(res=>res.json())
                    .then(data=>{
                        data.forEach(activity => {
                            // console.log(activity);
                            if(activity.type==props.condition.activity){
                                if(activities!=[]){
                                    setActivities(prevActivities=>[...prevActivities, activity]);
                                }else{
                                    setActivities(activity);
                                }
                            }
                        });
                    })
    }



    return(
        <Modal isVisible={props.isVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
        >
            <View style={styles.screen}>
                
                

                <Button bordered warning  style={{alignSelf:'center', padding:5}}
                        onPress={()=>openStravaApp()}
                        title='Fetch Activities with Strava'
                        />

                <FlatList
                        data={activities}
                        renderItem={({item})=> (
                            <ActivityItem
                                id={item.id}
                                distance={item.distance}
                                time={item.moving_time}
                                name={item.name}
                                date={item.start_date_local}
                                condition={props.condition}
                                onPress={()=>props.getActivity(item)}
                            />
                        )}
                        keyExtractor={item=>item.id}
                    />

                <Button onPress={()=>props.setIsVisible(false)} 
                    title='Go back'
                    style={styles.goback}
                />
                
            </View>
            
        </Modal>
    )


}

export default InputModal;

const styles = StyleSheet.create({
    screen:{
        alignSelf:'center',
        height:windowHeight*0.8,
        width:windowWidth*0.9,
        backgroundColor:'white',
        borderRadius:40,
        flex:0.9
    },
    goback:{
        alignSelf:'flex-end'
    },  
});