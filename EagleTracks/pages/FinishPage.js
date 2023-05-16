import { StatusBar } from 'expo-status-bar';
import {Text, View, Button} from 'react-native';

const FinishPage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Success</Text>
        {<Button style={style.buttonStyle} onPress={() => navigation.navigate('Home')} title="Return Home" color="#a10022"/>}
      <StatusBar style="auto" />
      </View>
    )
  }

  export default FinishPage;