import React, {useState, useEffect, useContext} from 'react';
import { Text, View , StyleSheet, Button, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import { Title,Switch, Header, Icon, Tabs, Tab, Content, StyleProvider, Card, CardItem, Form, Item, Label, Input, ListItem, CheckBox, Body, Segment, Left, Right, Container, Footer} from 'native-base';

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';

import ConditionInput from '../components/ConditionInput';
import DatePicker from '../components/DatePicker';
import ConditionCreated from '../components/ConditionCreated';
import {windowHeight, windowWidth} from '../utils/Dimensions';


import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';


const CreateChallengeScreen = props => {

    const [visibilityCondition, setVisibilityCondition] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    
    const [beginDate, setBeginDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);

    const {user} = useContext(AuthContext);
    
    const [reference, setReference] = useState('');
    const [conditionsCount, setConditionsCount] = useState(0);
    const [conditions, setConditions] = useState([]);
   

    useEffect(() => {
        if(reference=='') return;
        else if(visibilityCondition==true) return;
        const subscriber = firestore().collection('challenges').doc(reference).collection('conditions')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(element => {
                    // console.log('Element activity: '+element._data.activity);
                    insertChallengeConditions(element);
                    console.log('Podmínka passnuta');
                });
            });
        
        return subscriber;
      }, [visibilityCondition]);
    

    function createChallenge(){
        firestore().collection("challenges")
            .add({
                stage:'initiated',
                created_by:user.uid,
            }).then((doc)=> {
                setReference(doc.id)
                console.log(reference);
            });
    }

    const onConditionCreateHandler = () => {
        //Zobrazování Condition Inputu
        //TODO dolpnit do podmínky beginDate!=endDate&& beginDate<endDate
        // Při vytváření challenge terpve přiřadit Conditions & vypočítat repetition
        // if(beginDate == endDate){
        //     Alert.alert('Specify dates','For inserting conditions you have to first specify date for challenge');
        // }
        if(beginDate){
            if(reference==''){
                createChallenge();
            }
            setVisibilityCondition(true);
        }else{
            Alert.alert("Wrong date", "Please choose correct date before specifying conditions");
        }
        
    }

    function createConditionHandler (condition){
        console.log(condition);
        setConditionsCount(conditionsCount+1);
        setVisibilityCondition(false);
        assignCondition(reference, condition);
    }

    function assignCondition(ref, condition){
        var subcollection= ref+'/conditions/'+conditionsCount;
        console.log(subcollection);
        firestore().collection('challenges').doc(subcollection).set({
            id:         conditionsCount,
            area:       condition.area,
            activity:   condition.activity,
            goalType:   condition.goalType,
            goal:       condition.goal,
            isEnabled:  condition.isEnabled,
            unit:       condition.unit,
            unitIsEnabled:      condition.unitIsEnabled,
            repetitionEnabled:  condition.repetitionEnabled,
            repetitionNumeric:  condition.repetitionNumeric,
            repetition:         condition.repetition,
        }).then(()=>console.log('Inserted'));
    }

    
    function insertChallengeConditions(condition){
        console.log('Passed Data: '+ condition._data.area);
        if(checkForDuplicates(condition, conditions)){
            setConditions([...conditions,condition]);
        }
        console.log(conditions);
    }
    
    function checkForDuplicates(condition, conditions){
        var val = true;
        conditions.forEach(element => {
            if(element._data.id == condition._data.id){
                val=false;
            }
        });
        return val;
    }

    const cancelChallengeAlert = () =>
    Alert.alert(
      "Discard challenge?",
      "By submitting, all inputs will be discarded",
      [
        {
          text: "Cancel",
        //   onPress: () => props.navigation.navigate('Home'),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            if(reference!=''){
            firestore().collection('challenges').doc(reference).delete();
            }
            props.navigation.navigate('Home');
        } }
      ]
    );
    const createChallengeHandler = () => {
        if(reference!=''){
            firestore().collection('challenges').doc(reference).update({
                stage:'created'
            });
            // var subcollection = reference+'/participants/'+user.uid;
            // firestore().collection('challenges').doc(subcollection).set({
            //     id:user.uid
            // });
            firestore().collection('participants').doc(user.uid).set({
                challenges:[
                    reference
                ]
            });
            props.navigation.navigate('Home');
        }
    }

    return(


        <View style={styles.screen}>
         <Container style={{height:windowHeight, width:windowWidth, flex:1}} >
                
                <Header hasTabs style={{backgroundColor:Colors.primary}} >
                    <Left>
                        <Button title='Cancel' color={'red'} onPress={()=>cancelChallengeAlert()}/>
                    </Left>
                    <Body>
                        <Title style={{color:Colors.secondary}}>Challenge</Title>
                    </Body>
                    <Right>
                        <Button title='Create' color={Colors.secondary} onPress={()=>createChallengeHandler()}/>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Tabs
                    tabBarActiveTextColor={Colors.secondary}
                    tabBarUnderlineStyle={{backgroundColor:Colors.secondary}}
                    tabContainerStyle={{borderBottomWidth:0, elevation:0}}
                    >
                        <Tab heading='General'  activeTabStyle={{backgroundColor:Colors.primary}} 
                        tabStyle={{backgroundColor:Colors.secondary}} textStyle={{color:'white'}} >
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
                                            <CheckBox checked={isPublic} onPress={()=>setIsPublic(!isPublic)} color={Colors.primary} style={{}}/>
                                            <Body style={{marginHorizontal:10}}>
                                                <Text style={{color:Colors.primary, fontSize:18}}>Public</Text>
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
                            tabStyle={{backgroundColor:Colors.secondary}} textStyle={{color:'white'}} >
                            <View style={{flex:1}}>
                                <Button color={Colors.secondary} title='Create new Condition' 
                                onPress={onConditionCreateHandler}
                                />
                                {/* <View>
                                    {challengeConditions}
                                    
                                </View> */}
                                <FlatList
                                    data={conditions}
                                    renderItem={({item})=> (
                                        <ConditionCreated 
                                            area={item._data.area}
                                            activity={item._data.activity}
                                            goalType={item._data.goalType}
                                            goal={item._data.goal}
                                            isEnabled={item._data.isEnabled}
                                            unit={item._data.unit}
                                            unitIsEnabled={item._data.unitIsEnabled}
                                            repetition={item._data.repetition}
                                            repetitionNumeric={item._data.repetitionNumeric}
                                            repetitionEnabled={item._data.repetitionEnabled}
                                        />
                                    )}
                                    keyExtractor={item=>item._data.id}
                                />
                            </View>
                        </Tab>

                        <Tab heading='Social'  activeTabStyle={{backgroundColor:Colors.primary}}
                        tabStyle={{backgroundColor:Colors.secondary}} textStyle={{color:'white'}} >
                            {/* TODO: Share, Chat?, Invite */}
                        </Tab>
                    </Tabs>
                    
                </Content>
            <Footer style={{backgroundColor:Colors.primary}}>
                <ConditionInput visibility={visibilityCondition}
                    onCancel={()=> setVisibilityCondition(false)}
                    onCreate={(val)=>createConditionHandler(val)}
                    beginDate={beginDate} endDate={endDate} 
                    />
                    </Footer>
        
         </Container>
        </View>
    )
}
    

const styles = StyleSheet.create({
    content:{
        flex:1,
        flexGrow:1,
        height:windowHeight,
        width:windowWidth
    },  
    screen:{
        flex: 1,
        width:'100%',
        height:'100%'
    },
    card:{
        backgroundColor:Colors.secondary,
        borderRadius:5,
        
    },
    cardItems:{
        flex:1,
        height:10000
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