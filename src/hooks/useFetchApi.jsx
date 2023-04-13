import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// COMO USAR

//import React from 'react';
//import useFetch from './hooks/useFetch';
//
//function App() {
//  const { data, loading, error } = useFetch('https://api.example.com/data');
//
//  if (loading) {
//    return <div>Carregando...</div>;
//  }
//
//  if (error) {
//    return <div>Ocorreu um erro: {error.message}</div>;
//  }
//
//  return (
//    <ul>
//      {data.map((item) => (
//        <li key={item.id}>{item.name}</li>
//      ))}
//    </ul>
//  );
//}
//
//export default App;
