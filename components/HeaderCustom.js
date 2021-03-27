import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text, Header} from 'native-base';


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
        alignItems: 'center'
    }, 
    title:{
        fontSize:22
    }
});


export default HeaderCustom;