import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const CustomFunctionComponent = props => {

    // Jiný zápis funkcionální komponenty
    /*
    function CustomFunctionComponent(props){
        return();
    }
    */

    const [value,setValue] = useState(0);
    const [enabled, setEnabled] = useState(true);
    const [header, setHeader] = useState('');

    useEffect(() => {
        if(enabled){
            setHeader('Incerementation is enabled, smash the button!');
        }else{
            setHeader('Incerementation is stopped, click "Start Incerement" button');
        }
    },[enabled])

    // také lze zapsat jako 'function changeValue(){}'
    const changeValue = () => {

        if(enabled){
        setValue(value+1);
        }
        else return Alert.alert('You have disabled the option of incerementing your number!')
    }

    return(
        <View>
            <Text>{header}</Text>

            <Text>
                This is the state reaction: clicked:{value}</Text>

            <Button title="Click Me!" 
            onPress={changeValue}/>

            <Button title="Stop Incrementing" 
            onPress={() => setEnabled(false)}/>
            <Button title="Start Incrementing" 
            onPress={()=> (setEnabled(true))}/>
        </View>
    )
}


const styles = StyleSheet.create({

});

export default CustomFunctionComponent;