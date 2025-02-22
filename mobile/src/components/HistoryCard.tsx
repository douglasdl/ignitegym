import { HistoryDTO } from "@dtos/HistoryDTO"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

interface HistoryCardProps {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {

  return (
    <HStack w="$full" px="$5" py="$4" bg='$gray600' alignItems='center' justifyContent="space-between" rounded='$md' mb="$3">
      <VStack flex={1} mr="$5">
        <Heading color="$white" fontSize="$md" textTransform="capitalize" fontFamily="$heading" numberOfLines={1}>
          {data.group}
        </Heading>
        <Text fontSize='$lg' color='$gray100' numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">{data.hour}</Text>
    </HStack>
  )
}