import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,  Button, TextInput} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'
const NewItemPage = ({navigation, style}) => {
    const [newID, setNewID] = useState('');
    const [newSerial, setNewSerial] = useState('');
    const checkItem = () => {
      if(!(newID.trim())){
        alert('Item ID is empty');
      }else if(!(newSerial.trim())){
        alert('Serial number is empty');
      }else{
        itemList[newSerial] = newID;
        console.log(itemList[newSerial]);
        navigation.navigate('Success Page');
      }
    }
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Serial of new item:</Text>
        <TextInput
          style={style.input}
          placeholder=" New Serial"
          onChangeText={
            (value)=>setNewSerial(value)
          }
          
        />
        <Text style={style.textStyle}>ID of new item:</Text>
        <TextInput
          style={style.input}
          placeholder=" ID of new item"
          onChangeText={
            (value)=>setNewID(value)
          }
          
        />
        <Button style={style.buttonStyle} onPress={() => checkItem()} title="Submit" color="#a10022" />
        {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
        {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
      <StatusBar style="auto" />
      </View>
      )
  }

  export default NewItemPage;