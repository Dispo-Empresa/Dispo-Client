import { useState } from 'react';

function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate && validate(values);
    setErrors(validationErrors);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;

// USAR:

//import React from 'react';
//import useForm from './hooks/useForm';
//
//function App() {
//  const initialState = {
//    name: '',
//    email: '',
//    password: '',
//  };
//
//  const validate = (values) => {
//    const errors = {};
//    if (!values.name) {
//      errors.name = 'O nome é obrigatório';
//    }
//    if (!values.email) {
//      errors.email = 'O e-mail é obrigatório';
//    }
//    if (!values.password) {
//      errors.password = 'A senha é obrigatória';
//    }
//    return errors;
//  };
//
//  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate);
//
//  const onSubmit = () => {
//    // Aqui podemos enviar os valores do formulário para o servidor, fazer uma chamada API, etc.
//    console.log('Valores enviados:', values);
//  };
//
//  return (
//    <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
//      <div>
//        <label htmlFor="name">Nome:</label>
//        <input type="text" id="name" name="name" value={values.name} onChange={handleChange} />
//        {errors.name && <div>{errors.name}</div>}
//      </div>
//      <div>
//        <label htmlFor="email">E-mail:</label>
//        <input type="email" id="email" name="email" value={values.email} onChange={handleChange} />
//        {errors.email && <div>{errors.email}</div>}
//      </div>
//      <div>
//        <label htmlFor="password">Senha:</label>
//        <input type="password" id="password" name="password" value={values.password} onChange={handleChange} />
//        {errors.password && <div>{errors.password}</div>}
//      </div>
//      <button type="submit">Enviar</button>
//    </form>
//  );
//}
//
//export default App;