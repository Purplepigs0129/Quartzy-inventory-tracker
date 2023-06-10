import React, {useState} from 'react';
import { StyleSheet,TextInput, View, Text } from 'react-native';

const DataEntry = ((props) =>{
    function getStyle(input){
        switch (input){
            case "success": return styles.success;
            case "warning": return styles.warning;
            default: return styles.normal;
        }

    }
    return (
        <View style={getStyle(props.cardStyle)}>
            {props.data.map((element)=>(
        
                    <Text style = {styles.data}>{element}</Text>
)           )}
        </View>
    )

   
})

export default DataEntry

const styles = StyleSheet.create({
    normal:{
        backgroundColor: '#fffaed',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingLeft:5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    warning:{
        backgroundColor: '#ffc485',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingLeft:5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    success:{
        backgroundColor: '#87ff85',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        paddingLeft:5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    data:{
        fontSize: 16,
        paddingRight: 5,
        borderRightColor: 'black',
        borderRightWidth: 2,
        overflow: 'hidden'
    },
    lastData:{
        fontSize: 16,
        overflow: 'hidden'
    }
})