import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Heading, VStack, Text, Toast, ToastTitle, useToast } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'
      toast.show({
        id: 1,
        placement: "top",
        duration: 5000,
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id
          return (
            <Toast nativeID={uniqueToastId} action="warning" variant="solid" bgColor="$red500" mt="$6">
              <ToastTitle color="$white">{title}</ToastTitle>
            </Toast>
          )
        },
      })
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {
        isLoading ? <Loading /> : (
          <SectionList 
            sections={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
              <HistoryCard 
                data={item}
              />
            }
            renderSectionHeader={({ section }) => (
              <Heading 
                color="$gray200" 
                fontSize="$md" 
                mt="$10" 
                mb="$3"
              >
                {section.title}
              </Heading>
            )}
            style={{ paddingHorizontal: 32 }}
            contentContainerStyle={
              exercises.length === 0 && {
                flex: 1, justifyContent: "center"
              }
            }
            ListEmptyComponent={() => (
              <Text color="$gray100" textAlign="center">
                Não há exercícios registrados ainda. {"\n"} 
                Vamos fazer exercícios hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }
    </VStack>
  )
}