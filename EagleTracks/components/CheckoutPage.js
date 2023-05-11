import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import labList from '../itemList.json'
import login from '../loginCred.json'
import * as dbFunctions from "../dbFunctions.js"

const CheckoutPage = ({navigation, style}) => {
    const [formValues, setFormValues] = useState([{ itemToCheck: "", itemID: "", numNeeded: "", resp: "", itemName: ""}]);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [instName, setInstName] = useState('');
    const [className, setClassName] = useState('');
    const [roomNum, setRoomNum] = useState('');

    const itemList = labList[login['labID']]

    const serialToName = []
    for(var i in itemList){
      serialToName.push([itemList[i], i])
    }
    
  
    const checkDecrease = () => {
      let testRun = true
      console.log("button pressed")
      if(!(studentName.trim())){
        testRun = false
        alert('Group/Name is empty');
      }else if(!(instName.trim())){
        testRun = false
        alert('Instructor is empty');
      }else if(!(roomNum.trim())){
        testRun = false
        alert('Destination room number is empty');
      }else if(!(className.trim())){
        testRun = false
        alert('Class name is empty');
      }
      for (let i = 0; i < formValues.length; i++){
        if(!(formValues[i].itemToCheck.trim())){
            testRun = false
            alert(`Item ${i + 1} is not filled in`)
            break
        }else if(!(formValues[i].numNeeded.trim())){
            testRun = false
            alert(`Amount needed for ${i + 1} is not filled in`)
            break
        } else if(!(parseInt(formValues[i].numNeeded))){
            testRun = false
            alert(`Amount needed for item ${i + 1} is not a number`)
            break
        } else if(itemList.hasOwnProperty(formValues[i].itemToCheck)){
          const _formValues = [...formValues]
          for(let j = 0; j < serialToName.length; j++){
            if(serialToName[j][0] == _formValues[i].itemToCheck){
              _formValues[i].itemName = serialToName[j][1]
            }
          }
          _formValues[i].itemID = itemList[formValues[i].itemToCheck];
          setFormValues(_formValues)
          console.log(formValues[i].itemID)
        } else if(!itemList.hasOwnProperty(formValues[i].itemID)){
          testRun = false
          console.log("Item list did not contain item")
        }
      }
      console.log("comp")
      if(testRun){
        navigation.navigate('Working Page');
        apiCaller()
      }
    }

    async function dbCaller(){
      await Promise(dbFunctions.handleCheckout(studentName, instName, className, roomNum, studentEmail, formValues, navigation)).then(() => {
        
      }).catch((error) => console.log("error ocurred in database"))
    }

    async function apiCaller(){
      requests = []
      for (let i = 0; i < formValues.length; i++){
        requests.push(API.incr(formValues[i].itemID, parseInt(formValues[i].numNeeded), false, navigation))
      }
      await Promise.all(requests).then(() => {
        dbCaller()
      }).catch((error) => {
        console.log("error in checkout")
        navigation.goBack();
      })
    }

    /*let handleChangeName = (text, index) => {

      const _formValues = [...formValues]
      _formValues[index].itemName = text;
      console.log(text)
      setFormValues(_formValues)
    }*/

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
      setFormValues([...formValues, { itemToCheck: "", itemID: "", numNeeded: "", resp: "", itemName: ""}])
    }
  
  let removeFormFields = (i) => {
      let newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
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
        <Text style={style.textStyle}>StudentEmail:</Text>
        <TextInput
          style={style.input}
          placeholder=" StudentEmail@ewu.edu"
          onChangeText={
            (value)=>setStudentEmail(value)
          }
        />

          {formValues.map((element, index) => (
            <View key={index} style={style.itemInList}>
                <Text></Text>
              {/*<Text>Item Name</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeName(text, index)} />
              </View>*/}
              <Text>Item ID</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />
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
              <Button style={style.buttonStyle} onPress={() => checkDecrease()} title="submit" color="#a10022"></Button>
          </View>

        {/*<Text style={style.textStyle}>Number of items to be taken:</Text>
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
        
        
        <Button style={style.buttonStyle} onPress={() => checkDecrease()} title="Submit" color="#a10022" />*/}
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

