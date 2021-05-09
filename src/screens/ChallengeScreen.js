import React,{useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, Alert, Modal, FlatList} from 'react-native';
import {Icon, Header, Content, Body, Left, Right, Footer, Title, Tabs, Tab, Button, Segment, Container, DefaultTabBar} from 'native-base';

import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../navigation/AuthProvider';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import GeneralTab from '../components/ChallengeTabs/GeneralTab';
import InsertTab from '../components/ChallengeTabs/InsertTab';
import Loading from '../components/Loading';
// import { ChallengeContext } from '../navigation/ChallengeProvider';

const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
  return <DefaultTabBar {...props} />;
}

const ChallengeScreen = ({route, navigation}) => {

    const [loading,setLoading] = useState(true);
    const [conditions, setConditions] = useState([]);
    const [inputs, setInputs] = useState([]);
    // const [messages, setMessages] = useState([]);

    const {id,name, stage, beginDate, endDate, description} = route.params;
    const {user} = useContext(AuthContext);
    

    useEffect(()=>{
    
        //Query on Chat

        //Query on Conditions && Progress
        firestore().collection('challenges').doc(id).collection('conditions').get()
        .then((data) => {
            data._docs.forEach(condition => {
                if(conditions==[]){
                    setConditions(condition._data);
                }else setConditions(prevConditions=>[...prevConditions, condition._data]);
                valuesDownload(condition);
            });
        });

        // getConditions(id);
        
        if(loading){
            setLoading(false);
        }
        console.log('effect Done');
    },[]);


    function valuesDownload(condition){
        firestore().collection('challenges/'+id+'/conditions/'+condition.id+'/'+user.uid).get()
        .then(activities=>{
            // console.log(activities._docs);
            if(activities._docs!=[]){
                var input = {};
                input.id = condition.id;
                var value = 0;
                activities._docs.forEach(activity => {
                    value += activity._data.value;
                });
                input.value = value;
                input.activity = condition._data.activity;
                input.unit = condition._data.unit
                console.log(input);
                if(inputs==[]){
                    setInputs(input);
                }else{
                    setInputs(prevInputs=>[...prevInputs, input]);
                }
            }
        });
    }

    function valuesUpdate(condition, value){
        console.log(condition);
        var input = {};
        input.id=condition.id;
        input.activity = condition.activity;
        input.unit = condition.unit;
        if(inputs==[]){
            input.value = value;
            setInputs(input);
        }else{
            let newState= [...inputs];
            // console.log('loggin newstate');
            // console.log(value);
            newState.forEach(entry => {
                if(entry.id == condition.id){
                    entry.value = entry.value + value/1000;
                }
            });
            // newState[conditionId].value = newState[conditionId].value + value;
            setInputs(newState);            
        }
    }


    if(loading){
        return(<Loading />)
    }

   
    
    if(!loading){
        return(
            <Container>
                <Header style={{backgroundColor:Colors.secondary}}>
                    <Left>
                        <Button transparent onPress={()=> navigation.goBack()}>
                            <Icon type={Icons.arrowBack.type} name={Icons.arrowBack.name} style={styles.icon} />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icon type={Icons.options.type} name={Icons.options.name} style={styles.icon} />
                        </Button>
                    </Right>
                </Header>
                    <Tabs
                    tabBarActiveTextColor={Colors.secondary}
                    tabBarUnderlineStyle={{backgroundColor:Colors.primary}}
                    renderTabBar={renderTabBar}
                    >
                        <Tab heading="General"
                        activeTabStyle={{backgroundColor:Colors.primary}} 
                        tabStyle={{backgroundColor:Colors.secondary}} textStyle={{color:'white'}}
                        >
                            <GeneralTab 
                            id={id}
                            name = {name}
                            stager = {stage}
                            beginDate = {beginDate}
                            endDate = {endDate}
                            description = {description}
                            user = {user}
                            conditions = {conditions}
                            inputs = {inputs}
                            />
                        
                        </Tab>

                        <Tab heading="Insert"
                        activeTabStyle={{backgroundColor:Colors.primary}} 
                        tabStyle={{backgroundColor:Colors.secondary}} textStyle={{color:'white'}}
                        >
                            <InsertTab  
                                beginDate={beginDate}
                                endDate = {endDate}
                                user ={user}
                                conditions={conditions}
                                challengeId={id}
                                valuesUpdate={(conditionId, value)=>valuesUpdate(conditionId, value)}
                            />
                        </Tab>
                    </Tabs>
            </Container>
        )
    }
}

export default ChallengeScreen;

const styles = StyleSheet.create({
    screen:{
        height:windowHeight,
        width:windowWidth,
        backgroundColor:'white'
    },
    icon:{
        color:Colors.primary,
        paddingHorizontal:15,
    },
    
});