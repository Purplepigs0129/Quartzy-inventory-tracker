import React from 'react';
import {Text, View, Button, StatusBar} from 'react-native';


const HomePage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Check Quantity')} title="Check Item Quantity" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Add New Item')} title="Add New Item" color="#a10022"/>
        <StatusBar style="auto" />
      </View>
    )
  }


export default HomePage;