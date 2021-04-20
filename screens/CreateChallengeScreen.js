import React, {useState} from 'react';
import { Text, View , StyleSheet, Button, Image, TouchableOpacity, Alert} from 'react-native';
import {Switch, Header, Icon, Tabs, Tab, Content, StyleProvider, Card, CardItem, Form, Item, Label, Input, ListItem, CheckBox, Body, Segment} from 'native-base';

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';

import ConditionInput from '../components/ConditionInput';
import DatePicker from '../components/DatePicker';


const CreateChallengeScreen = () => {

    const [visibilityCondition, setVisibilityCondition] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    
    const [beginDate, setBeginDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);


    console.log(endDate-beginDate);

    const onConditionCreateHandler = () => {

        //TODO dolpnit do podmínky beginDate!=endDate&& beginDate<endDate
        if(beginDate){
            setVisibilityCondition(true);
        }else{
            Alert.alert("Wrong date", "Please choose correct date before specifying conditions");
        }
    }


    // if(specificDatesEnabled==true || fromTodayEnabled == true){
    //     () => setFromTodayEnabled(false);
    // }

    return(

        <View style={styles.screen}>
                
                <Tabs
                tabBarActiveTextColor={Colors.secondary}
                tabBarUnderlineStyle={{backgroundColor:Colors.secondary}}
                tabContainerStyle={{borderBottomWidth:0, elevation:0}}
                >
                    <Tab heading='General'  activeTabStyle={{backgroundColor:Colors.primary}} 
                    tabStyle={{backgroundColor:Colors.subPrimary}}>
                        <View style={styles.imgContainer}>

                        </View>
                        <View style={styles.cardItems}>
                                <Card style={styles.card}>
                                    <Icon type={Icons.addIcon.type} name={Icons.addIcon.name} style={styles.imgIcon} />
                                    <CardItem style={{backgroundColor:Colors.secondary}}>
                                            <Item>
                                                <Label style={{color:Colors.primary}}>Name Challenge: </Label>
                                                <Input style={{color:Colors.primary, fontWeight:'bold', alignSelf:'center'}} />
                                            </Item>
                                    </CardItem>
                                    
                                    <ListItem style={{backgroundColor:Colors.secondary}}>
                                        <CheckBox checked={isPublic} onPress={()=>setIsPublic(!isPublic)} style={{backgroundColor:Colors.secondSetPrimary}}/>
                                        <Body>
                                            <Text style={{color:Colors.primary}}>Public</Text>
                                        </Body>
                                    </ListItem>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignContent:'center', paddingTop:10}}>
                                        <View style={{}}>
                                            <Text style={styles.text}>From:</Text>
                                            <DatePicker date={beginDate} setDate={(val)=>setBeginDate(val)} title='Select start date' />
                                        </View>
                                        
                                        <View>
                                            <Text style={styles.text}>To:</Text>
                                            <DatePicker date={endDate} setDate={(val)=>setEndDate(val)} title='Select end date' />
                                        </View>
                                    </View>
                                    {/* TODO Start/End date picker; Description TextArea */}
                                </Card>
                            </View>
                    </Tab>

                    <Tab heading='Conditions'  activeTabStyle={{backgroundColor:Colors.primary}}
                     tabStyle={{backgroundColor:Colors.subPrimary}}   >
                        <View>
                            <Button color={Colors.secondary} title='Create new Condition' 
                            onPress={onConditionCreateHandler}
                            />
                            {/* TODO Conditions */}
                        </View>
                    </Tab>

                    <Tab heading='Social'  activeTabStyle={{backgroundColor:Colors.primary}}
                    tabStyle={{backgroundColor:Colors.subPrimary}}>
                        {/* TODO: Share, Chat?, Invite */}
                    </Tab>
                </Tabs>

            <ConditionInput visibility={visibilityCondition}
                onCancel={()=> setVisibilityCondition(false)} 
                beginDate={beginDate} endDate={endDate}
                />
            
        </View>
    )
}
    

const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    card:{
        backgroundColor:Colors.secondary,
        borderRadius:5,
        
    },
    img:{
        width: 50,
        height: 50,
    },
    btn:{
        backgroundColor: Colors.secondary,
        color: Colors.secondary
    },
    imgContainer:{
        flexDirection:'row',
        justifyContent: 'center'
    },
    generalInputContainer:{
        flexGrow: 1
    },
    
    imgIcon:{
        color:Colors.primary,
        alignSelf:'center',
        paddingVertical: 10,
        fontSize: 40,
        
    },
    
    text:{
        color:Colors.primary,
        paddingLeft:15
    },
});

export default CreateChallengeScreen;