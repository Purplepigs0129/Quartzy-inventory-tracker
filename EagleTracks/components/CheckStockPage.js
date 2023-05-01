import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import itemList from '../itemList.json'
import login from '../loginCred.json'
import itemNamesList from '../nameToSerial.json'
import {Picker} from '@react-native-picker/picker'

const ReturnPage = ({navigation, style}) => {
    
    const [formValues, setFormValues] = useState([{ itemToCheck: "", numNeeded: "", resp: "", itemNameHolder: ""}]);
    const pickerData = itemNamesList[login["labID"]]
    const pickerList = []
    pickerList.push("Placeholder")
    for (var i in pickerData){
      pickerList.push(i)
    }
    console.log(pickerList)
    //console.log(pickerData)
    

    
    const checkFields = () => {
        console.log(pickerData)
        let testRun = true
        console.log(formValues)
        for (let i = 0; i < formValues.length; i++){
            //console.log(formValues[i].itemToCheck)
            if(!(formValues[i].itemToCheck.trim())){
                testRun = false
                alert(`Item ${i + 1} is not filled in`)
                break
            } else if(formValues[i].itemToCheck == 'Placeholder'){
              testRun = false
              alert(`Item ${i + 1} was left on placeholder`)
            } else if(!(formValues[i].numNeeded.trim())){
                testRun = false
                alert(`Amount needed for ${i + 1} is not filled in`)
                break
            } else if(!(parseInt(formValues[i].numNeeded))){
                testRun = false
                alert(`Amount needed for item ${i + 1} is not a number`)
                break
            } else if(pickerData.hasOwnProperty(formValues[i].itemToCheck)){
              temp = pickerData[formValues[i].itemToCheck]
              const _formValues = [...formValues]
              _formValues[i].itemNameHolder = _formValues[i].itemToCheck
              _formValues[i].itemToCheck = temp;
              console.log(_formValues[i].itemToCheck)
              //console.log(text)
              setFormValues(_formValues)
            } else {
              testRun = false
              alert(`item ${i} not found`)
            }
        }

        if(!(login['accessToken'])){
            testRun = false
            alert('Missing access token.  Please enter your access token.')
            navigation.navigate("Change Credentials")
        }

        if(testRun){
            API.checkBatch(formValues, navigation);
            navigation.navigate('Working Page')
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
            <View key={index} style={style.itemInList}>
                <Text></Text>
              <Text>Item ID</Text>
              <View>
                <Picker
                  selectedValue={formValues[index].itemToCheck}
                  onValueChange={(itemValue, itemIndex) => handleChangeItem(itemValue, index)}
                >
                  {pickerList.map((listKey) => {
                    return (<Picker.Item key={listKey} label={listKey} value={listKey} />)
                  })}
                  {/*<Picker.Item key={key} label="Beaker plastic 50ml" value="Beaker plastic 50ml"/>
                  <Picker.Item label="testing test item" value="testing test item"/>*/}
                </Picker>
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              </View>
              <Text>Amount Needed</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeAmount(text, index)} />
              </View>
              {
                index ? 
                  <View style={style.removeButtonHolder}>
                    <Pressable style={style.removeButtonStyle} onPress={() => removeFormFields(index)}>
                      <Text style={style.textStyle}>Remove</Text>
                    </Pressable>
                    <Text>{"\n"}</Text>
                  </View>
                : null
              }
            </View>
          ))}
          <View>
              <Text>{"\n"}</Text>
              <Button style={style.buttonStyle} onPress={() => addFormFields()} title="add" color="#a10022"></Button>
              <Text>{"\n"}</Text>
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