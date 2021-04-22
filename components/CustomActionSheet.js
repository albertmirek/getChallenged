import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ActionSheet, Button} from 'native-base';


import DefinedActivities from '../constants/DefinedActivities';
import Colors from '../constants/Colors';


// var BUTTONS = [];
// var CANCEL_INDEX = BUTTONS.length;

const CustomActionSheet = props => {

    var BUTTONS = [];
    var CANCEL_INDEX = BUTTONS.length;

    function insert(usage){
        BUTTONS = []
        BUTTONS.push("Cancel");
        if(props.area){
            DefinedActivities.forEach(element => {
                if(element.area==props.area&&element.usage == 'activity'){
                    BUTTONS.push(element.name);
                }
                
                
            });
        }else{
            DefinedActivities.forEach(element => {
                if(element.usage==props.usage){
                    BUTTONS.push(element.name);
                }
                
            });
        }
    }

    if(props.usage!=null){
        insert(props.usage);
    }
    
    return(
        <Button bordered dark color={Colors.secondary}
            onPress={() =>
            ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: props.sheetTitle
            },
            buttonIndex => {
                //this.setState({ clicked: BUTTONS[buttonIndex] });
                if(BUTTONS[buttonIndex]==='Cancel'){return;}else{
                    props.setState(BUTTONS[buttonIndex]);
                }
            })}
            ><Text style={styles.btnText}>{props.title}</Text></Button>
    )


}

export default CustomActionSheet;


const styles = StyleSheet.create({
    btnText:{
        fontSize:14,
        fontWeight:'500',
        paddingHorizontal:5
    },
});