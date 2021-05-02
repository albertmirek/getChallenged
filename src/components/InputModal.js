import React, {useState} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
// import Modal from 'react-native-modal';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import {windowWidth, windowHeight} from '../utils/Dimensions';
import {authorize} from 'react-native-app-auth';


export default function InputModal(props){

    const [tokens, setTokens] = useState();

    // console.log(props.conditions);
    // const config = {
    //     clientId: '65386',
    //     clientSecret: '670bdd77878b804b3ff3137e4f7c74c6c3f7e8f7',
    //     // redirectUrl: 'myapp://oauthredirect',
    //     redirectUrl: 'org.getchallenged://getchallenged.org/',
    //     serviceConfiguration: {
    //       authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
    //       tokenEndpoint:
    //         'https://www.strava.com/oauth/token?client_id=65386&client_secret=670bdd77878b804b3ff3137e4f7c74c6c3f7e8f7',
    //         // revocationEndpoint: 'https://www.strava.com/oauth/deauthorize'

    //     },
    //     scopes: ['activity:read_all'],
    //   };
      
    //   async function hangleLogin(){
    //     try {
    //         const authState = await authorize(config);
    //       } catch (e) {
    //           console.log(e)
    //       }
    //   }
      const openStravaApp = async () => {
        const config = {
            clientId: '65386',
            clientSecret: '670bdd77878b804b3ff3137e4f7c74c6c3f7e8f7',
            // redirectUrl: 'myapp://oauthredirect',
            redirectUrl: 'myapp://localhost',
            // redirectUrl: 'org.getchallenged://getchallenged.org/',
            serviceConfiguration: {
              authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
              tokenEndpoint: 'https://www.strava.com/oauth/token?client_id=65386&client_secret=670bdd77878b804b3ff3137e4f7c74c6c3f7e8f7',
    
            },
            scopes: ['activity:read_all'],
        };
        const result = await authorize(config).then((val) =>console.log(val));
      };


    return(
        <Modal isVisible={props.isVisible}
                // avoidKeyboard={true}
                // backdropColor={Colors.pr}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
        >
            <View style={styles.screen}>
                <Button onPress={()=>props.setIsVisible(false)} 
                    title='Go back'
                />
                <Text>First Modal</Text>
                <Button  style={{alignSelf:'center'}}
                    title='Connect with Strava'
                    onPress={()=>openStravaApp()}
                />
                
            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({
    screen:{
        alignSelf:'center',
        height:windowHeight*0.8,
        width:windowWidth*0.9,
        backgroundColor:'white',
        borderRadius:40,
        
    }
});