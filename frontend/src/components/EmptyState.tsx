import { VStack, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';

type EmptyStateProps = {
  icon: any;
  message: string;
}

const EmptyState: FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <VStack p={10}>
      <Icon as={icon} color="gray.300" boxSize="40px" />
      <Text color="gray.500">{message}</Text>
    </VStack>
  );
};

export default EmptyState;