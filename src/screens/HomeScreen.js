import React, {useState, useContext} from 'react';
import { View, StyleSheet, Button } from 'react-native';

import Navigation from '../components/Navigation';
import HeaderCustom from '../components/HeaderCustom';
import FormButton from '../components/FormButton';

import ChallengesScreen from './ChallengesScreen';

import ChallengeInput from '../components/ChallengeInput';
import Colors from '../constants/Colors';
import { AuthContext } from '../navigation/AuthProvider';



export default function HomeScreen ({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const {user, logout} = useContext(AuthContext);

    const modalVisibleHandler = () => {
        setModalVisible(true);
    }

    return(
        <View style={styles.screen}>
            

            <FormButton buttonTitle='Logout' onPress={()=>logout()} />



            <Navigation nav={navigation} modalVisibleHandler={()=>modalVisibleHandler()} />

        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent:'center',
      },
      
});

