import { StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular
} from "@expo-google-fonts/roboto"
import { Center, GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading'
import { Routes } from './src/routes'
import { Home } from '@screens/Home'

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
          fontsLoaded ? <Home /> : <Loading />
        }
      </Center>
    </GluestackUIProvider>
  );
}