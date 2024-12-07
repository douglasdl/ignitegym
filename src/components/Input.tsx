import { Input as GuestackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField>

export function Input({ ...rest }: Props) {
  return (
    <GuestackInput 
      bg="$gray700" 
      h="$14" 
      px="$4" 
      borderWidth="$0" 
      borderRadius="$md"
    >
      <InputField 
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest} 
      />
    </GuestackInput>
  )
}