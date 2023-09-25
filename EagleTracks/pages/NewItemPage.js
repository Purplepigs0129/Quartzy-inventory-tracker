import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,  Button, TextInput} from 'react-native';
import * as API from '../functions/apiFunctions.js'

const NewItemPage = ({navigation, style}) => {
    const updateList = (navigation) => {
      API.updateAll(navigation)
      navigation.navigate('Working Page')
    }
    return(
      <View style={style.container}>
        
        <Button style={style.buttonStyle} onPress={() => updateList(navigation)} title="Update List" color="#a10022" />
      <StatusBar style="auto" />
      </View>
      )
  }

  export default NewItemPage;