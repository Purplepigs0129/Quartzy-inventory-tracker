import React from 'react';
import {Text, View, Button, StatusBar, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


const HomePage = ({navigation, style}) => {
    return(
      <View style={style.homeContainer}>
        <Pressable style={style.appManagementButton} onPress={() => navigation.navigate('App Management')} title="App Management">
          <Ionicons name="settings" size={24} color="white" />
          <Text style={style.homeButtonText}>  Manage App</Text>
        </Pressable>
        {/*<Button style={style.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
        <Text></Text>*/}
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items">
          <Entypo name="upload" size={64} color="white" />
          <Text style={style.lineBreakText}></Text>
          <Text style={style.homeButtonText}>Checkout Items</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Get Order Number')} title="Process Return">
          <Entypo name="download" size={64} color="white" />
          <Text style={style.lineBreakText}></Text>
          <Text style={style.homeButtonText}>Process Return</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Check Quantity')} title="Check Item Quantity">
          <Foundation name="magnifying-glass" size={64} color="white" />
          <Text style={style.lineBreakText}></Text>
          <Text style={style.homeButtonText}>Check Item Quantity</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Add New Item')} title="Update Item List">
          <AntDesign name="database" size={64} color="white" />
          <Text style={style.lineBreakText}></Text>
          <Text style={style.homeButtonText}>View Transactions</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    )
  }


export default HomePage;