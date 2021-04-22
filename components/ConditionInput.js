import React, {useEffect, useState} from 'react';
import { View, Text,  TextInput, TouchableOpacity, Image,
    StyleSheet, Modal, Alert

} from 'react-native';

import {CardItem, Header, Card, Badge, Picker, Icon, Switch, ActionSheet, Root, Form, Item, Row, Button, Content} from 'native-base';
import CustomActionSheet from './CustomActionSheet';
import CustomPicker from './CustomPicker';

import Colors from '../constants/Colors';
import DefinedActivities from '../constants/DefinedActivities';
import Icons from '../constants/Icons';


var BUTTONS = ["Sport", "Restrictions", "TODO Activity", "Other", "Cancel"];
var CANCEL_INDEX = 4;

var BUTTONS_I_A = [];
var BUTTONS_I_A_CANCEL = BUTTONS_I_A.length;

// TODOS:
//Dodělat kontroly: např. při zadání numerického repetition

const ConditionInput = props => {

    const [enteredCondition, setEnteredConditon] = useState();

    const [area, setArea] = useState('');
    const [activity, setActivity] = useState('');
    const [goalType, setGoalType] = useState('');
    const [goal, setGoal] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [unit, setUnit] = useState('');
    const [unitIsEnabled, setUnitIsEnabled] = useState(false);
    const [repetition, setRepetition] = useState('');
    const [repetitionNumeric, setRepetitionNumeric] = useState('');
    const [repetitionEnabled, setRepetitionEnabled] = useState(false);
    useEffect(() => {
        setEnteredConditon('');
        setArea('');
        setActivity('');
        setGoal('');
        setIsEnabled(false);
        setGoalType('');
        setUnit('');
        setUnitIsEnabled(false);
        setRepetition('');
        setRepetitionNumeric('');
        setRepetitionEnabled(false);
      }, [props.visibility]);

    const onGoalTypeChange = (val) => {
        setGoal(val);
    }

    function createCondition(){
        if(area=='' || activity=='' || goal==''){
            Alert.alert('Error', 'Please input all required informations about condition');
        }else{
            setEnteredConditon([
                {
                    area: area,
                    activity: activity,
                    goalType:goalType,
                    goal:goal,
                    isEnabled:isEnabled,
                    unit:unit,
                    unitIsEnabled,
                    repetitionEnabled:repetitionEnabled,
                    repetitionNumeric:repetitionNumeric,
                    repetition:repetition
                }]);
                props.onCreate(enteredCondition)
        }
    }


    let activityOptions;
    if(isEnabled && area!=''){
        activityOptions = <View style={styles.activityContainer}>
        <CustomActionSheet title='Choose activity' 
                sheetTitle='Select from listed areas'
                usage='activity'
                area={area} 
                setState={(val)=>setActivity(val)}
                
        />
        <Text style={styles.mainText}>{activity}</Text>
        </View>
    }
    else{
        activityOptions=<TextInput style={styles.textInput} placeholder='Type in the activity for this condition' />;
    }

    let units;
    if(unitIsEnabled){
        units=<CustomPicker usage='units' area={area} activity={activity} setState={(val)=>setUnit(val)} />
    }else{units=<TextInput placeholder='Specify units (km, words,..)' onChangeText={(val)=>setUnit(val)} />}

    let goalOptions;
    if(goalType=='Numeric'){
        goalOptions=<View>
            <Text style={styles.informativeText}>To select from predefined unit measures toggle the switch on. Otherwise type in unit measure</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Switch style={{marginTop:10}}
                    trackColor={{ false: "#767577", true: Colors.secondSetPrimary }}
                    // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    thumbColor={unitIsEnabled ? Colors.secondary:  "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setUnitIsEnabled(previousState =>!previousState)}
                    value={unitIsEnabled}/>
                    
                    {units}
            
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingTop:10}}>
            <TextInput style={styles.textInput} onChangeText={(text)=>setGoal(text)} placeholder='Numeric Goal'/>
            <Text style={styles.informativeText}>[{unit}]</Text>
            </View>
        </View>;
    }else if(goalType=='Binary'){
        goalOptions=<View>
            <Text style={styles.informativeText}>By enabling binary option, higher specified action will need to be performed every given interval specified in Repetition section </Text>
        </View>;
        if(repetitionEnabled==false){
            setRepetitionEnabled(true);
        }
    }
    let repetitionOptions;
    if(goalType=='Numeric' && repetitionEnabled==true){
        repetitionOptions = <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:10}}>
            <CustomPicker usage='repetition' setState={(val)=> setRepetition(val)} />
            <Text>Calculated amount:</Text>
        </View>;
    }else if(goalType=='Binary'&&repetitionEnabled==true){
        repetitionOptions = <View style={{flexDirection:'row', justifyContent:'center', paddingTop:10}}>
        <CustomPicker usage='repetition' setState={(val)=> setRepetition(val)} />
        </View>;
    }

    return(

        <Root>
        <Modal visible={props.visibility} animationType="slide">
              <View style={styles.screen}>
                  <Header style={styles.header}>
                      <View style={styles.headerContainer}>
                        <Text style={styles.title}>Condition creation</Text>
                        <View style={styles.btnContainer}>
                            {/* TODO Buttons logics */}
                            <Button  danger transparent
                                onPress={props.onCancel}
                            ><Text style={{color:'red', fontSize:20, fontWeight:'bold'}} >Cancel</Text></Button>

                            <Button transparent 
                                onPress={()=>createCondition()}
                            ><Text style={{color:Colors.secondary, fontSize:20, fontWeight:'bold'}}>Create</Text></Button>
                        
                        </View>
                        </View>
                  </Header>
                
                <View style={styles.bodyContainer}>
                    <Card>
                        <CardItem style={styles.cardItem}>
                            
                            <View style={styles.areaContainer}>
                                
                                {/* <Badge style={{backgroundColor:Colors.secondary}}>
                                    <Text style={{color:Colors.primary, fontWeight:'bold'}}>1</Text>
                                </Badge> */}

                                <Button bordered dark style={{}}
                                onPress={() =>
                                ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    title: "Select from listed areas"
                                },
                                buttonIndex => {
                                    //this.setState({ clicked: BUTTONS[buttonIndex] });
                                    if(BUTTONS[buttonIndex]==='Cancel'){return;}else{
                                        setArea(BUTTONS[buttonIndex]);
                                    }
                                })}
                                ><Text style={styles.btnText}>Choose area</Text></Button>

                                <Text>:</Text>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text style={styles.subText}>Chosen area:</Text>
                                    <Text style={styles.mainText}>{area}</Text>
                                </View>
                            </View>
                
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <View style={styles.switchContainer}>
                                <Text style={styles.informativeText}>For third party trackers switch on</Text>
                                <Switch style={{marginTop:10}}
                                    trackColor={{ false: "#767577", true: Colors.secondSetPrimary }}
                                    // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    thumbColor={isEnabled ? Colors.secondary:  "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsEnabled(previousState =>!previousState)}
                                    value={isEnabled}
                                />
                        </View>
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <View>
                            <Text style={styles.informativeText} >By enabling third party trackers, choosing from activites of certain area is limited</Text>
                            
                            {activityOptions}
                            
                            </View>
                        
                            
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <View style={styles.goalContainer}>
                                <Text style={styles.headerGoal}>Goal modeling</Text>
                                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                    <CustomActionSheet title='Choose type' sheetTitle='Select from listed types'
                                    setState={(val) => setGoalType(val)}
                                    usage='goalType'
                                    />
                                    <View style={{justifyContent:'center', alignContent:'center'}}>
                                        <Text style={styles.subText}>Chosen type:</Text>
                                        <Text style={styles.mainText}>{goalType}</Text>
                                    </View>
                                    
                                </View>
                                {goalOptions}    
                            </View>
                            
                        </CardItem>

                        <CardItem style={styles.cardItem}>
                            <View style={{flex:1}}>
                                <Text style={{color:Colors.secondary, alignSelf:'center', fontSize:18, paddingVertical:10 }}>Repetition</Text>
                                <Text style={styles.informativeText}>This section is optional and is for specifying repetition of task</Text>
                                <Text style={styles.informativeText}>By defining repetition participants will need to enter progress every specified repetition.</Text>
                                {/* <CustomPicker usage='repetition' setState={(val)=> setRepetition(val)} /> */}
                                <Switch style={{marginTop:10}}
                                    trackColor={{ false: "#767577", true: Colors.secondSetPrimary }}
                                    // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    thumbColor={repetitionEnabled ? Colors.secondary:  "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setRepetitionEnabled(previousState =>!previousState)}
                                    value={repetitionEnabled}/>
                                    <View>
                                        {repetitionOptions}
                                    </View>
                            </View>
                        </CardItem>
                    </Card>
                    
                </View>
              </View>
              
              
        </Modal>
        </Root>
    );

}



