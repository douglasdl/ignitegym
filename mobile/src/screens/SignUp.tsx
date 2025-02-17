import { Center, Heading, Image, Text, VStack, ScrollView } from "@gluestack-ui/themed"
import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { useForm, Controller } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { api } from "@services/api"
import axios from "axios"
import { Alert } from "react-native"

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref("password"), ""], "As senhas devem ser iguais.")
})

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.navigate("signIn")
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post('/users', { name, email, password })
      console.log(response.data)
    } catch (error) {
      if(axios.isAxiosError(error)) {
        Alert.alert(error.response?.data.message)
      }
    }
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

        <VStack flex={1} px="$10" gap="$8" pb="$16">
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
                  errorMessage={errors.name?.message}
                  autoComplete="name"
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
                  errorMessage={errors.email?.message}
                  autoComplete="email"
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
                  errorMessage={errors.password?.message}
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
                  errorMessage={errors.password_confirm?.message}
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