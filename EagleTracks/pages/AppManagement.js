import React from 'react';
import {Text, View, StatusBar, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const HomePage = ({navigation, style}) => {
    return(
      <View style={style.homeContainer}>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Change Credentials')} title="ChangeCredentials">
          <MaterialCommunityIcons name="account" size={64} color="white" />
          <Text style={style.homeButtonText}>Change Credentials</Text>
        </Pressable>
        <Pressable style={style.homeButtonStyle} onPress={() => navigation.navigate('Add New Item')} title="Update Item List">
          <FontAwesome name="refresh" size={64} color="white" />
          <Text style={style.homeButtonText}>Update Item List</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    )
  }


export default HomePage;