import { Heading, HStack, Icon, Text, VStack, Image, Box, useToast } from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { ArrowLeft } from "lucide-react-native"
import { ScrollView, TouchableOpacity } from "react-native"
import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button"
import { AppError } from "@utils/AppError"
import { api } from "@services/api"
import { useEffect, useState } from "react"
import { ExerciseDTO } from "@dtos/ExerciseDTO"
import { Loading } from "@components/Loading"
import { ToastMessage } from "@components/ToastMessage"

interface RoutesParamsProps {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRegister, setIsSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const route = useRoute();

  const { exerciseId } = route.params as RoutesParamsProps
  
  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'
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
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setIsSendingRegister(true);
      await api.post('/history', { exercise_id: exerciseId });
      const title = "Parabéns! Exercício registrado no seu histórico.";
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
      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício.'
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
      setIsSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
          <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">{exercise?.group}</Text>
          </HStack>
        </HStack>
      </VStack>

        {
          isLoading ? <Loading /> : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
              paddingBottom: 32
            }}>
              <VStack p="$8">
                <Image
                  source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
                  alt='Exercício'
                  mb="$3"
                  resizeMode='cover'
                  rounded='$lg'
                  w="$full"
                  h="$80"
                />

                <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                  <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                    <HStack>
                      <SeriesSvg />
                      <Text color="$gray200" ml="$2">{exercise?.series} Séries</Text>
                    </HStack>
                    <HStack>
                      <RepetitionsSvg />
                      <Text color="$gray200" ml="$2">{exercise?.repetitions} repetições</Text>
                    </HStack>
                  </HStack>
                  <Button 
                    title="Marcar como realizado" 
                    isLoading={isSendingRegister}
                    onPress={handleExerciseHistoryRegister}
                  />
                </Box>
              </VStack>
            </ScrollView>
          )
        }
    </VStack>
  )
}