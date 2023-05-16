import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput} from 'react-native';
import * as db from '../dbFunctions.js'

const ReturnPage = ({navigation, style}) => {
    const [orderNum, setOrderNum] = useState('');
  
    const checkReturn = () => {
      if(!(orderNum.trim())){
        alert('Order Number is empty');
      }else if(!(parseInt(orderNum))){
        alert('Order Number should be an integer');
      }else{
        dbCaller(orderNum)
      }
    }

    async function dbCaller(orderNum){
      await db.getReturns(orderNum, navigation).then(() => {
      }).catch((error) => {
        console.log(error)
        navigation.goBack();
      })
    }

    
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Order Number:</Text>
        <TextInput
          style={style.input}
          placeholder=" Order Number"
          onChangeText={
            (value)=>setOrderNum(value)
          }
          
        />
        
        <Button style={style.buttonStyle} onPress={() => checkReturn()} title="Submit" color="#a10022" />
        
      <StatusBar style="auto" />
      </View>
    )
  }
  
  export default ReturnPage;