import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as itemDB from './itemDB'
import * as secureStore from "./SecureStore"

//Get All**********************************************************************************

async function getAll(){
    
    var accessToken = await secureStore.getValueFor('AccessToken')
    
    const url = "https://api.quartzy.com/inventory-items";
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Access-Token': accessToken,
            'Content-Type': 'application/json',
        },
        
    });

    const text = await response.text();
    //response.json().then(json => {console.log(json)})
    console.log(text)
  }

  //Update List****************************************************

  async function updateAll(navigation){
    var accessToken = await secureStore.getValueFor('AccessToken')
    
    const url = "https://api.quartzy.com/inventory-items";
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Access-Token': accessToken,
            'Content-Type': 'application/json',
        },
        
    });

    const array = await response.json();
    console.log("Array: ")
    console.log(array)
    if(array.length == 0){
        alert("Quartzy database returned no items (they're probably down again)")
    }
    
    console.log("Entering for loop")
    for(let i = 0; i < array.length; i++){
        var result = await itemDB.getQuartzyItemSerial(array[i]['technical_details'])
        console.log(result)
        if(result.length == 0){
            console.log("Insert new data")
            itemDB.quartzyTableInsert(array[i]['technical_details'], array[i]['name'], array[i]['id'])
        }
    }

    
    navigation.navigate('Success Page')

    }


//Check Batch**************************************************

  async function checkBatch(formValues, navigation){
    var nav = true;
    var accessToken = await secureStore.getValueFor('AccessToken')
    
    for (let i = 0; i < formValues.length; i++){
        console.log(formValues[i].itemToCheck)
        itemID = formValues[i].itemToCheck
        if(!(itemID.trim())){
            alert(`Item ${i} is not present in item list, please update item list`)
            nav = false
            break
        }
        console.log('checkID')
        console.log(itemID)

        const url = "https://api.quartzy.com/inventory-items/".concat(itemID);
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Access-Token': accessToken,
            },
            
        });
  
        const quantResp = await response.json();

        console.log("Response Status: ")
        console.log(response.status)
        
        if(response.status != '200'){
            if(response.status == '404'){
                alert(`Error in handling of item ${i + 1}.  Quartzy database may be down or the item was not stored correctly.`)
                nav = false
                break
            }else{
                alert(`Error in handling of item ${i + 1}.  ${response.status}  Please notify your instructor`)
                nav = false
                break
            }
        }
        
        const quant = quantResp['quantity']
        
        if(parseInt(formValues[i].numNeeded) <= quant){
            str = `You have enough of ${formValues[i].itemNameHolder} (Amount needed = ${formValues[i].numNeeded}, Amount owned = ${quant})`
        }else{
            str = `You do not have enough of ${formValues[i].itemNameHolder} (Amount needed = ${formValues[i].numNeeded}, Amount owned = ${quant})`
        }
        formValues[i].resp = str;
        console.log(formValues[i].resp)
    }

    //navigation.navigate('Results Page')
    if(nav){
        navigation.navigate('Results Page', {formValues})
    }else{
        navigation.goBack()
    }
  }

//Get Quantity************************************************************************

  async function getQuantity(itemID){
    var accessToken = await secureStore.getValueFor('AccessToken')
    
    console.log("id in quantity:")
    console.log(itemID)
    const url = "https://api.quartzy.com/inventory-items/".concat(itemID);
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Access-Token': accessToken,
        },
    });
  
    const resp = await response.json();
    //response.then(json => {console.log(json)})
    const status = response.status;
    console.log(resp);
    
    response.json().then(json => {console.log(json)})
    
    if(status == '200'){
        itemQuant = resp['quantity'];
        console.log(itemQuant);
        return parseInt(itemQuant);
    }else if(status == '401'){
        alert('Error 401: Request Unauthorized\nPlease reset your Access Token')
        console.log("logged unauthorized in quantity")
        throw error
    }else if(status == '404'){
        alert('Error 404: Item Not Found\nPlease return to the home page and add the item')
        console.log("logged not found in quantity")
        throw error
    }else{
        alert('Unknown Error')
        console.log("logged unknown error in quantity")
        throw error
        
    }
  }
  
//Change Stock**********************************************************************************

  async function incr(itemID, numIncr, incr, navigation){
    var accessToken = await secureStore.getValueFor('AccessToken')
    
    let curQuant = await getQuantity(itemID);
    if (curQuant != "NaN"){
        if(incr){
            newQuant = parseInt(curQuant) + numIncr;
        }else{
            newQuant = parseInt(curQuant) - numIncr;
        }
        console.log(newQuant)
        const data = '{"quantity": "'.concat(String(newQuant)).concat('"}')
    
        const url = "https://api.quartzy.com/inventory-items/".concat(itemID);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
            body: data,
            
        });
    
        const text = await response.text();
        const status = response.status;
        response.json().then(json => {console.log(json)})
        console.log(text);
        if(status == '200'){
            //navigation.navigate('Success Page');
        }else if(status == '401'){
            alert('Error 401: Request Unauthorized\nPlease reset your Access Token')
            console.log("Logged unauthorized in incr")
            throw error
            
        }else if(status == '404'){
            alert('Error 404: Item Not Found\nPlease return to the home page and add the item')
            console.log("Logged item not found in incr")
            throw error
        }else{
            alert('Unknown Error')
            console.log("Logged unknown error in incr")
            throw error
        }
    }else{
        navigation.goBack();
    }
  
  }

  export {getAll, checkBatch, getQuantity, incr, updateAll};