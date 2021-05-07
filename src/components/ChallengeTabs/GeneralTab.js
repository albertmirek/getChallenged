import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import {Content, Header, Title, Container, CardItem, Card, Button} from 'native-base';

import Colors from '../../constants/Colors';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

import CustomActionSheet from '../CustomActionSheet';


const GeneralTab = props => {


    const [feed, setFeed] = useState([]);
    
    
    return(
        <View>
            
                <Title style={styles.title}>
                    {props.name}
                </Title>
            

            {/* FEED */}
            <Card>
                <CardItem header button onPress={()=> Alert.alert('Showing Full hisotry of feed')}>
                    <Text>Feed</Text>
                </CardItem>
                <CardItem cardBody>
                    
                </CardItem>
            </Card>


            {/* CHAT */}
            <View>
                <Button title='OpenChat' />
                <FlatList  
                // onEndReached={zavolání dalších zpra'v?}
                />

            </View>

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
        alignSelf:'flex-start'
    },
});