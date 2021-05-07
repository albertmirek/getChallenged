import React from 'react';
import { View, StyleSheet, Text, Icon, TouchableOpacity } from 'react-native';
import {Body, Card, CardItem} from 'native-base';

const ChallengeItem = props => {


    var beginDate = props.beginDate.toDate().toDateString();
    console.log(props.description);
    // beginDate.format("dd/mm/yyyy");
    var endDate = props.endDate.toDate().toDateString();
    // endDate.format('dd/mm/yyyy');

    return(
        <TouchableOpacity onPress={()=> props.navigation.navigate('Challenge',{
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
                    <Text>{props.name}</Text>
                    <Text>{props.stage}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{props.description}</Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>from: {beginDate}</Text>
                    <Text>to: {endDate}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )

}

export default ChallengeItem;

const styles = StyleSheet.create({
    
});