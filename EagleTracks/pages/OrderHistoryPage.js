import React, {useInsertionEffect, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text , View,  Switch, Button, TextInput} from 'react-native';
import InputField from '../components/InputField';
import { getAll } from '../dbFunctions';
import DataEntry from '../components/DataEntry';

const OrderHistoryPage = ({navigation, style})=>{
    const [isOutstanding, setIsOutstanding] = useState(false);
    const [id, setId] = useState(-1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [DbData, setDbData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const toggleSwitch = () => setIsOutstanding(previousState => !previousState);

    
    useEffect(() =>{
      getAll().then((value)=>{
        setDbData(value);
        setFilteredData(value);
      })
    },[])

    
   useEffect( ()=>{filterData()},[isOutstanding, id, name,email, course])

    function filterData(){
      setFilteredData(DbData.filter((object) => searchFilter(object)));
    } 

    function searchFilter(element){
      let returnItem = true;
      if (id != -1 || id =="" ){
          returnItem = returnItem && (element.OrderNum.toString().startsWith(id.toString()))
      }

      if(name !=""){
        returnItem = returnItem && (element.StudentName.includes(name))
      }

      if(email != ""){
        returnItem = returnItem && (element.StudentEmail.includes(email))
      }
      
      if (course !=""){
        returnItem = returnItem && (element.ClassName.includes(course))
      }

      if(isOutstanding){
        returnItem = returnItem && (typeof(element.DateOfReturn) == typeof(null))
      }
      return returnItem;
    }


  
    return (
        <ScrollView style={style.scrollView}>
            <Text>Filter Search</Text>
            <InputField style ={style} label = "Order ID" onChange ={(value)=>setId(value)}/>
            <InputField style ={style} label = "Student Name" onChange ={(value)=>setName(value)}/>
            <InputField style ={style} label = "Student Email"onChange ={(value) =>setEmail(value)}/>
            <InputField style ={style} label = "Class" onChange= {(value) =>setCourse(value)}/>
          <View style={{flexDirection: "row"}}>
          <Text style = {{alignSelf: "center", paddingHorizontal:"5%"}}>Show only outstanding orders</Text>
        <Switch style = {{alignSelf: "center"}}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isOutstanding ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isOutstanding}
        />
        </View>
        <DataEntry cardStyle="normal" data={["Order #", "Student Name", "Checkout Date", "Return Date"]}></DataEntry>
        {filteredData.map((element, index)=>(
          <DataEntry 
          cardStyle={Number.isNaN(Date.parse(element.DateOfReturn)) ? "warning":"success"}//typeof(element.DateOfReturn) == typeof(NaN) ? "warning":}
          data={[
            element.OrderNum, 
            element.StudentName, 
            new Date(Date.parse(element.DateOfTransaction)).toLocaleDateString(),  //Checkout Date
            Number.isNaN(Date.parse(element.DateOfReturn)) ? 
               "Not Returned" : new Date(Date.parse(element.DateOfTransaction)).toLocaleDateString()
          ]}>


          </DataEntry>
        ))}
      </ScrollView>
    )

}

export default OrderHistoryPage;