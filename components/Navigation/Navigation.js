
import { Tab } from 'native-base';
import React from 'react';
import { View, StyleSheet, Component } from 'react-native';
import {Container, Footer, Tabs, TabHeading, Text} from 'native-base';




const Navigation = () => {
    return(
        <Container styles={styles.screen}>
            <Footer hasTabs />
            <Tabs>
                <Tab heading="First Tab"><Text>Tab1</Text>
                    <Tab1 />
                </Tab>
                <Tab heading="Second Tab"><Text>Tab2</Text>
                    <Tab2 />
                </Tab>
                <Tab heading="Third Tab"><Text>Tab3</Text>
                    <Tab3 />
                </Tab>
            </Tabs>
        </Container>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignContent: 'center'
    }

})

export default Navigation;