import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text, Header} from 'native-base';

import Colors from '../constants/Colors'

const HeaderCustom = props => {

    return(
        <View>
            <Header style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
            </Header>
        </View>

        
    );
    
}


const styles = StyleSheet.create({
    screen:{
        borderWidth:1
    },
    header:{
        justifyContent:'center',
        alignItems: 'center',
        color: Colors.primary
    }, 
    title:{
        fontSize:22,
        color: Colors.secondary
    }
});


export default HeaderCustom;