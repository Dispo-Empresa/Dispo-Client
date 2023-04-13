import { useEffect } from 'react';

function useKeyPress(targetKey, callback) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === targetKey) {
        callback();
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback]);
}

export default useKeyPress;

// COMO USAR

//import React from 'react';
//import useKeyPress from './hooks/useKeyPress';
//
//function App() {
//  function handleKeyPress() {
//    console.log('A tecla "Enter" foi pressionada!');
//  }
//
//  useKeyPress('Enter', handleKeyPress);
//
//  return <div>Pressione a tecla "Enter" para ver a mensagem no console.</div>;
//}
//
//export default App;