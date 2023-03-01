import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as API from './apiFunctions.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createNativeStackNavigator();

const IncrPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true)} title="Increase by 5" color="#841584" />
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
  )
}

const DecrPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false)} title="Decrease by 5" color="#841584" />
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584"/>*/}
    <StatusBar style="auto" />
    </View>
    )
}

const GetPage = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => API.getQuantity("945eadcc-319a-4c21-89f2-1901defd742e")} title="Get Quantity" color="#841584" />
      {/*<Button onPress={() => navigation.navigate('Home')} title="Return Home" color="#841584" />*/}
    <StatusBar style="auto" />
    </View>
  )
}


const HomeScreen = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Return Items')} title="Return Items" color="#841584"/>
      <Text></Text>
      <Button onPress={() => navigation.navigate('Take Items')} title="Take Items" color="#841584"/>
      <Text></Text>
      <Button onPress={() => navigation.navigate('Get Item Data')} title="Get Item Data" color="#841584"/>
      <StatusBar style="auto" />
    </View>
  
  )
}



const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component = {HomeScreen}
        />
        <Stack.Screen
          name = "Return Items"
          component = {IncrPage}
        />
        <Stack.Screen
          name = "Take Items"
          component = {DecrPage}
        />
        <Stack.Screen
          name = "Get Item Data"
          component = {GetPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => API.getAll()} title="Get All" color="#841584" />
      <Button onPress={() => API.getQuantity("945eadcc-319a-4c21-89f2-1901defd742e")} title="Get Quantity" color="#841584" />
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, true)} title="Increase by 5" color="#841584" />
      <Button onPress={() => API.incr("945eadcc-319a-4c21-89f2-1901defd742e", 5, false)} title="Decrease by 5" color="#841584" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/