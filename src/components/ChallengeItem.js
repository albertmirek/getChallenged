import React from 'react';
import { View, StyleSheet, Text, Icon, TouchableOpacity } from 'react-native';
import {Body, Card, CardItem} from 'native-base';

const ChallengeItem = props => {



    return(
        <TouchableOpacity>
            <Card>
                <CardItem header>
                    <Text>{props.name}</Text>
                    <Text>{props.stage}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text></Text>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <Text>from: {props.startDate}</Text>
                    <Text>to: {props.endDate}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    
});