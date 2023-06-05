import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Pressable, ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';

const CheckoutSuccessPage = ({route, navigation, style}) => {
  console.log(route.params.value[0]["OrderNum"])
    return(
      <View style={style.resultsContainer}>
        <Text style={style.textStyle}>Order Number:</Text>
          
            <Text style={style.returnNumberStyle}> {route.params.value[0]["OrderNum"]}</Text>
            <Text></Text>
          
        <Pressable style={style.removeButtonStyle} onPress={() => navigation.navigate('Home')}>
          <Text style={style.buttonTextStyle}>Return Home</Text>
        </Pressable>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default CheckoutSuccessPage;