import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {} from 'native-base';

import Colors from '../constants/Colors';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Icons from '../constants/Icons';
import { Icon } from 'native-base';


const ConditionCreated = props => {

    var about;
    var goal;
    var repetition;
    if(props.repetitionEnabled){
        repetition=<View style={styles.repetitionContainer}>
            <Text style={styles.text}>{props.repetition}</Text>
            <Text style={styles.textPrimary} >{props.repetitionNumeric}</Text>
            <Text style={styles.text}>{props.unit}</Text>
        </View>
    }

    var trackerEnabled
    if(props.isEnabled==true){
        trackerEnabled=<Icon style={styles.checkIcon} type={Icons.positiveCheck.type} name={Icons.positiveCheck.name}/>
    }else trackerEnabled=<Icon style={styles.checkIcon} type={Icons.negativeCheck.type} name={Icons.negativeCheck.name}/>

    if(props.goalType == 'Binary'){
        goal=<View style={styles.goalContainer}>
        <Icon type={Icons.trophy.type} name={Icons.trophy.name} style={styles.trophy}/>
            <Text style={styles.textPrimary} >{props.activity}</Text>
        </View>;
        repetition=<View style={styles.repetitionBinary}>
                    <Text style={styles.text}>{props.repetition}</Text>
        </View>
    }else{
        goal=<View style={styles.goalContainer}>
                <Icon type={Icons.trophy.type} name={Icons.trophy.name} style={styles.trophy}/>
        
                <Text style={styles.textPrimary} >{props.goal}</Text>
                <Text style={styles.text} >{props.unit}</Text>
        </View>
    }

    return(
        <View style={styles.container}>
            <View style={styles.aboutContainer}>
                <View>
                <Text style={styles.text}>{props.area}:</Text>
                <Text style={styles.textPrimary}>{props.activity}</Text>
                </View>
                <Text style={styles.text}>{props.isEnabled}</Text>
                <View style={styles.trackerContainer}>
                    <Text style={{color:'white'}}>Tracker:</Text>
                    {trackerEnabled}
                </View>
            </View>
            
            {goal}

            {repetition}
            
        </View>
    )
}

export default ConditionCreated;


const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:3,
        borderRadius:5,
        borderColor:Colors.secondary,
        width: windowWidth*0.95,
        height: windowHeight*0.2,
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'stretch',
        backgroundColor:Colors.secondary,
        marginVertical:7
    },
    aboutContainer:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-evenly',
        borderBottomWidth:0.3,
        borderColor:Colors.primary,
        paddingVertical:5
    },
    goalContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth:0.3,
        borderColor:Colors.primary,
    },
    repetitionContainer:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',

    },
    text:{
        fontSize:20,
        color:'white'
    },
    textPrimary:{
        color:Colors.primary,
        fontSize:20,
    },
    checkIcon:{
        color:Colors.primary,
        fontSize:20,
        alignSelf:'center'
    },
    trackerContainer:{
        justifyContent:'center',
        alignContent:'center',
    },
    trophy:{
        color:Colors.primary,
        fontSize:60,
    },
    goal:{
        flex:0.25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    repetitionBinary:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
    },
});