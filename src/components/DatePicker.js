import React, {useState} from 'react';
import { View, Text, Button , StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/Colors';

const DatePicker = props =>{

    // const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || props.date;
        setShow(Platform.OS === 'ios');
        props.setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };


    return(
        <View>
            <View>
                <Button color={Colors.primary} onPress={showDatepicker} title={props.title} style={{}} />
            </View>
                {show && (
                    <DateTimePicker style={styles.picker}
                    testID="dateTimePicker"
                    value={props.date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                    style={{backgroundColor:Colors.primary, color:Colors.secondary}}
                    textColor={Colors.primary}
                    />
                )}
    </View>
    )
}

const styles = StyleSheet.create({
    picker:{
        backgroundColor:Colors.subPrimary,
        color:Colors.secondary
    },
});

export default DatePicker;