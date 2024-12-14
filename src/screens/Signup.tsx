import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"
import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

export function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp() {
    console.log({
      name,
      email,
      password,
      passwordConfirm
    })
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
      w="$full"
    >
      <VStack flex={1} w="$full">
        <Image 
          w="$full" 
          h={624} 
          source={BackgroundImg} 
          defaultSource={BackgroundImg}
          alt="Pessoas treinando" 
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />
            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Input 
              placeholder="Nome" 
              onChangeText={setName}
            />

            <Input 
              placeholder="E-mail" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              onChangeText={setEmail}
            />

            <Input 
              placeholder="Senha" 
              secureTextEntry
              onChangeText={setPassword}
            />
            
            <Input 
              placeholder="Confirme a Senha" 
              secureTextEntry
              onChangeText={setPasswordConfirm}
            />

            <Button 
              title="Criar e Acessar" 
              onPress={handleSignUp}
            />
          </Center>  

          <Button title="Voltar para o Login" variant="outline" onPress={handleGoBack} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}