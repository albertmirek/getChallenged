import React, {useEffect, useState} from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Image,
    StyleSheet, Modal

} from 'react-native';

import {CardItem, Header, Card, Badge, Picker, Icon, Switch, ActionSheet, Root, Form, Item} from 'native-base';
import CustomActionSheet from './CustomActionSheet';

import Colors from '../constants/Colors';
import DefinedActivities from '../constants/DefinedActivities';
import Icons from '../constants/Icons';


var BUTTONS = ["Sport", "Restrictions", "TODO Activity", "Other", "Cancel"];
var CANCEL_INDEX = 4;

var BUTTONS_I_A = [];
var BUTTONS_I_A_CANCEL = BUTTONS_I_A.length;

const ConditionInput = props => {

    const [enteredCondition, setEnteredConditon] = useState([]);

    const [area, setArea] = useState('');
    const [technology, setTechnology] = useState();
    const [activity, setActivity] = useState();
    const [goalType, setGoalType] = useState();
    const [goal, setGoal] = useState();
    const [isEnabled, setIsEnabled] = useState(false);


    function insertActivities(area){
        
        BUTTONS_I_A=[];
        BUTTONS_I_A.push("Cancel");
        DefinedActivities.forEach(element => {
            if(element.area=area&&element.function == 'area'){
                BUTTONS_I_A.push(element.name);
            }
            // var length = BUTTONS_I_A.length;
            // BUTTONS_I_A[length] = "Cancel";
            
        });
    }

    const onGoalTypeChange = (val) => {
        setGoal(val);
    }

    useEffect(() => {
        setArea('');
        setTechnology('');
        setActivity('');
        setGoal('');
        setIsEnabled(false);
      }, [props.visibility]);

    let activityOptions;

    if(isEnabled && area!=''){
        // insertActivities(area);
        // BUTTONS_I_A += ['Test'];
        activityOptions = <View style={styles.activityContainer}>
        <CustomActionSheet title='Choose activity' 
                sheetTitle='Select from listed areas'
                usage='activity'
                area={area} 
                setState={(val)=>setActivity(val)}
                
        />
        <Text style={{color:Colors.secondary, fontSize:16, alignSelf:'center', fontWeight:'600'}}>{activity}</Text>
        </View>
        // <View style={styles.activityContainer}><Button title='Choose activity' color={Colors.secondary} 
        // onPress={() =>
        // ActionSheet.show(
        // {
        //     options: BUTTONS_I_A,
        //     cancelButtonIndex: BUTTONS_I_A_CANCEL,
        //     title: "Select from listed areas"
        // },
        // buttonIndex => {
        //     //this.setState({ clicked: BUTTONS[buttonIndex] });
        //     if(BUTTONS_I_A[buttonIndex]==='Cancel'){return;}else{
        //         setActivity(BUTTONS_I_A[buttonIndex]);
        //     }
        // })}
        // /><Text style={{color:Colors.secondary, fontSize:16, alignSelf:'center', fontWeight:'600'}}>{activity}</Text>
        // </View>
    }
    else{
        activityOptions=<TextInput style={styles.textInput} placeholder='Type in the activity for this condition' />;
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
                            <Button title='Cancel'
                                // onPress={props.onCancel}
                                onPress={props.onCancel}
                                color='red'
                            />
                            <Button title='Create'
                                //onPress={props.onCreate}
                                color={Colors.secondary}
                            />
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

                                <Button title='Choose area' color={Colors.secondary}
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
                                /> 

                                <Text>:</Text>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{color:'#CC80FF'}}>Chosen area:</Text>
                                    <Text style={{fontSize:16, color:Colors.secondary}}>{area}</Text>
                                </View>
                            </View>
                        {/* <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        /> */}
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <View style={styles.switchContainer}>
                                <Text>For third party trackers switch on</Text>
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
                            <Text >By enabling third party trackers, choosing from activites of certain area is limited</Text>
                            
                            {activityOptions}
                            
                            </View>
                        
                            
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <View style={styles.goalContainer}>
                                <Text style={styles.headerGoal}>Goal</Text>
                                <View>
                                    <CustomActionSheet title='Choose type' sheetTitle='Select from listed types'
                                    setState={(val) => setGoalType(val)}
                                    usage='goalType'
                                    />
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
        
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },  
    header:{
        backgroundColor:Colors.primary
    },
    headerContainer:{
        flex: 1,
        justifyContent:'flex-start',
    
    },
    title:{
        alignSelf:'center',
        fontSize:18,
        color:Colors.secondary,
        fontWeight:'bold'
    },
    bodyContainer:{
        flex:1,
        marginTop:40,
        
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
        color:Colors.secondary,
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


});


export default ConditionInput;