import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,  Button, TextInput} from 'react-native';
import * as API from '../apiFunctions.js'

const TransactionFunctionPage = ({navigation, style}) => {
    const updateList = (navigation) => {
      API.updateAll(navigation)
      navigation.navigate('Working Page')
    }
    return(
      <View style={style.container}>
        
        <Button style={style.buttonStyle} onPress={() => updateList(navigation)} title="Update List" color="#a10022" />
        <Text/>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Order History')} title="Order History" color="#a10022" />
        {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
        {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
      <StatusBar style="auto" />
      </View>
      )
  }

  export default TransactionFunctionPage;