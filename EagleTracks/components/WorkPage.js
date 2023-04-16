import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';

const WorkPage = ({navigation, style}) => {
    return(
      <View style={style.container}>
        <Text style={style.textStyle}>Working...</Text>
      <StatusBar style="auto" />
      </View>
    )
  }

  export default WorkPage;