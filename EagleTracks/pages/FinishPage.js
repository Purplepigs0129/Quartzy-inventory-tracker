import { StatusBar } from 'expo-status-bar';
import {Text, View, Button, Pressable} from 'react-native';

const FinishPage = ({navigation, style}) => {
    return(
      <View style={style.resultsContainer}>
        <Text style={style.resultsHeaderStyle}>Success</Text>
        <Text></Text>
        <Pressable style={style.removeButtonStyle} onPress={() => navigation.navigate('Home')}>
          <Text style={style.buttonTextStyle}>Return Home</Text>
        </Pressable>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default FinishPage;