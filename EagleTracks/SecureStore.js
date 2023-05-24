import * as SecureStore from 'expo-secure-store'

async function save(key, value){
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key){
    let result = await SecureStore.getItemAsync(key);
    if(result){
        return result
    } else {
        alert("You don't have a value set for ".concat(key))
    }
}

export {save, getValueFor}