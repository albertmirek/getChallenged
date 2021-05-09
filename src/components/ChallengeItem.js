import React, { useContext } from 'react';
import { View, StyleSheet, Text, Icon, TouchableOpacity, Alert } from 'react-native';
import {Body, Card, CardItem} from 'native-base';

import {DatabaseContext} from '../navigation/DatabaseProvider';
import { AuthContext } from '../navigation/AuthProvider';
import Colors from '../constants/Colors';
import { windowWidth } from '../utils/Dimensions';

const ChallengeItem = props => {


    var beginDate = props.beginDate.toDate().toDateString();
    var endDate = props.endDate.toDate().toDateString();

    const {setArrayUserChallenges, updateArrayUserChallenges} = useContext(DatabaseContext);
    const {user} = useContext(AuthContext);

    console.log(props.id);

    return(
        <TouchableOpacity style={styles.container}
            onPress={()=> 
            props.possesion? Alert.alert(
                "Assign to this Challenges?",
                "If you would like to participate in this challenge, then click on Assign",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log('Canceled'),
                        style:"cancel"
                    },
                    {
                        text:"Assign",
                        onPress: () => {
                            updateArrayUserChallenges(user.uid, props.id);
                        }
                    }
                ]
            )
            
            :            
            props.navigation.navigate('Challenge',{
            id: props.id,
            name:props.name,
            beginDate: props.beginDate,
            endDate: props.endDate,
            description: props.description,
            stage: props.stage,
            conditions: props.conditions
            })}>

            <Card>
                <CardItem header>
                    <Text style={styles.header}>{props.name}</Text>
                    {/* <Text>{props.stage}</Text> */}
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={styles.description}>{props.description}</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <View style={{flexDirection:'row', justifyContent:'space-around', flex:1}}>
                        <View style={styles.date}>
                            <Text>from: </Text>
                            <Text style={styles.dateText}>{beginDate}</Text>
                        </View>
                        <View style={styles.date}> 
                            <Text>to: </Text>
                            <Text style={styles.dateText}>{endDate}</Text>
                        </View>
                    </View>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )

}

export default ChallengeItem;

const styles = StyleSheet.create({
    
    container:{
        borderRadius:5,
        width:windowWidth*0.9,
        shadowOpacity:0.2,
        shadowRadius:5
    },
    header:{
        fontSize:20,
        color:Colors.primary,
        fontWeight:'bold',
    },
    date:{
        justifyContent:'center',
        alignItems:'center'
    },
    dateText:{
        color:Colors.primary,
        fontWeight:'600'
    }
});