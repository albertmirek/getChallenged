import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {} from 'native-base';

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';


const Condition = props =>{



    return(
        <View style={styles.container}>
            <Text>Condition input</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderRadius:5,
        borderColor:Colors.primary,

    },
});