import React,{createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {authorize} from 'react-native-app-auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RestApiContext} from './ApiProvider';
import { AuthContext } from './AuthProvider';


export const DatabaseContext = createContext({});

export const DatabaseProvider = ({children}) => {

    const [userChallenges, setUserChallenges] = useState([]);
    // const [challenges, setChallenges] = useState([]);
    const [token, setToken] = useState();
    const [userName, setUserName] = useState('');

    const [arrayUserChallenges, setArrayUserChallenges] = useState([]);
    const [challengeInfo, setChallengeInfo] = useState();

    const {user} = useContext(AuthContext);

    return(
        <DatabaseContext.Provider
            value={{
                userName,
                setUserName,
                userChallenges,
                
                // challenges,
                // setChallenges,

                arrayUserChallenges,
                getArrayUserChallenges: (uid) =>{
                    firestore().collection('participants').doc(uid).get()
                    .then(data => {
                        setArrayUserChallenges(data._data.challenges);
                    });
                },
                updateArrayUserChallenges: (uid, challengeId)=>{
                    console.log(uid);
                    console.log(challengeId);
                    firestore().collection('participants').doc(uid).update({
                        challenges: firestore.FieldValue.arrayUnion(challengeId)
                    });
                    setArrayUserChallenges(prevChallenges=>[...prevChallenges, challengeId]);
                },
                challengeInfo,
                getChallengesInfo: (challengeId) => {
                    firestore().collection('challenges').doc(challengeId).get()
                    .then(data => {
                        // setChallengeInfo(data);
                        return data;
                    })
                },


                getUserChallenges: (uid)=>{
                    var obtainedChallenges = [];
                    firestore().collection('participants').doc(uid).get()
                    .then(userChallengesArray=> {
                        if(userChallengesArray._data.challenges!=[]){
                            userChallengesArray._data.challenges.forEach(challenge => {
                                var input={};
                                firestore().collection('challenges').doc(challenge).get()
                                .then(challengeInfo => {
                                    firestore().collection('challenges').doc(challenge).collection('conditions').get()
                                    .then(conditions=>{
                                        input = challengeInfo;
                                        input._data.id = challenge;
                                        // conditions._docs._data._ref={};
                                        // input._data.conditions = [];
                                        conditions.forEach(condition => {
                                            condition = condition._data;
                                        });
                                        // console.log(conditions);
                                        input._data.conditions = conditions._docs;
                                        input._data.conditions.forEach(condition => {
                                            condition = condition._data
                                            // console.log(condition);
                                        });
                                        // console.log(input._data.conditions);
                                        console.log(userChallenges);
                                        if(userChallenges===[]){
                                            console.log('prázdny')
                                            setUserChallenges(input);

                                        }else{

                                            setUserChallenges((prevChallenges)=>[...prevChallenges,input]);
                                        }
                                    })
                                })
                            });
                        }
                    });
                },
                
                insertApiToken: (user, data, api)=>{
                    try {
                        firestore().collection('participants').doc(user+'/apis/'+api).set({
                            id: api,
                            accessToken: data.accessToken,
                            accessTokenExpirationDate: data.accessTokenExpirationDate,
                            refreshToken:data.refreshToken,
                            tokenType: data.tokenType,
                            apiUserId: data.id
                        });
                        setToken(data);
                    } catch (e) {
                        console.log(e);
                    }
                },
                updateApiToken: (user, data, api) => {
                    firestore().collection('participants').doc(user+'/apis/'+api).update({
                        accessToken: data.accessToken,
                        accessTokenExpirationDate: data.accessTokenExpirationDate,
                        refreshToken:data.refreshToken,
                        tokenType: data.tokenType,
                        apiUserId: data.id
                    });
                    setToken(data);
                },
                
                // Je token expirovaný?
                isExpired: (token) => {
                    var nowDate = new Date();
                    nowDate = Date.parse(nowDate);
 
                    var tokenDate = token.accessTokenExpirationDate
                    tokenDate = Date.parse(tokenDate);

                    if(tokenDate<nowDate){
                        console.log('tokenDate<nowDate');
                        return true;
                    }else if (tokenDate>nowDate){
                        console.log('tokendDate> nowDate');
                        return false;
                    }
                },

                token,
                getToken: (uid, api) => {
                    if(token==undefined){
                        firestore().collection('participants').doc(uid+'/apis/'+api).get()
                            .then((data)=>{
                                if(data._exists == true){
                                    setToken(data._data);
                                    return true;
                                }else{
                                    console.log(data);
                                    return false;
                                }
                            })
                    }else{
                        return true;
                    }

                },



                insertActivity: (uid, challengeId, activity, tracker, conditionId) => {

                    console.log('inserting activity');
                    // console.log(challengeId);
                    // console.log(conditionId);
                    // console.log(uid);
                    console.log(activity);
                    if(tracker){               
                        firestore().collection('challenges').doc(challengeId+'/conditions/'+conditionId+'/'+uid+'/'+activity.id).get()
                        .then(data=>{
                            console.log('get executed');
                            if(data._exists == true){
                                Alert.alert('Wrong Data','You cant insert duplicate data in context of one condition');
                            }else{
                                // firestore().collection('challenges').doc(challengeId).collection('conditions').doc(condition.id).collection(uid).doc(activity.id).set({
                                //     id: activity.id,
                                //     value: activity.value,
                                //     insertDate: new Date(),
                                //     dateOfExecution: activity.date
                                // });
                                // firestore().collection('challenges').doc(challengeId+'/inputs/'+uid+)
                                firestore().collection('challenges').doc(challengeId+'/conditions/'+conditionId+'/'+uid+'/'+activity.id).set({
                                    id: activity.id,
                                    value: activity.value/1000,
                                    activity: activity.activity,
                                    unit: activity.unit,
                                    insertDate: new Date(),
                                    dateOfExecution: activity.date
                                }).then((inserted)=>console.log(inserted));
                                Alert.alert('Input inserted','Your inputs have been successfuly saved');
                            }
                        })
                    }else{
                        firestore().collection('challenges').doc(challengeId).collection('conditions').doc(condition.id).collection(uid).doc(activity.id).set({
                            id: new Date(),
                            value: activity.value,
                        })
                        Alert.alert('Input inserted','Your inputs have been successfuly saved');
                    }
                    // firestore().collection('challenges').doc(challengeId+'/inputs/'+uid).set({
                    //     id:activity.id,
                    //     type:activity.type,
                    //     distance:activity.distance,
                    //     dateOfAcivitiy:activity.date,
                    //     duration:activity.time,

                    // })
                }

            }}
            >
                {children}
        </DatabaseContext.Provider>
    )
};