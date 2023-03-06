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
    alignItems: 'center',
    justifyContent: 'center',
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
      alert('Number is not a number');
    }else{
      API.incr("945eadcc-319a-4c21-89f2-1901defd742e", parseInt(numToIncr), true, navigation);
    }
  }
  
  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Num to increase by"
        onChangeText={
          (value)=>setNumToIncr(value)
        }
      />
      <Button onPress={() => checkIncrease()} title="Submit" color="#841584" />
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
      <Text>Success</Text>
      {<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>}
    <StatusBar style="auto" />
    </View>
  )
}

const DecrPage = ({navigation}) => {
  const [numToDecr, setNumToDecr] = useState('');
  const checkDecrease = () => {
    if(!(numToDecr.trim())){
      alert('Number is empty');
    }else if(!(parseInt(numToDecr))){
      alert('Number is not a number');
    }else{
      API.incr("945eadcc-319a-4c21-89f2-1901defd742e", parseInt(numToDecr), false, navigation);
    }
  }
  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Num to decrease by"
        onChangeText={
          (value)=>setNumToDecr(value)
        }
      />
      <Button onPress={() => checkDecrease()} title="Submit" color="#841584" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}

const GetPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => API.getQuantity("945eadcc-319a-4c21-89f2-1901defd742e")} title="Get Quantity" color="#841584" />
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584" />*/}
    <StatusBar style="auto" />
    </View>
  )
}


const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#841584"/>
      <Text></Text>
      <Button onPress={() => navigation.navigate('Take Items')} title="Take Items" color="#841584"/>
      <Text></Text>
      <Button onPress={() => navigation.navigate('Get Item Data')} title="Get Item Data" color="#841584"/>
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