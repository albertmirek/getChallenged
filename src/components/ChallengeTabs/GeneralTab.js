import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import {Content, Header, Title, Container, CardItem, Card, Button} from 'native-base';

import Colors from '../../constants/Colors';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import InputModal from '../InputModal';


const GeneralTab = props => {


    const [feed, setFeed] = useState([]);
    const[modalVisible, setModalVisible] = useState(false);

    let modal;
    if(modalVisible==true){
     modal =<InputModal 
                isVisible={modalVisible}
                conditions={props.conditions}
                setIsVisible={(val) => setModalVisible(val)}
            />
            // console.log(modalVisible)
    //  <Modal visible={modalVisible} onRequestClose={()=>{ Alert.alert('Modal closed'); setModalVisible(false)}}
    //             animationType='slide'>
    //             <View>
    //                 <Text>Hala</Text>
    //             </View>
    //         </Modal>

    }else  modal=null;
    
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


            <Button onPress={()=> setModalVisible(true)}>
                <Text>Make and challenge Input</Text>
            </Button>
            {modal}
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