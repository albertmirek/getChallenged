import React, {Component} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


export default class CustomClassComponent extends Component{

    constructor(props){
        // Prvotní vytvoření komponenty při zavolání
        console.log('constuctor');
        super(props);
        this.state={
            myval:'mytestStateVal',
            topic:'bachelor paper'
        };
    }

    //getDerivedStateFromProps(props,state)

    changeSomething = (ev) => {
        // vlastní funkce pro změnu state(stavu)
        this.setState({
            myval: 'i got changed'
        })
    }

    shouldComponentUpdate(props, state){
        // Zde lze vytvářet podmínky, za kterých se má komponenta upravit
        console.log('Should Component Update');
        if(this.state.myval === 'mytestStateVal'){
            return true;
        } else return false;
    }

    render(){
        // Vykreslení komponenty
        return(
            <View>
                <Text>{this.state.topic}</Text>
                <Text>{this.state.myval}</Text>
                <Button title="Click me!" 
                onPress={this.changeSomething}/>
            </View>
        )
    }

    componentDidMount(){
        console.log('Component did mount');
    }

    componentDidUpdate(){
        // Po úpravě komponenty
        // this.setState() - může způsobit nekonečnou smyčku
        console.log('Component did update');
    }

    componentWillUnmount(){
        // Komponenta bude opouštět obrazovku
        console.log('Component will unmount');
    }
};

const styles = StyleSheet.create({

});