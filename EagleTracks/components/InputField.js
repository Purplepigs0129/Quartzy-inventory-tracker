import React, {useState} from 'react';
import { TextInput, View, Text } from 'react-native';

const InputField = (props) => {
    const [value, setValue] = useState(); //This is an integer
    this.label = props.label;
    this.checkFunctions = props.checkFunctions;
    this.children=props.children //Assumed to be the barcode scanner or other component

     function verifyData(){ 
         //Note that checkFunctions is an array of functions
       if (checkFunctions){
         checkFunctions.forEach( fn => fn(label, value) );
       }
     }

    return (
        <View>
        <Text style={props.style.textStyle}>{label}</Text>
        <TextInput 
            style = {props.style.input}
            placeholder = {props.placeholder}
            keyboardType={props.keyboardType ? props.keyboardType : "default"}
            onChangeText={
                    (entry)=>{
                        setValue(entry)
                        verifyData();
                    }
             }
         >
         </TextInput>
            {children} 
        </View>
    )

}

export default InputField