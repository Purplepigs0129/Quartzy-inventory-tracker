import React, {useState, useEffect} from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TextInput, Text, View, StyleSheet, Button, Linking } from "react-native";


const Barcode = ({navigation, props, style, route}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const routeIndex = route.params.index;
    //console.log(routeIndex)
    const [returnString, setReturnString] = useState('') 
    

    useEffect(() => {
      (async() => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
      })();
    }, []);


const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    const array = data.split("-");
    data = array[1];
    alert(`BarCode: ${data}`);
    setReturnString(data)
};

if (hasPermission == null) {
    return <Text>Needs Camera Access</Text>
}
if (hasPermission == false) {
    return <Text>No access to Camera</Text>
}

return (
    <View style={styles.contianer}>
    <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={ {height: 500, width: 400 }}
    />
    {scanned && <Button title='Scan again' onPress={() => setScanned(false)}/>}
    <Button title='Submit' onPress={() => navigation.navigate('Checkout Items',  {returnString, routeIndex}) } />
    </View>
);
};

export default Barcode;
const styles = StyleSheet.create ({
    container: 1,
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        
    })