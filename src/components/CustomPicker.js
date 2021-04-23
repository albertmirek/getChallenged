import React,{useState} from 'react';
import { View,Text, StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import DefinedActivities from '../constants/DefinedActivities';



const CustomPicker = props =>{

    var pickerItems=[];

    

    function insertUnits(){
        // DefinedActivities.forEach(element=>{
        //     if(element.area == props.area && element.name== props.activity){
        //         pickerItems.push({label:element.label, value:element.value});
        //     }
        // });
        DefinedActivities.forEach(element=>{
            if(element.area == props.area && element.name== props.activity){
                element.units.forEach( unit=>{
                    pickerItems.push({label:unit.label, value:unit.value});
                })
            }
        })
        
    }

    function insertItems(){
        DefinedActivities.forEach(element=>{
            if(element.usage == props.usage){
            element.values.forEach(value=>{
                pickerItems.push({label:value.label, value:value.value})
            })}
        })
    }

    if(props.usage=='units'){
        insertUnits();
    }else if(props.usage=='repetition'){
        insertItems();
    }

    return(
        <RNPickerSelect
        onValueChange={(value) => props.setState(value)}
        items={pickerItems}
        // items={[
        //     { label: 'Football', value: 'football' },
        //     { label: 'Baseball', value: 'baseball' },
        //     { label: 'Hockey', value: 'hockey' },
        // ]}
    />
    )

    
}

export default CustomPicker;

const styles = StyleSheet.create({
    
});