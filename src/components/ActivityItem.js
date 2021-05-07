import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import {Form, Input, Item, Label} from 'native-base';
import Colors from '../constants/Colors';
import moment from 'moment'

const ActivityItem = props =>{


    return(
        <TouchableOpacity style={styles.container}
            onPress={()=>props.onPress(props.id)}
        >
            

                <View style={styles.primaryRow}>
                    <Item>
                        <Label style={styles.mainText}>{props.name}</Label>
                    </Item>
                    <Item>
                        <Label style={styles.mainText}>{props.distance} m</Label>
                    </Item>
                </View>

                <View style={styles.secondaryRow}>
                    <View>
                        
                        <Label style={styles.subText}>Date: </Label>
                        
                        <Item>
                            <Label style={styles.secondaryText}>{props.date}</Label>
                        </Item>
                    </View>
                    <View>
                        
                        <Label style={styles.subText}>Time: </Label>
                        
                        <Item>
                            <Label style={styles.secondaryText}>{props.time}</Label>
                        </Item>
                    </View>
                </View>
                
            
        </TouchableOpacity>
    )

}

export default ActivityItem;

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        alignContent:'center',
        padding:5,
        margin:5,
        borderWidth:0.3,
        borderRadius:25,
        // backgroundColor:'#FFB347',
        backgroundColor:Colors.primary,
        shadowOpacity:0.25,
        paddingVertical:15
    },
    primaryRow:{
        flexDirection:'row',
        flex:0.7,
        margin:5,
        justifyContent:'space-evenly'
    },
    secondaryRow:{
        flexDirection:'row',
        flex:0.3,
        justifyContent:'space-evenly'
    },
    mainText:{
        color:'white',
        fontSize:20,
        fontWeight:'600'
    },
    secondaryText:{
        opacity:1
    },
    subText:{
        opacity:0.45
    }
});