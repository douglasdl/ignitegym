import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from "@expo-google-fonts/roboto"
import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed"
// import { config } from "@gluestack-ui/config" 
import { config } from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading'
import { SignIn } from '@screens/Signin'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  return (
    <GluestackUIProvider config={config}>
      <Center flex={1} bg='$gray700'>
        <StatusBar  
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {
          fontsLoaded ? <SignIn /> : <Loading />
        }
      </Center>
    </GluestackUIProvider>
  );
}