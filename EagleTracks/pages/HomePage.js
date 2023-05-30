import React from 'react';
import {Text, View, Button, StatusBar, Pressable} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomePage = ({navigation, style}) => {
    return(
      <View style={style.homeContainer}>
        <Pressable style={style.accountButton}>
          <MaterialIcons name="account-circle" size={60} color="#a10022" onPress={() => navigation.navigate('Change Credentials')} />
        </Pressable>
        {/*<Button style={style.buttonStyle} onPress={() => navigation.navigate('Change Credentials')} title="Change Credentials" color="#a10022"/>
        <Text></Text>*/}
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Get Order Number')} title="Process Return">
          <Text style={style.homeButtonText}>Process Return</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items">
          <Text style={style.homeButtonText}>Checkout Items</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Check Quantity')} title="Check Item Quantity">
          <Text style={style.homeButtonText}>Check Item Quantity</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Add New Item')} title="Update Item List">
          <Text style={style.homeButtonText}>Update Item List</Text>
        </Pressable>
        {/*<Button style={style.homeButtonStyle} onPress={() => navigation.navigate('Get Order Number')} title="Process Return" color="#a10022"/>
        <Text></Text>
        <Button style={style.homeButtonStyle} onPress={() => navigation.navigate('Checkout Items')} title="Checkout Items" color="#a10022"/>
        <Text></Text>
        <Button style={style.homeButtonStyle} onPress={() => navigation.navigate('Check Quantity')} title="Check Item Quantity" color="#a10022"/>
        <Text></Text>
        <Button style={style.homeButtonStyle} onPress={() => navigation.navigate('Add New Item')} title="Update Item List" color="#a10022"/>*/}
        <StatusBar style="auto" />
      </View>
    )
  }


export default HomePage;