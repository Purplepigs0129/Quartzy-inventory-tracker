import React from 'react';
import {Text, View, Button, StatusBar, Alert} from 'react-native';
import {sendEmail} from '../helperFunctions.js';

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
        <Button style={style.buttonStyle} onPress={() => sendEmail(subject='Test', recipients=['awallace8@ewu.edu','a.j.wallace@hotmail.com'], body='This is a test file.')} title="Send Email" color="#a10022"/>
        <StatusBar style="auto" />
      </View>
    )
  }

//sendEmail(subject='Test', recipient='awallace8@ewu.edu', body='This is a test file.')
export default HomePage;