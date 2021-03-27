import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';


const ChallengeItem = props => {


    return (
        <TouchableOpacity key={props.id}  activeOpacity={0.3}>
            <View style={styles.listItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding:10,
        backgroundColor: 'red',
        borderColor: 'black', 
        borderWidth: 1,
        marginVertical:10
      },

});


export default ChallengeItem;