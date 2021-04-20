import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Content, Container, Footer, FooterTab, Icon, Text, Button } from 'native-base';

import Colors from '../constants/Colors'

const Navigation = ({nav}) => {

    

    return(
        <Container style={styles.screen}>
            
            <Content />
            <Footer style={styles.footer}>
                <FooterTab>
                    <Button vertical onPress={()=>nav.navigate('Challenges')}>
                        <Icon />
                        <Text style={styles.text}>Challenges</Text>
                    </Button>
                    <Button vertical onPress={() => nav.navigate('CreateChallenge')}>
                        <Icon type='AntDesign' name='pluscircle' style={styles.icon} />
                        <Text style={styles.subText}>Create</Text>
                    </Button>
                    <Button vertical>
                        <Icon type='SimpleLineIcons' name='options' style={styles.icon} />
                        <Text style={styles.subText}>Options</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    screen:{
        
    },
    footer:{
        backgroundColor: Colors.secondary,
    },
    text:{
        color:Colors.primary,
        fontSize:16,
        fontWeight: '700'
    },
    subText:{
        color:Colors.primary,
        fontSize:11,
        
    },
    icon:{
        color:Colors.primary,
        fontSize:20,
        paddingTop:10
    }

})

export default Navigation;