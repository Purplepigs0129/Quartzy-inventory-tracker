import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox'
import { StyleSheet, ScrollView, Text, View, SafeAreaView, Button, TextInput} from 'react-native';
import * as API from './apiFunctions.js'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Should really look into cleaning up all the page imports.
//Having each page in a separate feels great, though
import HomePage from './pages/HomePage.js'
import CredPage from './pages/CredPage.js'
import CheckoutPage from './pages/CheckoutPage.js'
import FinishPage from './pages/FinishPage.js';
import NewItemPage from './pages/NewItemPage.js';
import WorkPage from './pages/WorkPage.js';
import ResultsPage from './pages/ResultsPage.js';
import CheckPage from './pages/CheckStockPage.js'
import GetOrderNumPage from './pages/GetOrderNumPage.js'
import MakeReturnPage from './pages/MakeReturnPage.js'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage.js'
import LogDirectoryPage from './pages/LogDirectoryPage.js'
import OrderHistoryPage from './pages/OrderHistoryPage.js'
import { BarCodeScanner } from 'expo-barcode-scanner';
import {createTransactions, createReturns, createCheckouts} from './dbFunctions.js'
import { createQuartzyTable } from './itemDB.js';
import Barcode from './components/Barcode.js';

//Initialization*****************************************************************

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D6E71',
    justifyContent: 'center',
    maxHeight: '100%',//for android buttons at bottom

  },
  scrollView:{
    backgroundColor: '#6D6E71'
  },
  input: {
    margin: 7,
    borderWidth: 2,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  input1: {
    margin: 7,
    borderWidth: 2,
    borderRadius: 5,
    width: '78%',
    alignItems: 'flex-start',
  },
  textStyle: {
    margin: 7,
    alignItems: 'flex-start',
    color: '#fff',
  },
  buttonStyle: {
    alignItems: 'center',
    margin: 10,
    
  },
  placeholder: {
    color: '#bababa',
  },
  selection: {
    flexDirection: 'row',
    alignItems: 'right',
  },
  checkbox: {
    margin: 8,
  },
  removeButtonStyle: {
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 0,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#a10022",
    width: "30%",
  },
  removeButtonHolder:{
    alignItems: 'flex-end',
    width: '92%',
  },
  itemInList: {
    borderWidth: 1,
    borderColor: "#808080",
  },
  dropDown: {
    zIndex: 100
  }
});

const Stack = createNativeStackNavigator();

//Page Functions***********************************************************************************
/*
function handleInsert(navigation, itemID, numToIncr, incr){
  API.incr(itemID, numToIncr, incr);
  navigation.navigate('Complete Increase');
}
*/
//End Page Functions*********************************************************************************


//read text files

//end read text files

//End Increase Page*****************************************

//@App***************************************************************************************

createTransactions()
createCheckouts()
createReturns()
createQuartzyTable()

const App = () => {
  return(

    //Screens***************************************************************************
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home">
          {(props)=><HomePage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Change Credentials">
          {(props)=><CredPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Return Items">
          {(props)=><ReturnPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Checkout Items">
          {(props)=><CheckoutPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Add New Item">
          {(props)=><NewItemPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Working Page">
          {(props)=><WorkPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Success Page">
        {(props)=><FinishPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Results Page">
        {(props)=><ResultsPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Check Quantity">
        {(props)=><CheckPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Get Order Number">
        {(props)=><GetOrderNumPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Make Return Page">
        {(props)=><MakeReturnPage {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Checkout Success Page">
        {(props)=><CheckoutSuccessPage {...props} style={styles}/>}
        </Stack.Screen
        <Stack.Screen name = "Barcode Page">
        {(props)=><Barcode {...props} style={styles}/>}
        </Stack.Screen>
        <Stack.Screen name = "Log Directory">
          {(props)=><LogDirectoryPage{...props} style={styles}/>}
        </Stack.Screen>
         <Stack.Screen name = "Order History">
          {(props)=><OrderHistoryPage{...props} style={styles}/>}
        </Stack.Screen>
        {/*<Stack.Screen name = "Material Usage Statistics">

        </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
    //End Screens****************************************************************************************

  )
}

export default App;