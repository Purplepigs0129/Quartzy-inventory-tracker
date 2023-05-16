import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import labList from '../itemList.json'
import nameToSerialJSON from '../nameToSerial.json'
import login from '../loginCred.json'
import * as dbFunctions from "../dbFunctions.js"

const MakeReturnPage = ({route, navigation, style}) => {
    console.log("In Make Return Page")
    const routeString = JSON.stringify(route.params.value)
    const routeParams = JSON.parse(routeString)//avoids infinite rerenders, might not be necessary
    
    const itemList = labList[login['labID']]
    const nameList = nameToSerialJSON[login['labID']]

    const serialToName = []
    
    for(var i in nameList){
      serialToName.push([i, nameList[i]])
    }
    console.log(serialToName)
    
    const getItemName = (itemSerial) => {
        for(var i in serialToName){
            if(serialToName[i][1] == String(itemSerial)){
                return String(serialToName[i][0])
            }
        }
    }

    const [formValues, setFormValues] = useState([{ itemSerial: routeParams[0].ItemSerial, amountToReturn: String(routeParams[0].AmountTaken), reasonLost: 'No Loss', itemName: getItemName(routeParams[0].ItemSerial)}]);

    console.log(routeParams.length)
    
    console.log('assigned')
    console.log(formValues)


  
    const checkReturn = () => {
      testRun = true
      console.log("CHECK 2")
      console.log(formValues[0].amountToReturn)
      for(var i = 0; i < formValues.length; i++){
        if(formValues[i].amountToReturn == ''){
          testRun = false
          alert(`Amount to return of ${i + 1} is empty`)
        }else if(!(parseInt(String(formValues[i].amountToReturn)))){
          console.log(formValues[i].amountToReturn)
          testRun = false
          alert(`Amount to return of ${i + 1} is not a number`)
        }else if(formValues[i].reasonLost = ''){
          testRun = false
          alert(`Reason for material lost for item ${i + 1} is empty`)
        }
      }
      if(testRun){
        navigation.navigate('Working Page')
        apiCaller()
      }
    }

    async function checkoutsCaller(){
      await Promise(dbFunctions.updateCheckouts(routeParams[0].OrderNum, navigation)).then(() => {
      }).catch((error) => console.log("error ocurred in database"))
    }

    async function returnsCaller(){
      requests = []
      for (let i = 0; i < formValues.length; i++){
        //orderNum, itemSerial, amountReturned, reasonLess
        requests.push(dbFunctions.insertReturn(String(routeParams[0].OrderNum), String(formValues[i].itemSerial), String(formValues[i].amountToReturn), String(formValues[i].reasonLost)))
      }
      await Promise.all(requests).then(() => {
        checkoutsCaller()
      }).catch((error) => {
        console.log("error in checkout")
        navigation.goBack();
      })
    }

    async function apiCaller(){
      requests = [itemList[formValues[0].itemSerial]]
      console.log()
      for (let i = 0; i < formValues.length; i++){
        requests.push(API.incr(itemList[formValues[i].itemSerial], parseInt(formValues[i].amountToReturn), true, navigation))
      }
      await Promise.all(requests).then(() => {
        returnsCaller()
      }).catch((error) => {
        console.log("error in checkout")
        navigation.goBack();
      })
    }


    let handleChangeAmount = (text, index) => {
        const _formValues = [...formValues]
        _formValues[index].amountToReturn = text;
        console.log(text)
        setFormValues(_formValues)
    }

    let handleChangeReason = (text, index) => {
      const _formValues = [...formValues]
      _formValues[index].reasonLost = text;
      console.log(text)
      setFormValues(_formValues)
  }

  console.log("serial to name")
  console.log(serialToName)

  useEffect(() => {
    for(var i = 1; i < routeParams.length; i++){
      itemNameFound = getItemName(routeParams[i].ItemSerial)
      setFormValues([...formValues, { itemSerial: routeParams[i].ItemSerial, amountToReturn: String(routeParams[i].AmountTaken), reasonLost: 'No Loss', itemName: itemNameFound}])
      console.log("Loop: ")
      console.log(i)
  }
  }, [])
    
  console.log('Return')
    return(
      <SafeAreaView style={style.container}>
        <ScrollView style={style.scrollView}>
        
          {formValues.map((element, index) => (
            <View key={index} style={style.itemInList}>
                <Text></Text>
              {/*<Text>Item Name</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeName(text, index)} />
              </View>*/}
              <Text>Item Name:</Text>
              <Text>
                { formValues[index].itemName }
              </Text>
              <Text>Item ID:</Text>
              <View>
                <Text>{ formValues[index].itemSerial }</Text>
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              </View>
              <Text>Amount To Return</Text>
              <View>
              <TextInput style={style.input} value={String(formValues[index].amountToReturn)} onChangeText={text => handleChangeAmount(text, index)} />
              </View>
              <Text>Reason Lost</Text>
              <View>
              <TextInput style={style.input} value={String(formValues[index].reasonLost)} onChangeText={text => handleChangeReason(text, index)} />
            </View>
            </View>
          ))}
      <Button style={style.buttonStyle} onPress={() => checkReturn()} title="submit" color="#a10022"></Button>
          
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

  export default MakeReturnPage;

