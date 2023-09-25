import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../functions/apiFunctions.js'
import {Picker} from '@react-native-picker/picker'
import * as itemDB from '../functions/itemDB'

const ReturnPage = ({navigation, style}) => {
    
    const [formValues, setFormValues] = useState([{ itemToCheck: "Select an item", numNeeded: "", resp: "", itemNameHolder: ""}]);
    const [pickerList, setPickerList] = useState([])
    const [emptyLoad, setEmptyLoad] = useState(true)
    
    
    //console.log(pickerData)

    function insertValue(value){
      console.log('Value')
      console.log(value)
      const _pickerList = [...pickerList]
      _pickerList.push('Select an item')
      for(let i = 0; i < value.length; i ++){
        _pickerList.push(value[i]['ItemName'])
      }
      setPickerList(_pickerList)
    }

    async function updatePicker(){
      var value = await itemDB.getAllPromise()
      console.log(value)
      insertValue(value)
    }
    
    useEffect(() => {
      console.log(emptyLoad)
      if(emptyLoad){
        updatePicker()
        setEmptyLoad(false)
      }
    }, [])
      
    
    const checkFields = () => {
        let testRun = true
        console.log(formValues)
        for (let i = 0; i < formValues.length; i++){
            //console.log(formValues[i].itemToCheck)
            if(!(formValues[i].itemToCheck.trim())){
                testRun = false
                alert(`Item ${i + 1} is not filled in`)
                break
            } else if(formValues[i].itemToCheck == 'Select an item'){
              testRun = false
              alert(`Item ${i + 1} was not selected`)
            } else if(!(formValues[i].numNeeded.trim())){
                testRun = false
                alert(`Amount needed for ${i + 1} is not filled in`)
                break
            } else if(!(parseInt(formValues[i].numNeeded))){
                testRun = false
                alert(`Amount needed for item ${i + 1} is not a number`)
                break
            }
        }


        if(testRun){
          handleFunctions()
          //API.checkBatch(formValues, navigation);
          navigation.navigate('Working Page')
        }
    }
    

    async function handleFunctions(){
      await updateFormValues().then(() => {
        API.checkBatch(formValues, navigation)
      }).catch(error => {
        console.log(error)
      })
    }

    async function updateFormValues(){
      for (let i = 0; i < formValues.length; i++){
        await getItem(formValues[i].itemToCheck).then((value) => {
          console.log("in update")
          console.log(value)

          const _formValues = [...formValues]
          _formValues[i].itemToCheck = value['ItemID'];
          _formValues[i].itemNameHolder = value['ItemName']
          setFormValues(_formValues)
          console.log(formValues[i].itemNameHolder)
          console.log(formValues[i].itemToCheck)

        }).catch(error => {
          console.log(error)
        })
      }
      
    }

    async function getItem(itemName){
      var value = await (itemDB.getQuartzyItemName(String(itemName)))
      console.log("GetItemData")
      console.log(value)
      return value[0]
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
        setFormValues([...formValues, { itemToCheck: "Select an item", numNeeded: "", resp: "", itemNameHolder: ""}])
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
              <Text style={style.textStyle}>Item ID:</Text>
              <View>
                <Picker
                style={style.pickerStyle}
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
              <Text style={style.textStyle}>Amount Needed:</Text>
              <View>
              <TextInput style={style.input} value={element.value} onChangeText={text => handleChangeAmount(text, index)} />
              </View>
              {
                index ? 
                  <View style={style.removeButtonHolder}>
                    <Text style={style.lineBreakText}>{"\n"}</Text>
                    <Pressable style={style.removeButtonStyle} onPress={() => removeFormFields(index)}>
                      <Text style={style.buttonTextStyle}>Remove Item</Text>
                    </Pressable>
                  </View>
                : null
              }
              <Text style={style.afterRemoveBreak}>{"\n"}</Text>
            </View>
          ))}
          <View>
          <Text style={style.afterRemoveBreak}>{"\n"}</Text>
              <Pressable style={style.addButtonStyle} onPress={() => addFormFields()}>
                <Text style={style.buttonTextStyle}>Additional Item</Text>
              </Pressable>
              <Text style={style.afterRemoveBreak}></Text>
              <Pressable style={style.buttonStyle} onPress={() => checkFields()}>
                <Text style={style.buttonTextStyle}>Submit</Text>
              </Pressable>
          </View>
      </ScrollView>
      </SafeAreaView>
    )

}
  
  export default ReturnPage;