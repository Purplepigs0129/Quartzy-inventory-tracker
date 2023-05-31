import React from 'react';
import {Text, View, Button} from 'react-native';

const LogDirectoryPage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Text>Select the type of records to view</Text>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Order History')} title="Order History" color="#a10022"/>
        <Text></Text>
        <Button style={style.buttonStyle} onPress={() => navigation.navigate('Usage Statistics')} title="Material Usage Statistics" color="#a10022"/>
        <Text></Text>
        </View>
    )
}


export default LogDirectoryPage;