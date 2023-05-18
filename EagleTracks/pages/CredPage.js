import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import * as SecureStore from '../SecureStore'

const CredPage = ({navigation, style}) => {
    const [newAccess, setAccess] = useState('');
    const [newLab, setLab] = useState('');
    const checkAccess = () => {
      if(!(newAccess.trim())){
        alert('Item Access Token is empty');
      }else if(!(newLab.trim())){
        alert('Lab ID is empty');
      }else{
        navigation.navigate('Working Page');
        credChanger();
      }
    }

    async function credChanger(){

      requests = []
      requests.push(SecureStore.save('AccessToken', newAccess));
      requests.push(SecureStore.save('LabID', newLab))

      await Promise.all(requests).then(() => {
        navigation.navigate('Success Page')
      }).catch((error) => {
        console.log("error in saving credentials")
        console.log(error)
        alert("Error when saving credentials")
        navigation.goBack();
      })

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