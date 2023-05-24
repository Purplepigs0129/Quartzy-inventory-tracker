import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {ScrollView, View, Text, SafeAreaView, Button, TextInput, Pressable} from 'react-native';
import * as API from '../apiFunctions.js'
import {Picker} from '@react-native-picker/picker'
import * as itemDB from '../itemDB'

const ReturnPage = ({navigation, style}) => {
    
    const [formValues, setFormValues] = useState([{ itemToCheck: "Placeholder", numNeeded: "", resp: "", itemNameHolder: ""}]);
    const [pickerList, setPickerList] = useState([])
    const [emptyLoad, setEmptyLoad] = useState(true)
    
    
    //console.log(pickerData)

    function insertValue(value){
      console.log('Value')
      console.log(value)
      const _pickerList = [...pickerList]
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
        setFormValues([...formValues, { itemToCheck: "Placeholder", numNeeded: "", resp: "", itemNameHolder: ""}])
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
  
  export default ReturnPage;