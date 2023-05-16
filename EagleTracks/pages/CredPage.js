import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import login from '../loginCred.json'
const CredPage = ({navigation, style}) => {
    const [newAccess, setAccess] = useState('');
    const [newLab, setLab] = useState('');
    const checkAccess = () => {
      if(!(newAccess.trim())){
        alert('Item Access Token is empty');
      }else if(!(newLab.trim())){
        alert('Lab ID is empty');
      }else{
        login['accessToken'] = newAccess
        login['labID'] = newLab
        console.log(login['accessToken'])
        console.log(login['labID'])
        navigation.navigate('Success Page');
      }
    }
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Access Token:</Text>
        <TextInput
          style={style.input}
          placeholder=" Access Token"
          onChangeText={
            (value)=>setAccess(value)
          }
          
        />
        <Text style={style.textStyle}>Lab ID:</Text>
        <TextInput
          style={style.input}
          placeholder=" Lab ID"
          onChangeText={
            (value)=>setLab(value)
          }
          
        />
        <Button style={style.buttonStyle} onPress={() => checkAccess()} title="Submit" color="#a10022" />
        {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
        {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
      <StatusBar style="auto" />
      </View>
      )
  }

  export default CredPage;