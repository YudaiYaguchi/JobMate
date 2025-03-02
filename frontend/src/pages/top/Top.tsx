import { VStack,Heading } from "@chakra-ui/react"
import { User } from "@/types";

const user:User = { 
  id: 1,
  name: 'Yaguchi Yudai',
  password: 'yudai 0503'
}

const Top = () => {
  return (
    <>
    <VStack>
      <Heading>userId: { user.id}</Heading>
      <Heading>userName: {user.name}</Heading>
      <Heading>userPassword: {user.password}</Heading>
    </VStack>
    </>
  )
}

export default Top;