import React,{useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Item, Label} from 'native-base';
import { AuthContext } from '../navigation/AuthProvider';
import Colors from '../constants/Colors';
import { useEffect } from 'react/cjs/react.development';


const ChatItem = props =>{
    const {user} = useContext(AuthContext);

    return(
        <View style={styles.message} >
                    {props.userId==user.uid? 
                    <Item style={{alignSelf:'flex-end', backgroundColor:Colors.secondary, borderRadius:10}}>
                        <View style={styles.border}>
                            <Item>
                                <Text style={{fontSize:10, color:'silver'}}>You</Text>
                            </Item>
                            <Label style={{color:Colors.primary}}>{props.message}</Label>
                        </View>   
                    </Item> 
                :
                <Item style={{alignSelf:'flex-start'}}>
                    <View style={styles.border}>
                        <Item>
                            <Text style={{fontSize:10}}>{props.username}</Text>
                        </Item>
                        <Label>{props.message}</Label>
                    </View>   
                </Item> 
                }            
        
        </View>
    )

}

export default ChatItem;


const styles = StyleSheet.create({
    message:{
        marginVertical:5,
        marginHorizontal:5,
    },
    border:{
        borderWidth:0.17,
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:10
    }
});