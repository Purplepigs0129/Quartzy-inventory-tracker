import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import * as dbFunctions from "../dbFunctions.js"
import * as itemDB from "../itemDB.js"

const CheckoutPage = ({navigation, style}) => {
    const [formValues, setFormValues] = useState([{ itemToCheck: "", itemID: "", numNeeded: "", resp: "", itemName: ""}]);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [instName, setInstName] = useState('');
    const [className, setClassName] = useState('');
    const [roomNum, setRoomNum] = useState('');

  
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


  export default CheckoutPage;

