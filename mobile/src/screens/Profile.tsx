import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"
import { ScrollView, TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useState } from "react"
import { ToastMessage } from "@components/ToastMessage"
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from "@hooks/useAuth"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppError } from "@utils/AppError"
import { api } from "@services/api"

const PHOTO_SIZE = 33;

interface FormDataProps {
  name: string
  email: string
  old_password: string
  password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    // .when('password', {
    //   is: (Field: any) => Field, 
    //   then: yup
    //     .string()
    //     .nullable()
    //     .required('Informe a confirmação da senha.')
    //     .transform((value) => !!value ? value : null)
    // }),
})

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/douglasdl.png");

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  console.log(user);
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) 
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });
  
      if(photoSelected.canceled) {
        return
      }
  
      const photoUri = photoSelected.assets[0].uri;
      if(photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }
  
        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          const title = 'Essa imagem é muito grande. Escolha uma imagem de até 5MB.'
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage 
                id={id}
                action="error"
                title={title}
                onClose={() => toast.close(id)}
              />
            )
          })
        }
        setUserPhoto(photoUri)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      await api.put('/users', data);
      await updateUserProfile(userUpdated);
      const title = "Perfil atualizado com sucesso!";
      toast.show({
        id: 1,
        placement: "top",
        duration: 5000,
        render: ({ id }) => {
          return (
            <ToastMessage
              id={id}
              title={title}
              action="success"
            />
          )
        },
      })
      
      // navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'
      toast.show({
        id: 1,
        placement: "top",
        duration: 5000,
        render: ({ id }) => {
          return (
            <ToastMessage
              id={id}
              title={title}
              action="error"
            />
          )
        },
      })
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={{ uri: userPhoto}} 
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Controller 
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input 
                  bg="$gray600" 
                  placeholder="Nome" 
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            
            <Controller 
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <Input 
                  bg="$gray600" 
                  placeholder="E-mail" 
                  value={value}
                  isReadOnly
                />
              )}
            />
          
          </Center>

          <Heading alignSelf="flex-start" fontFamily="$heading" color="$gray200" fontSize="$md" mt="$12" mb="$2">
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
          <Controller 
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input 
                  bg="$gray600" 
                  placeholder="Senha antiga" 
                  onChangeText={onChange}
                />
              )}
            />
            <Controller 
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input 
                  bg="$gray600" 
                  placeholder="Nova senha" 
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller 
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input 
                  bg="$gray600" 
                  placeholder="Confirme a nova senha" 
                  onChangeText={onChange}
                  secureTextEntry
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />
            <Button 
              title="Atualizar" 
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </Center>
        </Center>

      </ScrollView>
    </VStack>
  )
}