import React, { useEffect, useRef, useContext, createContext } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.development';


const CustomComponent = () => {

    const [count, setCount] = useState(0);
    const [counter, setCounter] = useState(0);

    const [mood, setMood] = useState('happy');

    const moods = {happy:':)', sad:':('};
    const MoodContext = createContext(moods);

    useEffect(() => {
        Alert.alert('hello side effect')
    }, [counter]
    );

    return(
    // <View>
    //     <Text>This is the count: {counter}</Text>
    //     <Button title="Click me!" onPress={() => setCounter(counter+1)} />
    // </View>
    <MoodContext.Provider value={moods.happy}>

            <MoodEmoji />

            <Button title="Click Me" onPress={()=> setMood(mood)} /> 
    </MoodContext.Provider>
    );
    
    function MoodEmoji(){
        const mood = useContext(MoodContext);

        return(
            <Text>
                {mood}
            </Text>
        )
    }

};






const styles = StyleSheet.create({
    screen:{
        flex:1
    }
});

export default CustomComponent;