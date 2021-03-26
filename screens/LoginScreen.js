import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';


const LoginScreen = props => {

    return(
        <View style={styles.screen}>
            <Text>Welcome!</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignContent: 'center',
        justifyContent: 'center',
    }
});


export default LoginScreen;