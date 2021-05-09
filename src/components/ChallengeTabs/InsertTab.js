import React,{useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import {CheckBox,Content, Header, Root, ActionSheet, Form, Input, Label, Item} from 'native-base';

import firestore from '@react-native-firebase/firestore';

import Colors from '../../constants/Colors';
import CustomActionSheet from '../CustomActionSheet';
import Loading from '../Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import { ApiContext } from '../../navigation/ApiProvider';
import { DatabaseContext } from '../../navigation/DatabaseProvider';
import InputModal from '../InputModal';


var BUTTONS= [];
var CANCEL_INDEX = BUTTONS.length;
const InsertTab = (props) => {
    
    const {user} = useContext(AuthContext);
    const {getActivities}= useContext(ApiContext);
    const {insertActivity} = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);
    
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
    const [inputWithApi, setInputWithApi] = useState(false);
    
    const [chosenCondition, setChosenCondition] = useState({});
    const [conditions, setConditions] = useState([]);

    const [disabledSendButton, setDisabledSendButton] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const [activityInput, setActivityInput] = useState({id:Date.now()});

    useEffect(()=>{
        insertCondition();
        

        if(loading){
            setLoading(false);
        }

        // return ()=>subscriber();
    },[])


    function insertCondition(){
        BUTTONS=[];
        BUTTONS.push('Cancel');
        props.conditions.forEach(item => {
            BUTTONS.push(item.area +': ' + item.activity+ ' '+ item.goalType);

        });
        setConditions(props.conditions);
    }

    function onChooseConditionHandler(conditionIndex){
        // setChosenCondition(conditionIndex);
        console.log(conditionIndex);
        conditions.forEach(condition=>{
            if(condition.id==conditionIndex){
                setInputWithApi(condition.isEnabled);
                setChosenCondition(condition);
                setArea(condition.area);
                setActivity(condition.activity);
                setGoalType(condition.goalType);
                setGoal(condition.goal);
                setIsEnabled(condition.isEnabled);
                setUnit(condition.unit);
                setUnitIsEnabled(condition.unitIsEnabled);
                setRepetition(condition.repetition);
                setRepetitionNumeric(condition.repetitionNumeric);
                setRepetitionEnabled(condition.repetitionEnabled);
            }
        })
    }

    const sendInputs = () =>{

        insertActivity(user.uid, props.challengeId, activityInput, isEnabled, chosenCondition.id);

        console.log('updating called');
        props.valuesUpdate(chosenCondition, activityInput.value);
    }


    const onActivityReturn = (activity)=>{

        setModalVisible(false);
        setInputWithApi(false);
        setDisabledSendButton(false);
        setActivityInput(prevData=>({
            ...prevData,
            id:activity.id,
            value:activity.distance,
            unit:chosenCondition.unit,
            activity:chosenCondition.activity,
            date:activity.start_date_local
        }));
        // setActivityInput({
        //     ...activityInput,
        //     id:activity.id,
        //     value:activity.distance,
        //     date:activity.start_date_local
        // });
    }


    var repetitionContainer;
    if(repetitionEnabled){
        repetitionContainer=<View>
            <Item>
                <Label>{repetition}</Label>
                <Label>{repetitionNumeric} {unit}</Label>
            </Item>
        </View>
    }
    let modal;
    if(modalVisible==true){
     modal =<InputModal 
                isVisible={modalVisible}
                condition={chosenCondition}
                setIsVisible={(val) => setModalVisible(val)}
                getActivity={(item)=>onActivityReturn(item)}
            />
    }else  modal=null;
    
    if(loading) return <Loading />;

    return(
        <Root>
        <View>
            {/* <Text>InsertTab</Text> */}

            

            <Form style={styles.infoContainer}>
                <Button warning style={styles.actionBtn} color={Colors.primary}
                    title='Choose condition'
                onPress={() =>
                    ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        title: 'Choose from listed conditions'
                    },
                    buttonIndex => {
                        if(BUTTONS[buttonIndex]==='Cancel'){return;}else{
                            // console.log(BUTTONS[buttonIndex])
                            onChooseConditionHandler(buttonIndex-1);

                        }
                    })}
                />

                <View style={styles.row}>
                    <Item>
                        <Label>Area: {area}</Label> 
                    </Item>  
                    <Item>
                        <Label>Activity: {activity}</Label> 
                    </Item>       
                </View>
                <View style={styles.row}>
                    <Item>
                        <Label>Goal: {goal} {unit}</Label>
                    </Item>  
                    <Item>
                        <Label>Goal Type: {goalType}</Label> 
                    </Item>
                </View>
                <View style={styles.row}>
                    <Item>
                        <Label>Using third party app for insert</Label>
                        <CheckBox checked={isEnabled} color={'#808080'} disabled={true}/>
                    </Item>
                </View>
                <View style={styles.row}>
                    <Item>
                        <Label>Defined repetition:</Label>
                        <CheckBox checked={repetitionEnabled} color={'#808080'} disabled={true}/>
                    </Item>
                </View>
                {repetitionContainer}
            </Form>
        </View>
        <View>
            <View style={styles.btnContainer}>
                <Button title='Create input'
                        color={Colors.primary}
                        disabled={!isEnabled&&goalType=='Numeric'? false:true}
                />

                <Button title='Input with Strava' color={Colors.primary}
                onPress={()=> setModalVisible(true)} 
                    disabled={isEnabled && inputWithApi? false:true}
                />
            </View>

            {!isEnabled && goalType=='Numeric' ? <View style={styles.inputContainer}>
                <Item floatingLabel>
                    <Label>How many <Text style={{color:Colors.primary}}>{unit}</Text> you did</Label>
                    <Input keyboardType='number-pad' onChangeText={(number)=>setActivityInput(prevState=>({...prevState, value:number}))} />
                    <Text>km</Text>
                </Item>

            </View> : null}

            {/* Pokud je Binary tak zobraz jen tlačítko pro odeslání */}
            {!isEnabled&& goalType=='Binary'? <TouchableOpacity style={{marginTop:20, alignSelf:'center', 
            borderWidth:6, borderRadius:40, borderColor:Colors.primary, backgroundColor:Colors.secondary}}
                    onPress={()=>setActivityInput(prevState=>({...prevState, value: true}))}
            >
                <Text style={{color:Colors.primary, fontSize:24, padding:20, fontWeight:'bold'}}>I did it!</Text>
            </TouchableOpacity> :null}
            {/* {activityReturn} */}
            {isEnabled ? <View style={styles.inputContainer}>
                        <Item>
                            <Label> Distance: <Text style={{color:Colors.primary}}>{activityInput.value}</Text> m</Label>
                        </Item>
                        <Item>
                            <Label> Date: <Text style={{color:Colors.primary}}>{activityInput.date}</Text></Label>
                        </Item>
                        <Button title='Insert data for this condition' color={Colors.primary}
                            disabled={disabledSendButton}
                            onPress={()=>sendInputs()}
                        />
                    </View>:null}

            {/* <View>
             <Item>
                 <Label> Distance: <Text style={{color:Colors.primary}}>{activity.distance}</Text> m</Label>
             </Item>
             <Item>
                 <Label> Date: <Text style={{color:Colors.primary}}>{activity.start_date_local}</Text></Label>
             </Item>
             <Button title='Insert data for this condition'
                 onPress={()=>sendInputs()}
             />
         </View> */}
            
            </View>

            {modal}
        </Root>
    )
}



export default InsertTab;

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10
    },
    mainText:{
        color:Colors.primary
    },
    infoContainer:{
        marginBottom:15,
        backgroundColor: '#F5F5F5',
        // backgroundColor: Colors.primary
    },
    actionBtn:{
        alignSelf:'center',
        
    },
    btnText:{
        padding:5,
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomWidth:2,
        borderBottomColor:'#F5F5F5'
    },
    inputContainer:{
        marginHorizontal:15,

    }
});