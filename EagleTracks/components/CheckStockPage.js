import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'

const ReturnPage = ({navigation, style}) => {
    
    const [formValues, setFormValues] = useState([{ itemToCheck: "", numNeeded : ""}]);
    

    
    const checkFields = () => {
      for(i = 0; i < formValues.length; i++){
        console.log(formValues[i])
      }
    }
    

    let handleChangeItem = (text, index) => {

        const _formValues = [...formValues]
        _formValues[index].itemToCheck = text;
        console.log(text)
        setFormValues(_formValues)
      }

    let handleChangeAmount = (text, index) => {
        const _formValues = [...formValues]
        _formValues[index].numNeeded = text;
        console.log(text)
        setFormValues(_formValues)
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
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />
              </View>
              <Text>Amount Needed</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeAmount(text, index)} />
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