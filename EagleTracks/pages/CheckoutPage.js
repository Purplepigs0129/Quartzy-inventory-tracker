import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import * as dbFunctions from "../dbFunctions.js"
import * as itemDB from "../itemDB.js"
import { FontAwesome5 } from '@expo/vector-icons';
import Barcode from '../components/Barcode.js';

const CheckoutPage = ({navigation, route, props, style}) => {
    const [formValues, setFormValues] = useState([{ itemToCheck: "", itemID: "", numNeeded: "", resp: "", itemName: ""}]);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [instName, setInstName] = useState('');
    const [className, setClassName] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const data = route.params;
    console.log(data)

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
        }
      }
      console.log("comp")
      if(testRun){
        navigation.navigate('Working Page');
        updateFormValues()
      }
    }

    async function updateFormValues(){
      let success = true
      for (let i = 0; i < formValues.length; i++){
        await getItemID(formValues[i].itemToCheck).then((results) => {
          console.log("in update")
          console.log(results)

          const _formValues = [...formValues]
          _formValues[i].itemID = results['ItemID'];
          setFormValues(_formValues)
          console.log(formValues[i].itemID)

        }).catch(error => {
          console.log(error)
          success = false
          alert(`Item ${i + 1} not retrieved from database, please update the database list`)
        })
      }
      if(success){
        apiCaller()
      }
    }

    async function getItemID(itemSerial){
      var value = await (itemDB.getQuartzyItemSerial(String(itemSerial)))
      console.log("GetItemID")
      console.log(value)
      return value[0]
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

    let handleChangeItem = (text, index) => {
      console.log(index)
      const _formValues = [...formValues]
      _formValues[index].itemToCheck = text.toUpperCase();
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

  useEffect(()=>{
    console.log("UseEffect")
    if(data != null){
      console.log("in if")
      handleChangeItem(data.returnString, data.routeIndex);
    }
  },[data])
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
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TextInput style={style.input1} value={formValues[index].itemToCheck} onChangeText={text => handleChangeItem(text, index)}/>
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              <Pressable>
                <FontAwesome5 name="camera" size={32} color="black" onPress={() => navigation.navigate('Barcode Page', {index})} />
              </Pressable>
              </View>
              <Text>Amount Needed</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeAmount(text, index)} />
              </View>
              {
                index ? 
                  <View style={style.removeButtonHolder}>
                    <Pressable style={style.removeButtonStyle} onPress={() => removeFormFields(index)}>
                      <Text style={style.textStyle}>Remove Item</Text>
                    </Pressable>
                    <Text>{"\n"}</Text>
                  </View>
                : null
              }
            </View>
          ))}
          <View>
              <Text>{"\n"}</Text>
              <Button style={style.buttonStyle} onPress={() => addFormFields()} title="additional item" color="#a10022"></Button>
              <Text>{"\n"}</Text>
              <Button style={style.buttonStyle} onPress={() => checkDecrease()} title="submit" color="#a10022"></Button>
          </View>
      <StatusBar style="auto" />
      </ScrollView>
      </SafeAreaView>
      )
  }


  export default CheckoutPage;

