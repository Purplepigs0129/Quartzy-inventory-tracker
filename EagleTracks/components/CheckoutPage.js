import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, Text, SafeAreaView, Button, TextInput, Pressable, TouchableHighlight} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'
import { FontAwesome5 } from '@expo/vector-icons';


const CheckoutPage = ({navigation, style}) => {
    const [numToDecr, setNumToDecr] = useState('');
    const [itemToDecr, setItemToDecr] = useState('');
    const [studentName, setStudentName] = useState('');
    const [instName, setInstName] = useState('');
    const [className, setClassName] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const [toReturn, setToReturn] = useState(false);
    const [itemName, setItemName] = useState('');
  
    const checkDecrease = () => {
      if(!(numToDecr.trim())){
        alert('Number is empty');
      }else if(!(itemToDecr.trim())){
        alert('Item is empty');
      }else if(!(studentName.trim())){
        alert('Item is empty');
      }else if(!(instName.trim())){
        alert('Item is empty');
      }else if(!(itemName.trim())){
        alert('Item is empty');
      }else if(!(roomNum.trim())){
        alert('Item is empty');
      }else if(!(className.trim())){
        alert('Item is empty');
      }else if(!(parseInt(numToDecr))){
        alert('Taking non-number quantities is not supported at this time');
      }else if(!(login['accessToken'])){
        alert('Missing access token.  Please enter your access token.')
        navigation.navigate("Change Credentials")
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
      <SafeAreaView style={style.container}>
        <ScrollView style={style.scrollView}>
        <Text style={style.textStyle}>Class/Lab:</Text>
        <TextInput
          style={style.input}
          placeholder=" Class/Lab"
          onChangeText={
            (value)=>setClassName(value)
          }
        />
        <Text style={style.textStyle}>Room Number:</Text>
        <TextInput
          style={style.input}
          placeholder=" Room Number"
          onChangeText={
            (value)=>setRoomNum(value)
          }
        />
        <Text style={style.textStyle}>Instructor/PI:</Text>
        <TextInput
          style={style.input}
          placeholder=" Instructor/PI"
          onChangeText={
            (value)=>setInstName(value)
          }
        />
        <Text style={style.textStyle}>Group/Name:</Text>
        <TextInput
          style={style.input}
          placeholder=" Group/Name"
          onChangeText={
            (value)=>setStudentName(value)
          }
        />
  
        {/* Item Checkout Section */}
        <Text style={style.textStyle}>Item Name:</Text>
        <TextInput
          style={style.input}
          placeholder=" Item Name"
          onChangeText={
            (value)=>setItemName(value)
          }
        />
        <Text style={style.textStyle}>ID of item being taken:</Text>
        <TextInput
          style={style.input}
          placeholder=" Item's ID being taken"
          onChangeText={
            (value)=>setItemToDecr(value)
          }
        />
        <Pressable>
        <FontAwesome5 name="camera" size={24} color="black" onPress={() => navigation.navigate('Barcode Page')} />
        </Pressable>
        <Text style={style.textStyle}>Number of items to be taken:</Text>
        <TextInput
          style={style.input}
          placeholder=" # of the item to be taken"
          onChangeText={
            (value)=>setNumToDecr(value)
          }
          keyboardType="numeric"
        />
        <Text style={style.textStyle}>Will item be returned:</Text>
        <Checkbox style={style.checkbox} value={toReturn} onValueChange={setToReturn} color={toReturn ? '00ff00' : '#000000'}/>
        
        
        <Button style={style.buttonStyle} onPressitemListstyle={() => checkDecrease()} title="Submit" color="#a10022" />
        {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false, navigation)} title="Decrease by 5" color="#841584" />*/}
        {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>
      )
  }

  //Duplicate function w/ Return Page.
  function checkFiles(serial){
    //const itemData = require("./itemList.json")
    //console.log("in function")//test code
    if(itemList.hasOwnProperty(login['labID'])){
      let temp = itemList[login['labID']]
      if(temp.hasOwnProperty(serial)){
        return temp[serial]
      }else{
        return ''
      }
    }else{
      return ''
    }
    //return itemList[serial]
    /*if(serial == "A00002"){
        return "945eadcc-319a-4c21-89f2-1901defd742e"
    }*/
    
    
  }

  export default CheckoutPage;

