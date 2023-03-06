import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//get All**********************************************************************************

async function getAll(){
    const url = 'https://api.quartzy.com/inventory-items';
  
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Access-Token': 'XZfaakimE7JyfmwuO3RdbqMminXu83rr2wUuhCHp',
        },
        
    });
  
    const text = await response.text();
    response.json().then(json => {console.log(json)})
    console.log(text);
  }
  
//Get Quantity************************************************************************

  async function getQuantity(itemID){
    const url = "https://api.quartzy.com/inventory-items/".concat(itemID);
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Access-Token': 'XZfaakimE7JyfmwuO3RdbqMminXu83rr2wUuhCHp',
        },
        
    });
  
    const text = await response.text();
    response.json().then(json => {console.log(json)})
    console.log(text);
    let body = text.replace("b'", '');
    body = body.replace("[{", '');
    let cont = body.split(",");
    let quantity = cont[6];
    quantity = quantity.replace('"', '');
    quant = quantity.split(":");
    
    itemQuant = quant[1].replace('"', '');
    itemQuant = itemQuant.replace('"', '')
    console.log(itemQuant);
    return parseInt(itemQuant);
    
  }
  
//Change Stock**********************************************************************************

  async function incr(itemID, numIncr, incr, navigation){
    let curQuant = await getQuantity(itemID);
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
            'Access-Token': 'XZfaakimE7JyfmwuO3RdbqMminXu83rr2wUuhCHp',
            'Content-Type': 'application/json',
        },
        body: data,
        
    });
  
    const text = await response.text();
    const status = response.status;
    response.json().then(json => {console.log(json)})
    console.log(text);
    if(status == '200'){
        navigation.navigate('Success Page');
    }else if(status == 401){
        alert('Error 401: Request Unaurhorized\nPlease reset your Access Token')
    }else if(status == 404){
        alert('Error 404: Item Not Found\nPlease return to the home page and add the item')
    }else{
        alert('Unknown Error')
    }
    
  
  }

  export {getAll, getQuantity, incr};