import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import labList from '../itemList.json'
import login from '../loginCred.json'
const CheckoutPage = ({navigation, style}) => {
    const [formValues, setFormValues] = useState([{ itemToCheck: "", numNeeded: "", resp: "", itemName: "", willReturn: false}]);
    const [studentName, setStudentName] = useState('');
    const [instName, setInstName] = useState('');
    const [className, setClassName] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const [toReturn, setToReturn] = useState(false);

    const itemList = labList[login['labID']]
    
  
    const checkDecrease = () => {
      let testRun = true
      console.log("button pressed")
      if(!(studentName.trim())){
        testRun = false
        alert('Item is empty');
      }else if(!(instName.trim())){
        testRun = false
        alert('Item is empty');
      }else if(!(roomNum.trim())){
        testRun = false
        alert('Item is empty');
      }else if(!(className.trim())){
        testRun = false
        alert('Item is empty');
      }
      for (let i = 0; i < formValues.length; i++){
        //console.log(formValues[i].itemToCheck)
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
        } else if(!(formValues[i].itemName.trim())){
          testRun = false
          alert(`Item ${i + 1}'s name is blank`)
        } else if(itemList.hasOwnProperty(formValues[i].itemToCheck)){
          const _formValues = [...formValues]
          _formValues[i].itemToCheck = itemList[formValues[i].itemToCheck];
          setFormValues(_formValues)
          console.log(formValues[i].itemToCheck)
        } else if(!itemList.hasOwnProperty(formValues[i].itemToCheck)){
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

    async function apiCaller(){
      requests = []
      for (let i = 0; i < formValues.length; i++){
        requests.push(API.incr(formValues[i].itemToCheck, parseInt(formValues[i].numNeeded), false, navigation))
      }
      Promise.all(requests).then(() => {
        navigation.navigate('Success Page');
      }).catch((error) => {
        console.log("error")
        navigation.goBack();
      })
    }

    let handleChangeName = (text, index) => {

      const _formValues = [...formValues]
      _formValues[index].itemName = text;
      console.log(text)
      setFormValues(_formValues)
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

  let handleToReturn = (bool, index) => {
    const _formValues = [...formValues]
    _formValues[index].willReturn = bool
    setFormValues(_formValues)
  }
  
  let addFormFields = () => {
      setFormValues([...formValues, { itemToCheck: "", numNeeded: "", resp: "", itemName: "", willReturn: false}])
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

          {formValues.map((element, index) => (
            <View key={index} style={style.itemInList}>
                <Text></Text>
              <Text>Item Name</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeName(text, index)} />
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              </View>
              <Text>Item ID</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />
              {/*<TextInput style={style.input} value={element.value} onChangeText={text => handleChangeItem(text, index)} />*/}
              </View>
              <Text>Amount Needed</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeAmount(text, index)} />
              </View>
              <Text>Will the item be returned?</Text>
              <View>
              <Checkbox style={style.checkbox} value={element.willReturn} onValueChange={bool => handleToReturn(bool, index)} color={element.willReturn ? '00ff00' : '#000000'}/>
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

