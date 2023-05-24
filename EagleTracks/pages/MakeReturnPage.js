import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import * as dbFunctions from "../dbFunctions.js"
import * as itemDB from '../itemDB.js'

const MakeReturnPage = ({route, navigation, style}) => {
    console.log("In Make Return Page")
    const routeString = JSON.stringify(route.params.value)
    const routeParams = JSON.parse(routeString)//avoids infinite rerenders, might not be necessary

    console.log(routeParams)

    const [formValues, setFormValues] = useState(JSON.parse(routeString));

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
      //calls navigation
      await Promise(dbFunctions.updateCheckouts(routeParams[0].OrderNum, navigation)).then(() => {
      }).catch((error) => console.log("error ocurred in database"))
    }

    async function returnsCaller(){
      requests = []
      for (let i = 0; i < formValues.length; i++){
        //orderNum, itemSerial, amountReturned, reasonLess
        requests.push(dbFunctions.insertReturn(String(routeParams[0].OrderNum), String(formValues[i].ItemSerial), String(formValues[i].amountToReturn), String(formValues[i].reasonLost)))
      }
      await Promise.all(requests).then(() => {
        checkoutsCaller()
      }).catch((error) => {
        console.log("error in checkout")
        navigation.goBack();
      })
    }

    async function apiCaller(){
      let requests = []
      for (let i = 0; i < formValues.length; i++){
        requests.push(API.incr(formValues[i].ItemID, parseInt(formValues[i].amountToReturn), true, navigation))
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

  async function getItemName(itemSerial){
    var results = await itemDB.getQuartzyItemSerial(itemSerial)
    console.log("Results")
    console.log(results[0])
    console.log(results[0]['ItemName'])
    return results[0]
  }

  function handleNameUpdate(itemArray){
    console.log("In handle name update")
    console.log(itemArray)
    const _formValues = [...formValues]
    for(let i = 0; i < itemArray.length; i ++){
      _formValues[i].ItemName = itemArray[i]['ItemName'];
      _formValues[i].ItemID = itemArray[i]['ItemID']
      _formValues[i].amountToReturn = routeParams[i].AmountTaken
      _formValues[i].reasonLost = "No Loss"
      console.log(`Set item ${i}`)

    }
    setFormValues(_formValues)
  }

  async function buildNameArray(){
    itemArray = []
    for(let i = 0; i < routeParams.length; i ++){
      itemArray[i] = await getItemName(routeParams[i].ItemSerial)
    }
    console.log("Item Array")
    console.log(itemArray)
    //console.log(formValues)
    handleNameUpdate(itemArray)
  }

  useEffect(() => {
    console.log("USE EFFECT")
    console.log(formValues.length)
    console.log(formValues)
    buildNameArray()
    console.log("End Use Effect")
  }, [])

    
  console.log('Return')
    return(
      <SafeAreaView style={style.container}>
        <ScrollView style={style.scrollView}>
        
          {formValues.map((element, index) => (
            <View key={index} style={style.itemInList}>
                <Text></Text>
              <Text>Item Name:</Text>
              <Text>
                { formValues[index].ItemName }
              </Text>
              <Text>Item Serial:</Text>
              <View>
                <Text>{ formValues[index].ItemSerial }</Text>
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


  export default MakeReturnPage;

