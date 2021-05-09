import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Modal, Button } from 'react-native';
import {Content, Header, Title, Container, CardItem, Card, Item, Label} from 'native-base';

import Colors from '../../constants/Colors';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

import CustomActionSheet from '../CustomActionSheet';
import { AuthContext } from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../FormInput';
import ChatItem from '../ChatItem';
import { DatabaseContext } from '../../navigation/DatabaseProvider';


const GeneralTab = props => {

    const [preparedMessage, setPreparedMessage] = useState({});
    const [messages, setMessages] = useState([]);
    
    const {user} = useContext(AuthContext);
    const {userName} = useContext(DatabaseContext);


    useEffect(()=>{
        const chatRef = firestore().collection('challenges/'+props.id+'/chat');
        const chatSubscriber= chatRef.onSnapshot(snap=>{
                snap.docChanges().forEach(change=>{
                    if(change.type==="added"){
                        if(change.doc._data.message != null ){
                            console.log(change.doc._data);
                            if(messages!=[]){
                                var message = {};
                                message.id = change.doc._data.id;
                                message.username = change.doc._data.username;
                                message.message = change.doc._data.message;
                                message.userId = change.doc._data.userId;
                                setMessages(prevMessages=>[...prevMessages, message]);
                            }
                        }
                    }
                })
        })

        return ()=> chatSubscriber();
    },[])


    useEffect(()=>{
        if(preparedMessage!={}){
            var id = Date.parse(preparedMessage.id);
            firestore().collection('challenges').doc(props.id+'/chat/'+id).set({
                    id: id,
                    username: preparedMessage.username,
                    message: preparedMessage.message,
                    userId: preparedMessage.userId
                });
        }

    }, [preparedMessage])



    var messageBody;
    const onChangeTextMessageHandler = text =>{
        messageBody = text
    }


    function sendText(){
        if(preparedMessage!={}){
            var date = new Date();
            setPreparedMessage({
                id: date,
                username: userName,
                message: messageBody,
                userId: user.uid
            });
            messageBody='';
        }
    }

    return(
        <View>
            
                <Title style={styles.title}>
                    {props.name}
                </Title>
            

            <Card>
                <CardItem header>
                    <View>
                        <Text style={{fontSize:20}}>Progress</Text>
                        <Text style={{opacity:0.5}}>completed progress, that you already made</Text>
                    </View>
                </CardItem>
                <CardItem cardBody>
                <FlatList
                        data={props.inputs}
                        renderItem={({item})=> (
                            <Item>
                                <Label>{item.activity}: </Label>
                                <Label style={{color:Colors.primary}}>{item.value}</Label>
                                <Label>[{item.unit}]</Label>
                            </Item>
                            // <Text>values: {item.value}</Text>
                        )}
                        keyExtractor={item=>item.id}
                    />
                </CardItem>

            </Card>

            <View style={styles.chatSection}>
                    
                    <FlatList
                        data={messages}
                        
                        renderItem={({item})=> (
                            <ChatItem
                                message={item.message}
                                userId={item.userId}
                                username={item.username}
                                />
                            // <View>
                            //     <Text>{item.username}</Text>
                            //     <Text>{item.message}</Text>
                            // </View>
                        )}
                        keyExtractor={item=>item.id}
                        />
                        <View style={styles.inputContainer}>
                            <FormInput 
                            // value={messageBody}
                            onChangeText={(text)=>onChangeTextMessageHandler(text)}
                            placeholderText='Enter Text ...'
                            />
                            <Button title='Send' color={Colors.primary} 
                                onPress={()=> sendText()}
                            />
                        </View>
                    </View>
            {/* CHAT */}

        </View>
    )
}



export default GeneralTab;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        
    },
    title:{
        fontSize:24,
        color:Colors.primary,
        margin:15,
        alignSelf:'flex-start',
        paddingLeft:10
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    chatSection:{
        height:windowHeight*0.55,
        width:windowWidth,
    }
});