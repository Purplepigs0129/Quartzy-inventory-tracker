import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';

const CheckoutSuccessPage = ({route, navigation, style}) => {
  console.log(route.params.value[0]["OrderNum"])
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Order Number:</Text>
          
            <Text> {route.params.value[0]["OrderNum"]}</Text>
            <Text></Text>
          
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Home')} title="Return Home" color="#a10022"/>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default CheckoutSuccessPage;