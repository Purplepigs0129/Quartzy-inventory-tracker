import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as API from './apiFunctions.js'

//Initialization*****************************************************************

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    margin: 7,
    borderWidth: 2,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  textStyle: {
    margin: 7,
    alignItems: 'flex-start',
  },
  buttonStyle: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#A10022',
  },
});

const Stack = createNativeStackNavigator();

//End Initialization**********************************************************************************

//Page Functions***********************************************************************************
/*
function handleInsert(navigation, itemID, numToIncr, incr){
  API.incr(itemID, numToIncr, incr);
  navigation.navigate('Complete Increase');
}
*/
//End Page Functions*********************************************************************************


//Pages***************************************************************************************************

//IncrPage*****************************************************************

const IncrPage = ({navigation}) => {
  const [numToIncr, setNumToIncr] = useState('');
  const checkIncrease = () => {
    if(!(numToIncr.trim())){
      alert('Number is empty');
    }else if(!(parseInt(numToIncr))){
      alert('Returning non-number quantities is not supported at this time');
    }else{
      API.incr("945eadcc-319a-4c21-89f2-1901defd742e", parseInt(numToIncr), true, navigation);
    }
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Number of items to be returned:</Text>
      <TextInput
        style={styles.input}
        placeholder="Num to be returned"
        onChangeText={
          (value)=>setNumToIncr(value)
        }
        keyboardType="numeric"
      />
      <Button style={styles.buttonStyle} onPress={() => checkIncrease()} title="Submit" color="#ed5928" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true, navigation)} title="Increase by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
  )
}

//End Increase Page*****************************************

const FinishPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Success</Text>
      {<Button style={styles.buttonStyle} onPress={() => navigation.navigate('Home')} title="Return Home" color="#ed5928"/>}
    <StatusBar style="auto" />
    </View>
  )
}

//end finish page**********************************************************

const DecrPage = ({navigation}) => {
  const [numToDecr, setNumToDecr] = useState('');
  const checkDecrease = () => {
    if(!(numToDecr.trim())){
      alert('Number is empty');
    }else if(!(parseInt(numToDecr))){
      alert('Taking non-number quantities is not supported at this time');
    }else{
      API.incr("945eadcc-319a-4c21-89f2-1901defd742e", parseInt(numToDecr), false, navigation);
    }
  }
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Number of items to be taken:</Text>
      <TextInput
        style={styles.input}
        placeholder="Number to be taken"
        onChangeText={
          (value)=>setNumToDecr(value)
        }
        keyboardType="numeric"
      />
      <Button style={styles.buttonStyle} onPress={() => checkDecrease()} title="Submit" color="#ed5928" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}

const GetPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button style={styles.buttonStyle} onPress={() => API.getQuantity("945eadcc-319a-4c21-89f2-1901defd742e")} title="Get Quantity" color="#ed5928" />
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584" />*/}
    <StatusBar style="auto" />
    </View>
  )
}


const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#ed5928"/>
      <Text></Text>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Take Items')} title="Take Items" color="#ed5928"/>
      <Text></Text>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Get Item Data')} title="Get Item Data" color="#ed5928"/>
      <StatusBar style="auto" />
    </View>
  
  )
}
//End Pages****************************************************************************


//@App***************************************************************************************

const App = () => {
  return(

    //Screens***************************************************************************
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component = {HomeScreen}
        />
        <Stack.Screen
          name = "Return Items"
          component = {IncrPage}
        />
        <Stack.Screen
          name = "Take Items"
          component = {DecrPage}
        />
        <Stack.Screen
          name = "Get Item Data"
          component = {GetPage}
        />
        <Stack.Screen
          name = "Success Page"
          component = {FinishPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //End Screens****************************************************************************************

  )
}

export default App;

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => API.getAll()} title="Get All" color="#841584" />
      <Button onPress={() => API.getQuantity("945eadcc-319a-4c21-89f2-1901defd742e")} title="Get Quantity" color="#841584" />
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true)} title="Increase by 5" color="#841584" />
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false)} title="Decrease by 5" color="#841584" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/