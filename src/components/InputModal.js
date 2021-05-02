import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
// import Modal from 'react-native-modal';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import {windowWidth, windowHeight} from '../utils/Dimensions';


export default function InputModal(props){

    // console.log(props.conditions);

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
                    onPress={()=> handleLogin()}
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