import React from 'react';
import {Text, View, Button, StatusBar} from 'react-native';
import * as apiFunctions from '../apiFunctions'
import * as itemDBFunctions from '../itemDB'


async function checker(){
  var res = await itemDBFunctions.getQuartzyItemSerial("A00002")
  console.log(res)
}

const HomePage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
        <Text></Text>
        {/*<Button style={style.buttonStyle} onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#a10022"/>
        <Text></Text>*/}
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Get Order Number')} title="Process Return" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Check Quantity')} title="Check Item Quantity" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Add New Item')} title="Add New Item" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => apiFunctions.getAll()} title="getAllAPICall" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => itemDBFunctions.getAllItems()} title="getAllDbCall" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => checker()} title="check for A00002" color="#a10022"/>
        <StatusBar style="auto" />
      </View>
    )
  }


export default HomePage;