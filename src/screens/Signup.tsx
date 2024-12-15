import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"
import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { useForm, Controller } from "react-hook-form"

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const navigation = useNavigation();

  const  { control, handleSubmit } = useForm<FormDataProps>();

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({ name, email, password, password_confirm });
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

            <Controller 
              control={control}
              name="name"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder="Nome" 
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller 
              control={control}
              name="email"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder="E-mail" 
                  keyboardType="email-address" 
                  autoCapitalize="none" 
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller 
              control={control}
              name="password"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
         
            <Controller 
              control={control}
              name="password_confirm"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder="Confirme a Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />
            

            <Button 
              title="Criar e Acessar" 
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>  

          <Button title="Voltar para o Login" variant="outline" onPress={handleGoBack} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}