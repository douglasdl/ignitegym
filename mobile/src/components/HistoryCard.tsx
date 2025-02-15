import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"

export function HistoryCard() {

  return (
    <HStack w="$full" px="$5" py="$4" bg='$gray600' alignItems='center' justifyContent="space-between" rounded='$md' mb="$3">
      <VStack flex={1} mr="$5">
        <Heading color="$white" fontSize="$md" textTransform="capitalize" fontFamily="$heading" numberOfLines={1}>
          Costas
        </Heading>
        <Text fontSize='$lg' color='$gray100' numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">08:56</Text>
    </HStack>
  )
}