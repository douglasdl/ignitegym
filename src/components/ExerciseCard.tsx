import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from 'lucide-react-native';
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
    data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Props) {

  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack bg='$gray500' alignItems='center' p="$2" pr="$4" rounded='$md' mb="$3">
        <Image
          source={{ uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEPnJlBmY8dd1qx8EoE_DHPGUbWdtnCbv2jfarKm5BzqDc7BPSycOt7LM50rM16GGdpE&usqp=CAU` }}
          alt='Remada Unilateral'
          w="$16"
          h="$16"
          rounded='$md'
          mr="$4"
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading fontSize='$lg' fontFamily="$heading" color='$white' numberOfLines={1}>
            Puxada Frontal
          </Heading>

          <Text fontSize='$sm' color='$gray200' mt='$1' numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color='$gray300' />
      </HStack>
    </TouchableOpacity>
  )
}