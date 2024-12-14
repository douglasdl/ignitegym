import { Input as GuestackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField>

export function Input({ ...rest }: Props) {
  return (
    <GuestackInput 
      h="$14" 
      borderWidth="$0" 
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: "$green500"
      }}
    >
      <InputField 
        bg="$gray700" 
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        px="$4" 
        {...rest} 
      />
    </GuestackInput>
  )
}