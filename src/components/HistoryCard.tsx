import { Heading, HStack, Text, VStack, Icon } from "@gluestack-ui/themed"
import { TouchableOpacityProps } from "react-native"

type Props = TouchableOpacityProps & {
    data: any;
};

export function HistoryCard({ data, ...rest }: Props) {

  return (
    <HStack w="$full" px="$5" py="$4" bg='$gray600' alignItems='center' justifyContent="space-between" rounded='$md' mb="$3">
      <VStack mr="$5">
        <Heading color="$white" fontSize="$md" textTransform="capitalize" fontFamily="$heading">Costas</Heading>
        <Text fontSize='$lg' color='$gray100' numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>
      <Text color="$gray300" fontSize="$md">08:56</Text>
    </HStack>
  )
}