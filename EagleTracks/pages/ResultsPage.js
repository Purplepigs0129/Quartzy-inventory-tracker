import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';

const ResultsPage = ({route, navigation, style}) => {
  let {formValues} = route.params
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Results:</Text>
          {formValues.map((element, key) => (
            <Text key={key}>{formValues[key].resp}</Text>
          ))}
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Home')} title="Return Home" color="#a10022"/>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default ResultsPage;