const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor:Colors.primary
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:Colors.primary
    },  
    header:{
        backgroundColor:Colors.primary
    },
    headerContainer:{
        flex: 1,
        justifyContent:'flex-start',
        backgroundColor:Colors.primary
    },
    title:{
        alignSelf:'center',
        fontSize:18,
        color:Colors.secondary,
        fontWeight:'bold'
    },
    bodyContainer:{
        flex:1,
        
        
    },
    areaContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingBottom:10,
    },
    cardItem:{
        backgroundColor:Colors.subPrimary,
        borderBottomColor:Colors.secondary,
        borderBottomWidth:0.3,
    },
    switchContainer:{
        flexDirection:'column',
        
    },
    textInput:{
        fontSize:18,
        paddingTop:10,
        color:Colors.primary,
        fontWeight:'500'
    },
    activityContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    headerGoal:{
        fontSize:22,
        borderBottomWidth:20,
        borderBottomColor:Colors.secondary,
        color:Colors.secondary,
        fontWeight:'600',
        alignSelf:'center',
        paddingTop:10
    },
    goalContainer:{
        flex:1,
        
    },
    mainText:{
        color:Colors.primary,
        fontSize:16,
        alignSelf:'center',
        fontWeight:'500',
        borderBottomWidth:1
    },
    informativeText:{
        color:Colors.subsubPrimary
    },
    subText:{
        fontSize:14,
        color:Colors.subsubPrimary,
    },
    btnText:{
        fontSize:14,
        fontWeight:'500',
        paddingHorizontal:5
    },  

});


export default ConditionInput;