import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Content, Container, Footer, FooterTab, Icon, Text, Button } from 'native-base';


const Navigation = props => {
    return(
        <Container style={styles.screen}>
            
            <Content />
            <Footer>
                <FooterTab>
                    <Button vertical>
                        <Icon />
                        <Text>Challenges</Text>
                    </Button>
                    <Button vertical>
                        <Icon />
                        <Text>+</Text>
                    </Button>
                    <Button vertical>
                        <Icon />
                        <Text style={styles.text}>More</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    screen:{
    
    }

})

export default Navigation;