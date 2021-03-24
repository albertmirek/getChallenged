import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal } from 'react-native';


const ChallengeInput = props => {

    const [enteredChallenge, setEnteredChallenge] = useState('');

    const challengeInputHandler = (enteredText) => {
        setEnteredChallenge(enteredText);
      };

    const addChallengeHandler = () => {
        props.onAddChallenge(enteredChallenge);
        setEnteredChallenge('');
    }


    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
            <TextInput placeholder="Challenge" 
                    style={styles.input}
                    onChangeText={challengeInputHandler}
                    value={enteredChallenge}
            />
            <View style={styles.btnsContainer}>
                <Button title="Add" onPress={addChallengeHandler} />
                <Button title="Cancel" color="red" onPress={props.onCancel} />
            </View>
        </View>
      </Modal>
    );

}


const styles = StyleSheet.create({
    inputContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      input: {
        borderBottomColor:'black', 
        borderBottomWidth:1,  
        width: '70%',
        textAlign: 'center'
      },
      btnsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '50%'
      }
})




export default ChallengeInput;