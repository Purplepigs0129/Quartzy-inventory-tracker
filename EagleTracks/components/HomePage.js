import React from 'react';
import {Text, View, Button, StatusBar, Alert} from 'react-native';
import {sendEmail} from '../helperFunctions.js';

import * as FileSystem from 'expo-file-system'; //must use npx expo install expo-file-system
//import csv from './temp.csv';

//set up for csv
//createCSV("col1,col2,col3\n1,2,3\n4,5,6");
//const fileDir = FileSystem.documentDirectory + 'files/';
//const csvFileURI = fileDir + 'temp.csv';
//const csvInfo = await FileSystem.getInfoAsync(csvFileURI);
//const csvInfo = 
const saveFile = async (data) => {

  let directoryUri = FileSystem.documentDirectory;
  
  let fileUri = directoryUri + "temp.csv";
  
  await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
  
  return fileUri;
};

const csvURI = saveFile("col1,col2,col3\n1,2,3\n4,5,6\n7,8,9");

const HomePage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Add New Item')} title="Add New Item" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => sendEmail(subject='Test', recipients=['awallace8@ewu.edu','a.j.wallace@hotmail.com'], body='This is a test file.', attachments=[])} title="Send Email" color="#a10022"/>
        <StatusBar style="auto" />
      </View>
    )
  }

//sendEmail(subject='Test', recipient='awallace8@ewu.edu', body='This is a test file.')
export default HomePage;