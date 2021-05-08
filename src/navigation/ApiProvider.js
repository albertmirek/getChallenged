import React,{createContext, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {authorize, refresh} from 'react-native-app-auth';
import { Alert } from 'react-native';
import {DatabaseContext} from './DatabaseProvider';
import {AuthContext} from './AuthProvider';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';


export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {

    const [stravaConfig, setStravaConfig] = useState();
    const stravaActivitiesEndpoint = `https://www.strava.com/api/v3/athlete/activities?access_token=`
    
    const [refreshToken, setRefreshToken]= useState('');
    const [token, setToken] = useState('');
    const [activities, setActivities]= useState({});

    const {insertApiToken, updateApiToken} = useContext(DatabaseContext);
    const {user} = useContext(AuthContext);
    
    return(
        <ApiContext.Provider
            value={{
                stravaConfig,
                initializeStravaConfig: async ()=>{
                    await firestore().collection('config').doc('esoAPI').get()
                    .then(config=>{
                        fetch(`https://the-silverback.com/api/getChallenged/apiStrava/api.php?name=${config._data.value}`)
                        .then(res => res.json())
                        .then(data => {                            
                            setStravaConfig({
                                clientId: `${data.data.id}`,
                                clientSecret: data.data.secret,
                                redirectUrl: 'myapp://localhost',
                                serviceConfiguration: {
                                    authorizationEndpoint: `https://www.strava.com/oauth/mobile/authorize`,
                                    tokenEndpoint: data.data.endpoint
                                },
                                scopes: ['activity:read_all'],
                            })
                        })
                    })
                },

                stravaInitialExchange: async () => {
                    let bool = true;
                    try {  
                        while(bool){
                        await authorize(stravaConfig).then((data) => {
                            if(data.scopes[0]=='read'){
                               bool=true 
                            }else {
                                bool = false;
                                console.log(data);
                                insertApiToken(user.uid, data, 'strava');
                            }
                        });
                        }  
                    } catch (e) {
                        if(bool == true){
                            Alert.alert('Permission needed','Please confirm options whilst connecting to Strava in order to import activities.')
                        }
                        console.log(e);
                    }
                },
                doRefreshToken: async (token)=> {
                    console.log(stravaConfig);
                    try {
                        const result = await refresh(stravaConfig,{
                            refreshToken: token,
                        }).then(res=>{
                            setRefreshToken(res.refreshToken);
                            setToken(res);
                            insertApiToken(res); 
                        });
                    } catch (e) {
                        console.log(e)
                    }
                    
                },

                token,
                setToken,
                stravaActivitiesEndpoint,
                activities,
                getActivities: async (accessToken, from, to)=>{
                    console.log(stravaConfig);
                    try {
                        await fetch(stravaActivitiesEndpoint+accessToken)
                        .then(res=>res.json())
                        .then(data=>console.log(data));
                    } catch (e) {
                        console.log(e);
                    }
                },

                


                // refreshAccessToken: async (token, config) => {
                //     try {
                //         const result = await refresh(config,{
                //             refreshToken: `${token.refreshToken}`,
                //         }).then((data)=> {
                //             updateApiToken(user.uid, data, 'strava');
                //         });
                //     } catch (e) {
                //         console.log(e);
                //     }
                // },

                
                // revocateToken: async (token) => {
                //     try {
                //         const result = await fetch(`https://www.strava.com/oauth/deauthorize?access_token=${token.accessToken}`, {
                //             method: 'POST',
                //           }).then((answer) => {
                //             //   console.log(answer._data.__collector);
                //             console.log(answer._bodyBlob._data);
                //             //   updateApiToken(user.uid, answer._data.__collector, 'strava')
                //           });
                //     } catch (e) {
                //         console.log(e)
                //     }
                // }
                


            }}
            >
                {children}
            </ApiContext.Provider>
    )
};