import { StatusBar, View } from 'react-native'
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from "@expo-google-fonts/roboto"
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <GluestackUIProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar  
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoaded ? <Text color='white' fontSize={34}>Home</Text> : <View/>
        }
      </View>
    </GluestackUIProvider>
  );
}