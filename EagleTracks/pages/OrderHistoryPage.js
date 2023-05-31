import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text , View,  Switch, TextInput} from 'react-native';
import InputField from '../components/InputField';
import { getAll } from '../dbFunctions';

const OrderHistoryPage = ({navigation, style})=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const [id, setId] = useState(-1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //const DbData = data;
    const DbData = getAll();
    console.log(dbData);
    const applyFilter = () =>{
        let filteredData = dbData;
        if(id != -1){
          filteredData = filteredData.contin
        }
        if (name){
          filter += "StudentName like \""+name+"\" ";
        }
        if (email){
          filter += "StudentEmail like \""+name+"\" ";
        }

        
    }

  
    return (
        <View style={style.container}>
            <Text>Filter Search</Text>
            <InputField style ={style} label = "Order ID" onChange = {setId}/>
            <InputField style ={style} label = "Student Name" onChange ={setName}/>
            <InputField style ={style} label = "Student Email"onChange ={setEmail}/>
            <InputField style ={style} label = "Class" onChange= {setCourse}/>

          <Text>Show only outstanding orders</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>{id + name + email + course}</Text>
      </View>
    )

}

export default OrderHistoryPage;