import { useEffect, useState } from 'react';
import { Button, Heading, VStack } from '@chakra-ui/react';


const  App = () => {
  useEffect(() => {
    fetch('http://localhost:3001/api/user/index')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const [count,setCount] = useState(0);

  const countUp = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <VStack>
        <Heading>{count}</Heading>
      <Button bg="blue" onClick={countUp}>ボタン</Button>
      <h1>Hello React</h1>
      </VStack>
    </>
  );
}

export default App;
