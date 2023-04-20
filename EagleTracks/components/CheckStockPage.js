import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'

const ReturnPage = ({navigation, style}) => {
    const [numToIncr, setNumToIncr] = useState('');
    const [itemToIncr, setItemToIncr] = useState('');
    const [formValues, setFormValues] = useState([{ itemToCheck: "", numNeeded : ""}]);
    

    
    const checkFields = () => {
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
          API.incr(itemID, parseInt(numToIncr), navigation);
          navigation.navigate('Working Page');
        }
      }
    }
    

    let handleChange = (index, e) => {
        /*let name = e.target[name]
        let value = e.target.value
        //console.log(e.target)
        console.log(e.target.name)
        let list = [...formValues]
        list[index][name] = value
        setFormValues(list)*/

        let newFormValues = [...formValues];
        newFormValues[index][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { itemToCheck: "", numNeeded: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    return (
        <SafeAreaView style={style.container}>
        <ScrollView style={style.scrollView}>
          {formValues.map((element, index) => (
            <View key={index}>
                <Text></Text>
              <Text>Item ID</Text>
              <View>
              <TextInput style={style.input} name="itemToCheck" value={element.itemToCheck || ''} onChange={e => handleChange(index, e)} />
              </View>
              <Text>Amount Needed</Text>
              <View>
              <TextInput style={style.input} name="numNeeded" value={element.numNeeded || ''} onChange={e => handleChange(index, e)} />
              </View>
              {
                index ? 
                  <Button style={style.buttonStyle} onPress={() => removeFormFields(index)} title="remove" color="#a10022"></Button> 
                : null
              }
            </View>
          ))}
          <View>
              <Button style={style.buttonStyle} onPress={() => addFormFields()} title="add" color="#a10022"></Button>
              <Button style={style.buttonStyle} onPress={() => checkFields()} title="submit" color="#a10022"></Button>
          </View>
      </ScrollView>
      </SafeAreaView>
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