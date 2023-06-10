import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Pressable, ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';

const ResultsPage = ({route, navigation, style}) => {
  let {formValues} = route.params
    return(
      <View style={style.resultsContainer}>
        <Text style={style.textStyle}>Results:</Text>
          {formValues.map((element, key) => (
            <View>
              <Text style={style.textStyle} key={key}>
                {formValues[key].resp}
                <Text style={style.lineBreakText}></Text>
              </Text>
            </View>
          ))}
        <Text></Text>
        <Pressable style={style.removeButtonStyle} onPress={() => navigation.navigate('Home')}>
          <Text style={style.buttonTextStyle}>Return Home</Text>
        </Pressable>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default ResultsPage;