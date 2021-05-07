import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet, Button , Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Navigation from '../components/Navigation';
import HeaderCustom from '../components/HeaderCustom';
import FormButton from '../components/FormButton';

import ChallengesScreen from './ChallengesScreen';

import ChallengeInput from '../components/ChallengeInput';
import Colors from '../constants/Colors';
import { AuthContext } from '../navigation/AuthProvider';


import firestore from '@react-native-firebase/firestore';
import { DatabaseContext } from '../navigation/DatabaseProvider';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { Container } from 'native-base';

export default function HomeScreen ({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const {user, logout} = useContext(AuthContext);
    const {getArrayUserChallenges,arrayUserChallenges} = useContext(DatabaseContext);

    const modalVisibleHandler = () => {
        setModalVisible(true);
    }

    //test timestamp
    useEffect(()=>{
        getArrayUserChallenges(user.uid);
        // console.log(arrayUserChallenges);
        
        //Testing
        var firstDate = new Date(2021-5-4);
        var secondDate = new Date(2021-4-1);

        var result = Date.parse(firstDate)  -  Date.parse(secondDate) ;
        console.log(Date.parse(result));
    },[])

    return(
        // <View style={styles.screen}>
        // <Container style={styles.screen}>
        <LinearGradient colors={['#4c669f', '#192f6a']} style={{flex:1}}>
            
            <FormButton buttonTitle='Logout' onPress={()=>logout()} />

            <Text>HAHA</Text>
            <Navigation nav={navigation} modalVisibleHandler={()=>modalVisibleHandler()} />
            
        </LinearGradient>
        // </Container>
        // {/* </View> */}
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent:'center',
      },
      
});

