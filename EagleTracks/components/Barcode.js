import React, {useState, useEffect} from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TextInput, Text, View, StyleSheet, Button, Linking } from "react-native";


const Barcode = (navigation, props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async() => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
      })();
    }, []);

if(props.children) {
    this.children=props.children;
} else {
    this.children = <></>
}

const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    const array = data.split("-");
    data = array[1];
    alert(`BarCode: ${data}`);
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
        style={ {height: 400, width: 400 }}
    />
    {scanned && <Button title='Scan again' onPress={() => setScanned(false)}/>}
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