import { useEffect, useState } from 'react';

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
      <h1>{count}</h1>
      <button size='20px' onClick={countUp}>+</button>
      <h1>Hello React</h1>
    </>
  );
}

export default App;
