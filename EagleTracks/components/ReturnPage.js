import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'

const ReturnPage = ({navigation, style}) => {
    const [numToIncr, setNumToIncr] = useState('');
    const [itemToIncr, setItemToIncr] = useState('');
  
    const checkIncrease = () => {
      if(!(numToIncr.trim())){
        alert('Number is empty');
      }else if(!(parseInt(numToIncr))){
        alert('Returning non-number quantities is not supported at this time');
      }else if(!(itemToIncr.trim())){
        alert('Item is empty');
      }else if(!(login['accessToken'])){
        alert('Missing access token.  Please enter your access token.')
        navigation.navigate("Change Credentials")
      }
      else{
        let itemID = checkFiles(itemToIncr)
        if(!itemID.trim()){
          alert("ItemID not present, please add the item")
        }else{
          navigation.navigate('Working Page');
          apiCaller(itemID)
        }
      }
    }

    async function apiCaller(itemID){
      requests = []
      requests.push(API.incr(itemID, parseInt(numToIncr), true, navigation))
      await Promise.all(requests).then(() => {
        navigation.navigate('Success Page');
      }).catch((error) => {
        console.log("error has ocurred")
        navigation.goBack();
      })
    }
    
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>ID of item to return:</Text>
        <TextInput
          style={style.input}
          placeholder=" Item's ID being returned"
          onChangeText={
            (value)=>setItemToIncr(value)
          }
          
        />
        <Text style={style.textStyle}>Number of items to be returned:</Text>
        <TextInput
          style={style.input}
          placeholder=" # of item to be returned"
          onChangeText={
            (value)=>setNumToIncr(value)
          }
          keyboardType="numeric"
        />
        <Button style={style.buttonStyle} onPress={() => checkIncrease()} title="Submit" color="#a10022" />
        {/*<Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true, navigation)} title="Increase by 5" color="#841584" />*/}
        {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
      <StatusBar style="auto" />
      </View>
    )
  }

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
  
  export default ReturnPage;