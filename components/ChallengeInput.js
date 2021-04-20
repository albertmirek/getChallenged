import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Modal, Button } from 'react-native';
import {Container, Header, Card, Content, Text} from 'native-base';


import HeaderCustom from './HeaderCustom';



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
            {/* <TextInput placeholder="Challenge" 
                    style={styles.input}
                    onChangeText={challengeInputHandler}
                    value={enteredChallenge}
            />
            <View style={styles.btnsContainer}>
                <Button title="Add" onPress={addChallengeHandler} />
                <Button title="Cancel" color="red" onPress={props.onCancel} />
            </View> */}
              <Container>
                <Header>
                  <Button title="X"/>
                </Header>
                <Content padder>
                  <Card>
                    <TextInput 
                    onChangeText={challengeInputHandler}
                    placeholder="Add here smth" />
                    {/* <Button >
                      <Text>Save</Text>
                    </Button> */}
                  </Card>
                  
                </Content>
              </Container>
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
      },
    
})




export default ChallengeInput;