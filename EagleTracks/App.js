import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as API from './apiFunctions.js'
import itemList from './itemList.json'
import login from './loginCred.json'

//Initialization*****************************************************************

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D6E71',
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
    color: '#fff',
  },
  buttonStyle: {
    alignItems: 'center',
    margin: 10,
    
  },
  placeholder: {
    color: '#bababa',
  }
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

//read text files
function checkFiles(serial){
  //const itemData = require("./itemList.json")
  //console.log("in function")//test code
  if(itemList.hasOwnProperty(serial)){
    return itemList[serial]
  }else{
    return ''
  }
  //return itemList[serial]
  /*if(serial == "A00002"){
      return "945eadcc-319a-4c21-89f2-1901defd742e"
  }*/
  
  
}
//end read text files

const IncrPage = ({navigation}) => {
  const [numToIncr, setNumToIncr] = useState('');
  const [itemToIncr, setItemToIncr] = useState('');
  const checkIncrease = () => {
    if(!(numToIncr.trim())){
      alert('Number is empty');
    }else if(!(parseInt(numToIncr))){
      alert('Returning non-number quantities is not supported at this time');
    }else if(!(itemToIncr.trim())){
      alert('Item is empty');
    }else{
      let itemID = checkFiles(itemToIncr)
      if(!itemID.trim()){
        alert("ItemID not present, please add the item")
      }else{
        API.incr(itemID, parseInt(numToIncr), true, navigation);
        navigation.navigate('Working Page');
      }
    }
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>ID of item to return:</Text>
      <TextInput
        style={styles.input}
        placeholder=" Item's ID being returned"
        onChangeText={
          (value)=>setItemToIncr(value)
        }
        
      />
      <Text style={styles.textStyle}>Number of items to be returned:</Text>
      <TextInput
        style={styles.input}
        placeholder=" # of item to be returned"
        onChangeText={
          (value)=>setNumToIncr(value)
        }
        keyboardType="numeric"
      />
      <Button style={styles.buttonStyle} onPress={() => checkIncrease()} title="Submit" color="#a10022" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true, navigation)} title="Increase by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
  )
}

//End Increase Page*****************************************

const WorkPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Working...</Text>
    <StatusBar style="auto" />
    </View>
  )
}


const FinishPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Success</Text>
      {<Button style={styles.buttonStyle} onPress={() => navigation.navigate('Home')} title="Return Home" color="#a10022"/>}
    <StatusBar style="auto" />
    </View>
  )
}

//end finish page**********************************************************

const DecrPage = ({navigation}) => {
  const [numToDecr, setNumToDecr] = useState('');
  const [itemToDecr, setItemToDecr] = useState('');
  const checkDecrease = () => {
    if(!(numToDecr.trim())){
      alert('Number is empty');
    }else if(!(parseInt(numToDecr))){
      alert('Taking non-number quantities is not supported at this time');
    }else{
      let itemID = checkFiles(itemToDecr)
      if(!itemID.trim()){
        alert("ItemID not present, please add the item")
      }else{
        API.incr(itemID, parseInt(numToDecr), false, navigation);
        navigation.navigate('Working Page');
      }
    }
  }
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>ID of item being taken:</Text>
      <TextInput
        style={styles.input}
        placeholder=" Item's ID being taken"
        onChangeText={
          (value)=>setItemToDecr(value)
        }
        
      />
      <Text style={styles.textStyle}>Number of items to be taken:</Text>
      <TextInput
        style={styles.input}
        placeholder=" # of the item to be taken"
        onChangeText={
          (value)=>setNumToDecr(value)
        }
        keyboardType="numeric"
      />
      <Button style={styles.buttonStyle} onPress={() => checkDecrease()} title="Submit" color="#a10022" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}

const AddPage = ({navigation}) => {
  const [newID, setNewID] = useState('');
  const [newSerial, setNewSerial] = useState('');
  const checkItem = () => {
    if(!(newID.trim())){
      alert('Item ID is empty');
    }else if(!(newSerial.trim())){
      alert('Serial number is empty');
    }else{
      itemList[newSerial] = newID;
      console.log(itemList[newSerial]);
      navigation.navigate('Success Page');
    }
  }
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Serial of new item:</Text>
      <TextInput
        style={styles.input}
        placeholder=" New Serial"
        onChangeText={
          (value)=>setNewSerial(value)
        }
        
      />
      <Text style={styles.textStyle}>ID of new item:</Text>
      <TextInput
        style={styles.input}
        placeholder=" ID of new item"
        onChangeText={
          (value)=>setNewID(value)
        }
        
      />
      <Button style={styles.buttonStyle} onPress={() => checkItem()} title="Submit" color="#a10022" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}

const CredPage = ({navigation}) => {
  const [newAccess, setAccess] = useState('');
  const [newLab, setLab] = useState('');
  const checkAccess = () => {
    if(!(newAccess.trim())){
      alert('Item Access Token is empty');
    }else if(!(newLab.trim())){
      alert('Lab ID is empty');
    }else{
      login['accessToken'] = newAccess
      login['labID'] = newLab
      console.log(login['accessToken'])
      console.log(login['labID'])
      navigation.navigate('Success Page');
    }
  }
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>Access Token:</Text>
      <TextInput
        style={styles.input}
        placeholder=" Access Token"
        onChangeText={
          (value)=>setAccess(value)
        }
        
      />
      <Text style={styles.textStyle}>Lab ID:</Text>
      <TextInput
        style={styles.input}
        placeholder=" Lab ID"
        onChangeText={
          (value)=>setLab(value)
        }
        
      />
      <Button style={styles.buttonStyle} onPress={() => checkAccess()} title="Submit" color="#a10022" />
      {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}


const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
      <Text></Text>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#a10022"/>
      <Text></Text>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Take Items')} title="Take Items" color="#a10022"/>
      <Text></Text>
      <Button style={styles.buttonStyle} onPress={() => navigation.navigate('Add New Item')} title="Add New Item" color="#a10022"/>
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
          name = "Change Credentials"
          component = {CredPage}
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
          name = "Add New Item"
          component = {AddPage}
        />
        <Stack.Screen
          name = "Working Page"
          component = {WorkPage}
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