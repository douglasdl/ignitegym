import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>([""]);
  const [groupSelected, setGroupSelected] = useState("antebraço");

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId })
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
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
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'
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

  useEffect(() => {
    fetchGroups();
    setGroupSelected("antebraço");
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group 
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)} 
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 10 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      {
        isLoading ? <Loading /> : (
          <VStack px="$8" flex={1}>
            <HStack justifyContent="space-between" mb="$5" alignItems="center">
              <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
                Exercícios
              </Heading>
    
              <Text color="$gray200" fontSize="$sm" fontFamily="$body">
                {exercises.length}
              </Text>
            </HStack>
    
            <FlatList
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard 
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)} 
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
        )
      }
    </VStack>
  )
}